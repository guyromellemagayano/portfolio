import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
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
    ],
  },
  test: {
    environment: "node",
    globals: true,
    pool: "threads",
    threads: {
      singleThread: true,
      isolate: false,
    },
    maxConcurrency: 1,
    maxWorkers: 1,
    testTimeout: 5000,
    hookTimeout: 5000,
    clearMocks: true,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
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
      include: ["src/**/*.{js,ts,mjs,mts,cjs,cts}"],
    },
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}"],
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
