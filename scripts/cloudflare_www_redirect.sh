#!/usr/bin/env bash
# Production only: proxied www.tablio.hr CNAME + Cloudflare 301 to the apex.
# Traefik must not serve www. Token needs Zone DNS Edit and Single Redirect Edit.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=lib/allowlist.sh
source "${ROOT_DIR}/scripts/lib/allowlist.sh"

CF_API="https://api.cloudflare.com/client/v4"
ZONE_NAME="${CLOUDFLARE_ZONE_NAME:-tablio.hr}"
TOKEN="${CF_DNS_TOKEN_PRODUCTION:-}"
WWW_HOST="$WWW_REDIRECT_HOST"
APEX="tablio.hr"
RULE_REF="tablio_www_to_apex"

[[ -n "$TOKEN" ]] || die "CF_DNS_TOKEN_PRODUCTION is required"
assert_not_www "$APEX"

if [[ "${TABLIO_DRY_RUN:-}" == "1" ]]; then
  echo "dry-run www CNAME + 301 ${WWW_HOST} -> https://${APEX}"
  exit 0
fi

cf_api() {
  local method="$1" path="$2" data="${3:-}"
  local args=(-sS -X "$method" "${CF_API}${path}"
    -H "Authorization: Bearer ${TOKEN}"
    -H "Content-Type: application/json")
  if [[ -n "$data" ]]; then
    args+=(--data "$data")
  fi
  curl "${args[@]}"
}

zones="$(cf_api GET "/zones?name=${ZONE_NAME}&status=active")"
ZONE_ID="$(python3 -c 'import json,sys; d=json.load(sys.stdin); print((d.get("result") or [{}])[0].get("id",""))' <<<"$zones")"
[[ -n "$ZONE_ID" ]] || die "Zone ${ZONE_NAME} not found"

existing="$(cf_api GET "/zones/${ZONE_ID}/dns_records?type=CNAME&name=${WWW_HOST}")"
rec_id="$(python3 -c 'import json,sys; d=json.load(sys.stdin); r=(d.get("result") or [None])[0]; print(r.get("id","") if r else "")' <<<"$existing")"
payload="$(python3 -c 'import json,sys; print(json.dumps({"type":"CNAME","name":sys.argv[1],"content":sys.argv[2],"proxied":True,"ttl":1}))' "$WWW_HOST" "$APEX")"
if [[ -n "$rec_id" ]]; then
  resp="$(cf_api PUT "/zones/${ZONE_ID}/dns_records/${rec_id}" "$payload")"
else
  resp="$(cf_api POST "/zones/${ZONE_ID}/dns_records" "$payload")"
fi
python3 -c 'import json,sys; sys.exit(0 if json.load(sys.stdin).get("success") else 1)' <<<"$resp" \
  || { echo "$resp" >&2; die "www CNAME upsert failed"; }
echo "upserted CNAME ${WWW_HOST} -> ${APEX} (proxied; not served by Traefik)"

entrypoint_tmp="$(mktemp)"
code="$(curl -sS -o "$entrypoint_tmp" -w "%{http_code}" \
  -X GET "${CF_API}/zones/${ZONE_ID}/rulesets/phases/http_request_dynamic_redirect/entrypoint" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json")"
entrypoint="$(cat "$entrypoint_tmp")"
rm -f "$entrypoint_tmp"

rule_payload="$(python3 -c 'import json,sys; print(json.dumps({
  "ref": sys.argv[1],
  "description": "301 www.tablio.hr to apex; Traefik must not serve www",
  "expression": "http.host eq \"www.tablio.hr\"",
  "action": "redirect",
  "action_parameters": {
    "from_value": {
      "status_code": 301,
      "preserve_query_string": True,
      "target_url": {"expression": "concat(\"https://tablio.hr\", http.request.uri.path)"}
    }
  }
}))' "$RULE_REF")"

if [[ "$code" == "404" ]]; then
  create_payload="$(RULE_JSON="$rule_payload" python3 - <<'PY'
import json, os
rule = json.loads(os.environ["RULE_JSON"])
print(json.dumps({
  "name": "Tablio redirect rules",
  "kind": "zone",
  "phase": "http_request_dynamic_redirect",
  "rules": [rule],
}))
PY
)"
  created="$(cf_api POST "/zones/${ZONE_ID}/rulesets" "$create_payload")"
  python3 -c 'import json,sys; sys.exit(0 if json.load(sys.stdin).get("success") else 1)' <<<"$created" \
    || { echo "$created" >&2; die "www redirect ruleset create failed"; }
  echo "created 301 ${WWW_HOST} -> https://${APEX}"
  exit 0
fi

[[ "$code" == "200" ]] || { echo "$entrypoint" >&2; die "failed to read redirect entrypoint ($code)"; }

merged="$(ENTRYPOINT="$entrypoint" RULE_JSON="$rule_payload" RULE_REF="$RULE_REF" python3 - <<'PY'
import json, os
entry = json.loads(os.environ["ENTRYPOINT"])
result = entry.get("result") or {}
ruleset_id = result.get("id") or ""
rules = list(result.get("rules") or [])
new_rule = json.loads(os.environ["RULE_JSON"])
ref = os.environ["RULE_REF"]
replaced = False
out = []
for rule in rules:
    if rule.get("ref") == ref:
        kept_id = rule.get("id")
        if kept_id:
            new_rule["id"] = kept_id
        out.append(new_rule)
        replaced = True
    else:
        out.append(rule)
if not replaced:
    out.append(new_rule)
print(json.dumps({"id": ruleset_id, "rules": out, "name": result.get("name") or "Redirect rules ruleset"}))
PY
)"

ruleset_id="$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("id",""))' <<<"$merged")"
[[ -n "$ruleset_id" ]] || die "redirect entrypoint has no id"

put_payload="$(MERGED="$merged" python3 - <<'PY'
import json, os
merged = json.loads(os.environ["MERGED"])
print(json.dumps({
  "name": merged.get("name") or "Redirect rules ruleset",
  "kind": "zone",
  "phase": "http_request_dynamic_redirect",
  "rules": merged["rules"],
}))
PY
)"
updated="$(cf_api PUT "/zones/${ZONE_ID}/rulesets/${ruleset_id}" "$put_payload")"
python3 -c 'import json,sys; sys.exit(0 if json.load(sys.stdin).get("success") else 1)' <<<"$updated" \
  || { echo "$updated" >&2; die "www redirect rule upsert failed"; }
echo "upserted 301 ${WWW_HOST} -> https://${APEX}"
