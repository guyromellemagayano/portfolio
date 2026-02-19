import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    globals: true,
    css: true,

    // Memory optimization settings
    pool: "threads",
    threads: {
      singleThread: true, // Use single thread to reduce memory usage
      isolate: false, // Reduce isolation overhead
    },

    // Aggressive memory management
    maxConcurrency: 1,
    maxWorkers: 1,

    // Faster test timeouts to prevent hanging tests
    testTimeout: 5000,
    hookTimeout: 5000,

    // Aggressive cleanup between tests
    clearMocks: true,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,

    // Additional memory management
    logHeapUsage: true,
    sequence: {
      concurrent: false, // Run tests sequentially
    },

    coverage: {
      provider: "v8",
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
        "**/README.md",
        "src/index.tsx",
        "src/index.client.tsx",
        "**/index.client.tsx",
      ],
      include: [
        "src/**/*.{js,jsx,ts,tsx}",
        "scripts/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.{test,spec}.{js,jsx,ts,tsx}",
        "!scripts/**/*.{test,spec}.{js,jsx,ts,tsx}",
        "!src/**/test-setup.*",
        "!src/**/*.d.ts",
        "!src/index.tsx",
        "!src/index.client.tsx",
      ],
    },
    include: [
      "src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "scripts/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
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
} as any);
