## Summary

<!-- Feature PRs target develop. Only a Promote to production PR targets main. -->

-

## Test plan

- [ ] Marketing hosts only (`stage.tablio.hr` / `tablio.hr`) — no admin or API surface
- [ ] PR CI is green on `tablio-docker-runner` (lint, build, Docker, form + a11y)
- [ ] Does not deploy to HEL1 (unless this is a promote)
- [ ] No `.env` or tokens in the diff

<!--
runs-on for new/changed workflows:
  PR CI / Docker: [self-hosted, linux, x64, tablio, docker]
  no Docker:      [self-hosted, linux, x64, tablio, default]
Stage deploy is manual on WSL (`./scripts/deploy-stage.sh`), not Actions.
-->
