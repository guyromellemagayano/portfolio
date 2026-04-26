#!/usr/bin/env node
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { fail } from "./_utils.mjs";

export function validateCommitMessageFile(filePath) {
  if (!filePath) {
    fail("commit message file path is missing");
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const filtered = [];

  for (const line of lines) {
    if (line.startsWith("#")) {
      break;
    }

    filtered.push(line);
  }

  while (filtered.length && filtered.at(-1)?.trim() === "") {
    filtered.pop();
  }

  if (!filtered.length) {
    fail("commit message validation failed: empty commit message");
  }

  const subject = filtered[0];
  const isMergeOrRevert =
    subject.startsWith("Merge ") || subject.startsWith("Revert ");

  if (isMergeOrRevert || filtered.length === 1) {
    return;
  }

  if ((filtered[1] ?? "").trim() !== "") {
    fail(
      "commit message validation failed: second line must be blank between subject and body"
    );
  }

  for (let index = 2; index < filtered.length; index += 1) {
    const line = filtered[index];

    if (line.trim() === "") {
      fail(
        "commit message validation failed: no empty lines are allowed inside commit body bullets"
      );
    }

    if (!/^-[ ].+$/u.test(line)) {
      fail(
        `commit message validation failed: body line ${index + 1} must start with '- '`
      );
    }

    if (line.length > 250) {
      fail(
        `commit message validation failed: body line ${index + 1} exceeds 250 characters`
      );
    }
  }
}

const currentFilePath = fileURLToPath(import.meta.url);

if (process.argv[1] && process.argv[1] === currentFilePath) {
  validateCommitMessageFile(process.argv[2]);
}
