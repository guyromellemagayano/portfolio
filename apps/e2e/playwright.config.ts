import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRootDirectory = path.resolve(currentDirectory, "../..");
const workspaceRootEnvLocalFile = path.join(workspaceRootDirectory, ".env");

if (
  existsSync(workspaceRootEnvLocalFile) &&
  typeof globalThis.process.loadEnvFile === "function"
) {
  globalThis.process.loadEnvFile(workspaceRootEnvLocalFile);
}

const isCI = Boolean(process.env.CI);

function readEnvValue(key: string): string | undefined {
  return process.env[key]?.trim() || undefined;
}

const useExternalServers = readEnvValue("E2E_USE_EXTERNAL_SERVERS") === "1";
const configuredBaseUrl = readEnvValue("E2E_BASE_URL");
const configuredDevelopmentSiteUrl = readEnvValue("SITE_URL_DEVELOPMENT");
const configuredWebPort = Number.parseInt(
  process.env.WEB_PORT?.trim() ?? "4321",
  10
);
const webServerPort = Number.isFinite(configuredWebPort)
  ? configuredWebPort
  : 4321;
const localSiteUrl =
  configuredDevelopmentSiteUrl || `http://portfolio.local:${webServerPort}`;
const hostBaseUrl = `http://localhost:${webServerPort}`;
const baseURL =
  configuredBaseUrl ?? (useExternalServers ? localSiteUrl : hostBaseUrl);
const configuredWebServers = useExternalServers
  ? undefined
  : [
      {
        command: isCI ? "pnpm --filter web start" : "pnpm --filter web dev",
        port: webServerPort,
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
