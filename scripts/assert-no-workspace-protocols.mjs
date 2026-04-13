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

  if (raw.includes('"workspace:*"') || raw.includes('"workspace:')) {
    failures.push(silo.path);
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(
      `assert-no-workspace-protocols: found workspace protocol in ${failure}/package.json`
    );
  }

  process.exit(1);
}

console.log("assert-no-workspace-protocols: OK");
