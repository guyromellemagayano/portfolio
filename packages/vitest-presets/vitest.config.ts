import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
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
      ],
    },
    include: ["test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}"],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache", "**/*.d.ts"],
  },
});
