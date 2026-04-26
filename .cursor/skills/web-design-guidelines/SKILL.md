---
name: web-design-guidelines
description: Reference-level web interface review checklist. Use when portfolio local rules do not already provide sufficient coverage for the review scope.
argument-hint: <file-or-pattern>
metadata:
  author: vercel
  version: "1.0.0"
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the fetched guidelines
4. Output findings in the terse `file:line` format
5. Evaluate implementation code as TypeScript-first (`.ts` / `.tsx`), with `.js` findings limited to toolchain/config files that require JavaScript.

## Portfolio Use Rule

- This skill is a **reference** source for UI review guidance.
- For portfolio, authoritative standards are defined in `AGENTS.md` and `.cursor/rules/*.mdc`.
- Apply these web-design rules only when they do not conflict with repository-local instructions.

## Guidelines Source

Fetch fresh guidelines before each review:

```text
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Use WebFetch to retrieve the latest rules. The fetched content contains all the rules and output format instructions.

## Usage

When a user provides a file or pattern argument:

1. Fetch guidelines from the source URL above
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.

## Repository Documentation Convention

- Use one-line JSDoc (`/** ... */`) for single-line documentation text.
- Use multiline JSDoc only when the comment content genuinely needs multiple lines (caveats, side effects, or optional tags like `@example`/`@throws`). Avoid `@param`/`@returns`; rely on clear names + types.
