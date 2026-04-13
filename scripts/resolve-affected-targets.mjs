#!/usr/bin/env node

import process from "node:process";
import { ensureRepoRoot, findSiloBySelector, loadManifest } from "./_silo-utils.mjs";

ensureRepoRoot();

const selector = process.argv[2];

if (!selector) {
  console.error(
    "resolve-affected-targets: usage: node scripts/resolve-affected-targets.mjs <silo>"
  );
  process.exit(1);
}

const manifest = loadManifest();
const silo = findSiloBySelector(selector, manifest);

if (!silo) {
  console.error(`resolve-affected-targets: unknown silo selector "${selector}"`);
  process.exit(1);
}

process.stdout.write(
  JSON.stringify(
    {
      id: silo.id,
      path: silo.path,
      promotionFilters: silo.promotionFilters ?? [],
      promotionTasks:
        silo.siloType === "app"
          ? ["check-types", "build", "test:run"]
          : ["check-types", "build", "test:run"],
    },
    null,
    2
  )
);
