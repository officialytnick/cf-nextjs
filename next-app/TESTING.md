Testing and e2e

- Unit tests: `npm test` (Vitest) — runs only unit tests (e2e excluded in config).
- Playwright e2e: install browsers first `npx playwright install`, then run `npm run e2e`.

CI notes

- The repository has a GitHub Actions workflow at `.github/workflows/ci.yml` which runs:
  - `npm ci`
  - `npm run build`
  - `npm run lint`
  - `npm test`

- Playwright e2e is optional in CI; to enable it, set the `RUN_PLAYWRIGHT` environment variable to `true` (or modify the workflow).
