## Summary

<!-- Feature PRs target develop. Only a Promote to production PR targets main. -->

-

## Test plan

- [ ] Marketing hosts only (`stage.tablio.hr` / `tablio.hr`) — no admin or API surface
- [ ] CI, if present, uses `[self-hosted, linux, x64, tablio, docker]` or `tablio, default`
- [ ] Does not deploy to HEL1 (unless this is a promote)
- [ ] No `.env` or tokens in the diff
