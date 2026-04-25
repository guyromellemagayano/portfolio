import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRootDirectory = path.resolve(currentDirectory, "../..");
const workspaceRootEnvLocalFile = path.join(workspaceRootDirectory, ".env");

if (existsSync(workspaceRootEnvLocalFile)) {
  globalThis.process.loadEnvFile(workspaceRootEnvLocalFile);
}

const isCI = Boolean(process.env.CI);
const useExternalServers = process.env.E2E_USE_EXTERNAL_SERVERS?.trim() === "1";
const configuredBaseUrl = process.env.E2E_BASE_URL?.trim();
const baseURL =
  configuredBaseUrl === "http://127.0.0.1:3000" ||
  configuredBaseUrl === "http://localhost:3000"
    ? "http://127.0.0.1:4321"
    : (configuredBaseUrl ?? "http://127.0.0.1:4321");
const configuredWebServers = useExternalServers
  ? undefined
  : [
      {
        command: isCI ? "pnpm --filter web start" : "pnpm --filter web dev",
        port: 4321,
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
    baseURL,
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
