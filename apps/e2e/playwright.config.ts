import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRootDirectory = path.resolve(currentDirectory, "../..");
const workspaceRootEnvLocalFile = path.join(
  workspaceRootDirectory,
  ".env.local"
);

if (existsSync(workspaceRootEnvLocalFile)) {
  globalThis.process.loadEnvFile(workspaceRootEnvLocalFile);
}

const isCI = Boolean(process.env.CI);
const useExternalServers = process.env.E2E_USE_EXTERNAL_SERVERS?.trim() === "1";
const configuredWebServers = useExternalServers
  ? undefined
  : [
      {
        command: "pnpm --filter api run build && pnpm --filter api start",
        port: 5001,
        reuseExistingServer: !isCI,
        timeout: 120_000,
      },
      {
        command: isCI ? "pnpm --filter web start" : "pnpm --filter web dev",
        port: 3000,
        reuseExistingServer: !isCI,
        timeout: 120_000,
      },
    ];

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.e2e.ts"],
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  reporter: isCI
    ? [["github"], ["html", { open: "never" }], ["list"]]
    : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "mobile-chrome",
      use: {
        ...devices["Pixel 7"],
      },
      grep: /@smoke/,
      dependencies: ["setup"],
    },
  ],
  webServer: configuredWebServers,
});
