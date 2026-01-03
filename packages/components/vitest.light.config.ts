import { defineConfig } from "vitest/config";

/**
 * Lightweight Vitest configuration optimized for minimal memory usage.
 * Use this for running tests in memory-constrained environments or CI.
 */
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    globals: true,
    css: false, // Disable CSS processing for speed

    // Ultra-lightweight settings with enhanced isolation
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: true,
        isolate: true, // Enable isolation to prevent test pollution
        useAtomics: false,
        minThreads: 1,
        maxThreads: 1,
      },
    },

    // Minimal concurrency
    maxConcurrency: 1,
    maxWorkers: 1,

    // Tight timeouts
    testTimeout: 5000,
    hookTimeout: 5000,

    // Aggressive cleanup and isolation
    clearMocks: true,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,

    // Force sequential execution with better isolation
    sequence: {
      concurrent: false,
      shuffle: false,
      setupFiles: "parallel",
      hooks: "stack",
    },

    // Disable coverage for lightweight runs
    coverage: {
      enabled: false,
    },

    // Include all component tests but exclude problematic ones
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: [
      "node_modules",
      "dist",
      ".idea",
      ".git",
      ".cache",
      "**/*.d.ts",
      "**/*.stories.*",
      "**/*.client.test.*", // Exclude any remaining client-side tests
    ],

    // Memory management
    logHeapUsage: true,

    // Environment options for better isolation
    environmentOptions: {
      jsdom: {
        resources: "usable",
        runScripts: "dangerously",
      },
    },
  },
} as any);
