/**
 * Node environment Vitest preset for server-side testing
 * Use this preset for testing Node.js APIs, utilities, and server-side code
 * Includes centralized mocks and logger integration
 */
export const nodePreset = {
  test: {
    environment: "node",
    setupFiles: ["@portfolio/vitest-presets/shared/test-setup.ts"],
    globals: true,
    coverage: {
      provider: "v8" as const,
      reporter: ["text", "json", "html", "lcov", "clover"],
      reportOnFailure: true,
      thresholds: {
        statements: 85,
        branches: 80,
        functions: 85,
        lines: 85,
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
        "**/webpack.config.*",
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
};

export default nodePreset;
