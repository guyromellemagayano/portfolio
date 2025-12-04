import { defineConfig } from "vitest/config";

import { browserPreset } from "./browser";

// Use browser preset for testing vitest-presets itself
// This allows us to test browser APIs and mocks
export default defineConfig({
  ...browserPreset,
  test: {
    ...browserPreset.test,
    // Override setupFiles to use relative path when testing the package itself
    setupFiles: ["./shared/test-setup.ts"],
    // Override include to only test our test files
    include: ["__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
