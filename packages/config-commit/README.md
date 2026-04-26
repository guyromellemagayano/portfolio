# @portfolio/config-commit

Shared commit tooling for the portfolio workspace.

## Usage

- `portfolio-commit` launches the conventional commit prompt.
- `portfolio-commit-msg` runs Commitlint and validates optional bullet-style commit bodies.
- `portfolio-pre-commit` runs the shared lint-staged configuration.
- `portfolio-pre-push` validates branch names and signed commits.

## Maintenance

Keep this package aligned with root Git hooks and the commit standards in `AGENTS.md`.
