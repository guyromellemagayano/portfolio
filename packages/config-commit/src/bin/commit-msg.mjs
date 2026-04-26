#!/usr/bin/env node
import { fileURLToPath } from "node:url";

import { fail, runNodePackageBin } from "./_utils.mjs";
import { validateCommitMessageFile } from "./validate-commit-message.mjs";

const filePath = process.argv[2];

if (!filePath) {
  fail("commit message file path is missing");
}

const commitlintConfigPath = fileURLToPath(
  new URL("../commitlint.js", import.meta.url)
);

runNodePackageBin("@commitlint/cli", "commitlint", [
  "--config",
  commitlintConfigPath,
  "--edit",
  filePath,
]);

validateCommitMessageFile(filePath);
