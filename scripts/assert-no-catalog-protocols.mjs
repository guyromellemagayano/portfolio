#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { ensureRepoRoot, loadManifest, repoRoot } from "./_silo-utils.mjs";

ensureRepoRoot();

const manifest = loadManifest();
const failures = [];

for (const silo of manifest.submodules) {
  const packageJsonPath = path.join(repoRoot, silo.path, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    continue;
  }

  const raw = fs.readFileSync(packageJsonPath, "utf8");

  if (raw.includes('"catalog:"')) {
    failures.push(silo.path);
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(
      `assert-no-catalog-protocols: found catalog protocol in ${failure}/package.json`
    );
  }

  process.exit(1);
}

console.log("assert-no-catalog-protocols: OK");
