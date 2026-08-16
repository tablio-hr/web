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
npm run build
```

`next build` writes a standalone server under `.next/standalone` for the Docker image.

`GET /health` is liveness. Stage ships `noindex, nofollow`. Production canonical and sitemap URLs are `https://tablio.hr` only. JSON-LD describes `Organization`, `SoftwareApplication`, and `FAQPage`. `Organization.email` is `info@tablio.hr`.

Do not commit `.env` or tokens.

## Docker

Compose matches the API Traefik pattern (`web` + `websecure`, `TABLIO_WEB_HOST`). There is no `www` router.

```bash
# WSL stage, branch develop
./scripts/deploy-stage.sh
```

Production DNS upserts the apex A record and a proxied `www` CNAME plus a Cloudflare **301** to `https://tablio.hr`. The Single Redirect token permission is required in addition to DNS edit.

## Legal copy

`/privatnost` and `/uvjeti` source lives in `content/legal/`. The Art. 13 contract is checked by `npm run check:legal`.
