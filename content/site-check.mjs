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
  prCi: read(".github/workflows/pr-ci.yml"),
  prodDeploy: read(".github/workflows/deploy-production.yml"),
  stageDeploy: read("scripts/deploy-stage.sh"),
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
  ["PR CI pull_request", files.prCi.includes("pull_request:")],
  ["PR CI docker runner", files.prCi.includes("[self-hosted, linux, x64, tablio, docker]")],
  ["PR CI lint", files.prCi.includes("npm run lint")],
  ["PR CI next build", files.prCi.includes("npm run build")],
  ["PR CI docker build", files.prCi.includes("docker build")],
  ["PR CI form + a11y", files.prCi.includes("npm run test:e2e")],
  ["stage script WSL only", files.stageDeploy.includes("Never SSHs to dedicated-hel1")],
  ["prod environment", files.prodDeploy.includes("environment: production")],
  ["prod self-hosted docker", files.prodDeploy.includes("[self-hosted, linux, x64, tablio, docker]")],
  ["prod secret guard DNS", files.prodDeploy.includes("CF_DNS_TOKEN_PRODUCTION")],
  ["prod rejects stage token", files.prodDeploy.includes("production must not read stage DNS token")],
  ["prod rejects tunnel id", files.prodDeploy.includes("production must not read stage tunnel id")],
  ["prod web path", files.prodDeploy.includes("/opt/stacks/tablio.hr/web")],
  ["prod www upsert", files.prodDeploy.includes("cloudflare_dns_upsert.sh")],
  ["compose www redirect", files.compose.includes("tablio-www-to-apex") && files.compose.includes("redirectregex.permanent=true")],
];

const forbidden = [
  ["compose content host is www", /routers\.tablio-web\.rule=Host\(`www/.test(files.compose)],
  ["allowlist serves www", /PRODUCTION_DNS_ALLOWLIST=.*www\.tablio\.hr/.test(files.allowlist)],
  ["PR CI stage runner", /self-hosted,\s*stage|tablio,\s*stage/.test(files.prCi)],
  ["PR CI runs stage deploy", /scripts\/deploy-stage/.test(files.prCi)],
  ["PR CI compose stack", files.prCi.includes("/opt/stacks/tablio.hr")],
  ["prod ubuntu-latest", files.prodDeploy.includes("ubuntu-latest")],
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
