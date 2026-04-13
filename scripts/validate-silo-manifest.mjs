#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  ensureRepoRoot,
  isGitlink,
  loadManifest,
  parseGitmodules,
  repoRoot,
} from "./_silo-utils.mjs";

ensureRepoRoot();

const manifest = loadManifest();
const gitmodules = parseGitmodules();
const failures = [];
const seenIds = new Set();
const seenPaths = new Set();

for (const silo of manifest.submodules) {
  if (seenIds.has(silo.id)) {
    failures.push(`Duplicate silo id: ${silo.id}`);
  }

  if (seenPaths.has(silo.path)) {
    failures.push(`Duplicate silo path: ${silo.path}`);
  }

  seenIds.add(silo.id);
  seenPaths.add(silo.path);

  const fullPath = path.join(repoRoot, silo.path);

  if (!fs.existsSync(fullPath)) {
    failures.push(`Missing silo path: ${silo.path}`);
  }

  const submoduleEntry = [...gitmodules.values()].find(
    (entry) => entry.path === silo.path
  );

  if (!submoduleEntry) {
    failures.push(`.gitmodules is missing entry for ${silo.path}`);
    continue;
  }

  if (submoduleEntry.url !== silo.remote) {
    failures.push(
      `Remote mismatch for ${silo.path}: manifest=${silo.remote} gitmodules=${submoduleEntry.url}`
    );
  }

  if (submoduleEntry.ignore !== silo.ignore) {
    failures.push(
      `Ignore mismatch for ${silo.path}: expected ${silo.ignore} got ${submoduleEntry.ignore ?? "<unset>"}`
    );
  }

  if (!isGitlink(silo.path)) {
    failures.push(`Expected gitlink for submodule path: ${silo.path}`);
  }
}

for (const rootOwnedPath of manifest.rootOwnedPaths) {
  const fullPath = path.join(repoRoot, rootOwnedPath);

  if (!fs.existsSync(fullPath)) {
    failures.push(`Missing root-owned path: ${rootOwnedPath}`);
    continue;
  }

  if (isGitlink(rootOwnedPath)) {
    failures.push(`Root-owned path is still a gitlink: ${rootOwnedPath}`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`validate-silo-manifest: ${failure}`);
  }

  process.exit(1);
}

console.log("validate-silo-manifest: OK");
