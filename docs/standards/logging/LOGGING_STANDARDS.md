# Logging Standards

This monorepo uses `@portfolio/logger` as the single logging interface for application/runtime logging.

## Rules

1. Use `@portfolio/logger` for all app/package logging.
2. Do not import third-party logger libraries directly (`morgan`, `winston`, `pino`, `bunyan`, `log4js`, `npmlog`, `consola`, `signale`, `debug`).
3. Do not use `console.*` in application source files.
4. Exceptions are allowed only inside the logger package implementation (`packages/logger/**`) and test setup files.

## Enforcement

- ESLint `no-console` is enabled globally through `@portfolio/config-eslint`.
- ESLint `no-restricted-imports` blocks third-party logger imports globally.

## API Gateway

- HTTP access logs are emitted via `apps/api/src/middleware/http-logger.ts` using `@portfolio/logger`.
