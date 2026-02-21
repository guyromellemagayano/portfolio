/**
 * React environment Vitest preset for React component testing
 * Use this preset for testing React components with full DOM and testing library support
 * Includes centralized mocks and logger integration
 */
export const reactPreset = {
  test: {
    environment: "jsdom",
    setupFiles: ["@portfolio/vitest-presets/shared/test-setup.ts"],
    globals: true,
    css: true,
    coverage: {
      provider: "v8" as const,
      reporter: ["text", "json", "html", "lcov", "clover"],
      reportOnFailure: true,
      thresholds: {
        statements: 80,
        branches: 75,
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
        "**/*.stories.*",
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
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.{test,spec}.{js,jsx,ts,tsx}",
        "!src/**/test-setup.*",
        "!src/**/*.d.ts",
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
};
