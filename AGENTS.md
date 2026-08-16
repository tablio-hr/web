# Tablio web — agent instructions

Repo: [tablio-hr/web](https://github.com/tablio-hr/web).

- Land work on **`develop`** with a direct commit. Do not open a feature PR.
- The only PR is **Promote to production** (`develop` → `main`). That PR is
  the CI gate. Do not commit to `main`.
- After a promote merge, delete the promote branch (local + remote). Never
  delete `develop` or `main`.
- Marketing hosts only: stage `stage.tablio.hr`, production `tablio.hr`. Do not
  serve admin or API on these hosts.
- Stage deploy is manual on WSL (`./scripts/deploy-stage.sh`). No GitHub Actions
  stage job and no `stage` runner label.
- Promote-PR CI is `.github/workflows/pr-ci.yml` on
  `[self-hosted, linux, x64, tablio, docker]`. It must not run deploy scripts or
  compose against `/opt/stacks/tablio.hr`.
- Production deploy is `.github/workflows/deploy-production.yml` on `main`.
- Do not click **New runner**. Do not put a `stage` label on HEL1 runners.
- Do not commit `.env` or tokens.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
