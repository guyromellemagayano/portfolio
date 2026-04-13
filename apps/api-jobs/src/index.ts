/**
 * @file apps/api-jobs/src/index.ts
 * @author Guy Romelle Magayano
 * @description Jobs API bootstrap entrypoint.
 */

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { getJobsApiConfig } from "@api-jobs/config/env";
import { createServer } from "@api-jobs/server";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRootDirectory = path.resolve(currentDirectory, "../../..");
const workspaceRootEnvLocalFile = path.join(
  workspaceRootDirectory,
  ".env.local"
);

if (existsSync(workspaceRootEnvLocalFile)) {
  const loadEnvFile = process.loadEnvFile;

  if (typeof loadEnvFile === "function") {
    loadEnvFile(workspaceRootEnvLocalFile);
  }
}

/** Starts the jobs API Node server for local and non-serverless runtimes. */
export async function startApiServer(): Promise<void> {
  const config = getJobsApiConfig();
  const app = await createServer();

  app.listen({
    port: config.port,
    hostname: "0.0.0.0",
  });
}

/** Indicates whether this module is running as the process entrypoint. */
function isDirectExecution(): boolean {
  const entryFilePath = globalThis?.process?.argv?.[1];

  if (!entryFilePath) {
    return false;
  }

  try {
    return import.meta.url === pathToFileURL(entryFilePath).href;
  } catch {
    return false;
  }
}

export { createServer } from "./server.js";

if (isDirectExecution()) {
  void startApiServer();
}
