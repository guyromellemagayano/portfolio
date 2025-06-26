import { defineConfig } from "vitest/config";

/**
 * React environment Vitest preset for React component testing
 * Use this preset for testing React components with full DOM and testing library support
 */
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    globals: true,
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/test-setup.*",
        "**/__tests__/**",
        "**/*.test.*",
        "**/*.spec.*",
        "**/*.stories.*",
      ],
    },
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: [
      "node_modules",
      "dist",
      ".idea",
      ".git",
      ".cache",
      "**/*.d.ts",
      "**/*.stories.*",
    ],
  },
});
