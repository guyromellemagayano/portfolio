/**
 * @file apps/api-jobs/vitest.config.ts
 * @author Guy Romelle Magayano
 * @description Vitest configuration for the jobs API application.
 */

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@api-jobs": new URL("./src", import.meta.url).pathname,
      "@portfolio/api-contracts/http": new URL(
        "../../packages/api-contracts/src/http/index.ts",
        import.meta.url
      ).pathname,
      "@portfolio/api-contracts": new URL(
        "../../packages/api-contracts/src/index.ts",
        import.meta.url
      ).pathname,
      "@portfolio/jobs-connectors": new URL(
        "../../packages/jobs-connectors/src/index.ts",
        import.meta.url
      ).pathname,
      "@portfolio/jobs-domain": new URL(
        "../../packages/jobs-domain/src/index.ts",
        import.meta.url
      ).pathname,
    },
  },
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}"],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache", "**/*.d.ts"],
  },
});
