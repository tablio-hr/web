# Tablio web — agent instructions

Repo: [tablio-hr/web](https://github.com/tablio-hr/web).

- Feature PRs target **`develop`**. Do not open feature PRs against `main`.
- The only `develop` → `main` path is a **Promote to production** PR.
- After merge, delete the feature branch locally and on `origin`. Never delete `develop` or `main`.
- Use `.github/PULL_REQUEST_TEMPLATE.md`. Fill Summary and Test plan.
- Marketing hosts only: stage `stage.tablio.hr`, production `tablio.hr`. Do not serve admin or API on these hosts.
- CI on dedicated-hel1 is allowed. Stage **deploy** stays on WSL (`[self-hosted, stage]`).
- If a workflow needs Docker / compose: `runs-on: [self-hosted, linux, x64, tablio, docker]`.
- Lint / tests without Docker: `runs-on: [self-hosted, linux, x64, tablio, default]`.
- Do not click **New runner**. Do not put a `stage` label on HEL1 runners.
- Do not commit `.env` or tokens.
