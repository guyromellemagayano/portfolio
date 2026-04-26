#!/usr/bin/env node
import { runNodePackageBin } from "./_utils.mjs";

runNodePackageBin("czg", "czg", process.argv.slice(2), {
  env: {
    NPM_CONFIG_LOGLEVEL: "error",
  },
});
