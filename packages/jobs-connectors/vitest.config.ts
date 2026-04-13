import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@portfolio/jobs-domain": new URL(
        "../jobs-domain/src/index.ts",
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
