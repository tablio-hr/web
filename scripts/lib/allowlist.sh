# Marketing hosts only. Do not add www — Cloudflare 301s www → apex.
# Do not edit api/scripts/lib/allowlist.sh from this repo.
STAGE_DNS_ALLOWLIST="stage.tablio.hr"
PRODUCTION_DNS_ALLOWLIST="tablio.hr"
WWW_REDIRECT_HOST="www.tablio.hr"

die() {
  echo "$*" >&2
  exit 1
}

assert_allowlist() {
  local mode="$1"
  local name="$2"
  local allowed=""
  case "$mode" in
    stage) allowed="$STAGE_DNS_ALLOWLIST" ;;
    production) allowed="$PRODUCTION_DNS_ALLOWLIST" ;;
    *) die "Unknown mode: $mode" ;;
  esac
  local item
  for item in $allowed; do
    if [[ "$item" == "$name" ]]; then
      return 0
    fi
  done
  die "Hostname '$name' is not on the $mode allowlist"
}

assert_not_www() {
  local name="$1"
  if [[ "$name" == "$WWW_REDIRECT_HOST" ]]; then
    die "www.tablio.hr is not a served host; Cloudflare 301s it to the apex"
  fi
}
