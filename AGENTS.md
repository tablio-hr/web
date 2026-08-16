# Tablio web — agent instructions

Repo: [tablio-hr/web](https://github.com/tablio-hr/web).

- Land work on **`develop`** with a direct commit. Do not open a feature PR.
- The only PR is **Promote to production** (`develop` → `main`). That PR is
  the CI gate. Do not commit to `main`.
- After a promote merge, delete the promote branch (local + remote). Never
  delete `develop` or `main`.
- Marketing hosts only: stage `stage.tablio.hr`, production `tablio.hr`. Do not
  serve admin or API on these hosts.
- Stage deploy is manual on WSL. CI, if present, uses HEL1 runners:
  `[self-hosted, linux, x64, tablio, docker]` or `tablio, default`.
- Do not click **New runner**. Do not put a `stage` label on HEL1 runners.
- Do not commit `.env` or tokens.
