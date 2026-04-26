#!/usr/bin/env node
import process from "node:process";
import lintStaged from "lint-staged";

import config from "../lint-staged.js";

const success = await lintStaged({
  config,
  cwd: process.cwd(),
  relative: true,
});

if (!success) {
  process.exit(1);
}
