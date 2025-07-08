#!/usr/bin/env node

import { ComponentTestRunner } from "./libs/test-components";

// Run the tests
async function main(): Promise<void> {
  const runner = new ComponentTestRunner();

  try {
    const success = await runner.runAll();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error("💥 Test runner crashed:", (error as Error).message);
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
