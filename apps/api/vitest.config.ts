/**
 * @file apps/api/vitest.config.ts
 * @author Guy Romelle Magayano
 * @description Vitest configuration for the portfolio API application.
 */

import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@portfolio\/api-contracts\/content$/,
        replacement: path.resolve(
          __dirname,
          "../../packages/api-contracts/src/content/index.ts"
        ),
      },
      {
        find: /^@portfolio\/api-contracts\/http$/,
        replacement: path.resolve(
          __dirname,
          "../../packages/api-contracts/src/http/index.ts"
        ),
      },
      {
        find: /^@portfolio\/content-data$/,
        replacement: path.resolve(
          __dirname,
          "../../packages/content-data/src/index.ts"
        ),
      },
      {
        find: /^@portfolio\/logger$/,
        replacement: path.resolve(
          __dirname,
          "../../packages/logger/src/index.ts"
        ),
      },
      {
        find: "@api",
        replacement: new URL("./src", import.meta.url).pathname,
      },
    ],
  },
  test: {
    environment: "node",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov", "clover"],
      reportOnFailure: true,
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
      exclude: [
        "node_modules/",
        "dist/",
        "build/",
        "coverage/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/test-setup.*",
        "**/__tests__/**",
        "**/*.test.*",
        "**/*.spec.*",
        "**/mocks/**",
        "**/fixtures/**",
        "**/types/**",
        "**/__mocks__/**",
        "**/vite.config.*",
        "**/vitest.config.*",
        "**/jest.config.*",
        "**/rollup.config.*",
        "**/tailwind.config.*",
        "**/postcss.config.*",
        "**/next.config.*",
        "**/remix.config.*",
      ],
      include: [
        "src/**/*.{js,ts}",
        "!src/**/*.{test,spec}.{js,ts}",
        "!src/**/test-setup.*",
        "!src/**/*.d.ts",
      ],
    },
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}"],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache", "**/*.d.ts"],
  },
});
