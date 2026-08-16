#!/usr/bin/env node
/**
 * Contract check: Docker/health, stage noindex, production canonical,
 * www is not a Traefik host, and OG/JSON-LD types are present.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(root, rel), "utf8");

const files = {
  compose: read("docker-compose.yml"),
  dockerfile: read("Dockerfile"),
  allowlist: read("scripts/lib/allowlist.sh"),
  www: read("scripts/cloudflare_www_redirect.sh"),
  site: read("lib/site.ts"),
  hosts: read("lib/hosts.ts"),
  headers: read("lib/security-headers.ts"),
  jsonLd: read("lib/json-ld.ts"),
  robots: read("app/robots.ts"),
  sitemap: read("app/sitemap.ts"),
  health: read("app/health/route.ts"),
  faq: read("components/landing/Faq.tsx"),
};

const required = [
  ["compose websecure", files.compose.includes("entrypoints=websecure")],
  ["compose web", files.compose.includes("entrypoints=web")],
  ["compose TABLIO_WEB_HOST", files.compose.includes("Host(`${TABLIO_WEB_HOST}`)")],
  ["compose healthcheck /health", files.compose.includes("/health")],
  ["dockerfile HEALTHCHECK", files.dockerfile.includes("HEALTHCHECK")],
  ["dockerfile /health", files.dockerfile.includes("/health")],
  ["allowlist stage", files.allowlist.includes("stage.tablio.hr")],
  ["allowlist apex", files.allowlist.includes("tablio.hr")],
  ["www 301", files.www.includes("status_code\": 301") || files.www.includes("status_code\": 301") || files.www.includes('"status_code": 301')],
  ["www expression", files.www.includes("http.host eq \\\"www.tablio.hr\\\"") || files.www.includes('http.host eq "www.tablio.hr"')],
  ["www not served", files.allowlist.includes("www.tablio.hr is not a served host") || files.allowlist.includes("assert_not_www")],
  ["production origin", files.site.includes('https://tablio.hr')],
  ["stage origin", files.site.includes("https://stage.tablio.hr")],
  ["noindex helper", files.site.includes("index: false") && files.site.includes("follow: false")],
  ["www host constant", files.site.includes("www.tablio.hr")],
  ["host 400 www", files.hosts.includes("WWW_HOST")],
  ["CSP frame-ancestors", files.headers.includes("frame-ancestors 'none'")],
  ["Referrer-Policy", files.headers.includes("strict-origin-when-cross-origin")],
  ["Organization JSON-LD", files.jsonLd.includes('"Organization"')],
  ["SoftwareApplication JSON-LD", files.jsonLd.includes('"SoftwareApplication"')],
  ["Organization email", files.jsonLd.includes("CONTROLLER.email")],
  ["FAQ JSON-LD helper", files.jsonLd.includes('"FAQPage"')],
  ["FAQ uses helper", files.faq.includes("faqPageJsonLd")],
  ["robots stage disallow", files.robots.includes('disallow: "/"')],
  ["sitemap production only", files.sitemap.includes("isProductionSite()") && files.sitemap.includes("return []")],
  ["sitemap production URLs", files.sitemap.includes("PRODUCTION_ORIGIN")],
  ["health liveness", files.health.includes('"ok\\n"') || files.health.includes("ok\\n")],
];

const forbidden = [
  ["compose serves www", /Host\(`www|www\.tablio\.hr/i.test(files.compose)],
  ["allowlist serves www", /PRODUCTION_DNS_ALLOWLIST=.*www\.tablio\.hr/.test(files.allowlist)],
];

const missing = required.filter(([, ok]) => !ok).map(([label]) => label);
const leaked = forbidden.filter(([, hit]) => hit).map(([label]) => label);

if (missing.length || leaked.length) {
  for (const label of missing) {
    console.error(`missing: ${label}`);
  }
  for (const label of leaked) {
    console.error(`forbidden: ${label}`);
  }
  process.exit(1);
}

console.log("site docker/seo/security contract ok");
