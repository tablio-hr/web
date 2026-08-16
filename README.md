# Tablio web

Marketing surface for Tablio. Boundaries are locked in [ADR 0001](https://github.com/tablio-hr/docs/blob/develop/architecture/adr/0001-platform-deployment-and-tenancy-boundary.md): **the host selects the surface.** These hosts serve only this Next.js app — not Django admin and not the product API.

Feature work lands on `develop` (WSL stage). Production is `main` on dedicated-hel1 after **Promote to production**.

## Hosts

- Stage: `stage.tablio.hr`
- Production: `tablio.hr`
- `www.tablio.hr` is a Cloudflare 301 to the apex. Traefik must not serve `www`.

The form posts to `POST /api/v1/early-access` on `api-stage.tablio.hr` / `api.tablio.hr`.

This repo has its own DNS allowlist (`scripts/lib/allowlist.sh`): `stage.tablio.hr` / `tablio.hr`. It does not edit the API allowlist.

## Stack

App Router, TypeScript, Tailwind CSS, `output: "standalone"`. Croatian only — no i18n.

## Local

```bash
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run typecheck
npm run check:legal
npm run check:landing
npm run check:site
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`next build` writes a standalone server under `.next/standalone` for the Docker image.

`GET /health` is liveness. Stage ships `noindex, nofollow`. Production canonical and sitemap URLs are `https://tablio.hr` only. JSON-LD describes `Organization`, `SoftwareApplication`, and `FAQPage`. `Organization.email` is `info@tablio.hr`.

Do not commit `.env` or tokens.

## Docker

Compose matches the API Traefik pattern (`web` + `websecure`, `TABLIO_WEB_HOST`). There is no `www` router.

```bash
# WSL stage, branch develop — not a GitHub Actions job
./scripts/deploy-stage.sh
```

Production DNS upserts the apex A record and a proxied `www` CNAME plus a Cloudflare **301** to `https://tablio.hr`. The Single Redirect token permission is required in addition to DNS edit.

## CI

Promote-PR CI (`.github/workflows/pr-ci.yml`) runs on HEL1 `tablio-docker-runner`: lint, typecheck, contract checks, unit tests, `next build`, Playwright form + a11y smoke (mocked API), Docker build, and a `/health` container smoke.

There is no GitHub Actions stage job and no `stage` runner label. `develop` never deploys to HEL1.

## Release

```text
WSL develop (direct commit) → manual stage deploy → stage smoke
  → Promote to production PR → CI → main → production deploy
```

Production deploy (`.github/workflows/deploy-production.yml`) SSHs to dedicated-hel1 with the same secret guards as the API: `DEPLOY_*` and `CF_DNS_TOKEN_PRODUCTION` required; stage DNS token and tunnel id must be absent.

## Legal copy

`/privatnost` and `/uvjeti` source lives in `content/legal/`. The Art. 13 contract is checked by `npm run check:legal`.
