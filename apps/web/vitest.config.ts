import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { getViteConfig } from "astro/config";

import { reactPreset } from "@portfolio/vitest-presets";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default getViteConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@portfolio\/logger$/,
        replacement: path.resolve(
          __dirname,
          "../../packages/logger/src/index.ts"
        ),
      },
      {
        find: /^@portfolio\/utils$/,
        replacement: path.resolve(
          __dirname,
          "../../packages/utils/src/index.ts"
        ),
      },
      {
        find: "@web",
        replacement: path.resolve(__dirname, "./src"),
      },
      // Centralized mocks
      {
        find: "@mocks",
        replacement: path.resolve(__dirname, "../../__mocks__"),
      },
    ],
  },
  test: {
    ...reactPreset.test,
    setupFiles: ["@portfolio/vitest-presets/shared/test-setup.ts"], // Use shared test setup
    globals: true,

    // Memory optimization settings
    pool: "threads",
    threads: {
      singleThread: true,
      isolate: false,
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
      concurrent: false,
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
        ".astro/",
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
        "**/vite.config.*",
        "**/vitest.config.*",
        "**/jest.config.*",
        "**/rollup.config.*",
        "**/tailwind.config.*",
        "**/postcss.config.*",
        "**/astro.config.*",
        "**/remix.config.*",
        "**/README.md",
        "src/layouts/**/*.astro",
        "src/pages/**/*",
      ],
      include: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.{test,spec}.{js,jsx,ts,tsx}",
        "!src/**/test-setup.*",
        "!src/**/*.d.ts",
        "!src/layouts/**/*.astro",
        "!src/pages/**/*",
      ],
    },
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: [
      "node_modules",
      "dist",
      ".astro",
      ".idea",
      ".git",
      ".cache",
      "**/*.d.ts",
      "**/*.stories.*",
    ],
  },
} as any);
