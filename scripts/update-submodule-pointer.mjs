#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import process from "node:process";
import {
  ensureRepoRoot,
  findSiloBySelector,
  loadManifest,
  repoRoot,
} from "./_silo-utils.mjs";

ensureRepoRoot();

const args = process.argv.slice(2);
let selector = "";
let ref = "";

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];

  if (arg === "--silo") {
    selector = args[index + 1] ?? "";
    index += 1;
  } else if (arg === "--ref") {
    ref = args[index + 1] ?? "";
    index += 1;
  }
}

if (!selector || !ref) {
  console.error(
    "update-submodule-pointer: usage: node scripts/update-submodule-pointer.mjs --silo <path|id> --ref <sha|tag|branch>"
  );
  process.exit(1);
}

const manifest = loadManifest();
const silo = findSiloBySelector(selector, manifest);

if (!silo) {
  console.error(`update-submodule-pointer: unknown silo selector "${selector}"`);
  process.exit(1);
}

execFileSync("git", ["-C", silo.path, "fetch", "--tags", "origin"], {
  cwd: repoRoot,
  stdio: "inherit",
});
execFileSync("git", ["-C", silo.path, "checkout", "--detach", ref], {
  cwd: repoRoot,
  stdio: "inherit",
});
execFileSync("git", ["add", "--", silo.path], {
  cwd: repoRoot,
  stdio: "inherit",
});

console.log(
  `update-submodule-pointer: staged ${silo.path} at ${ref}. Run validation before committing the promotion.`
);
