/**
 * @file apps/api/src/index.ts
 * @author Guy Romelle Magayano
 * @description API gateway bootstrap entrypoint.
 */

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getApiConfig } from "./config/env.js";
import { createApiLogger } from "./config/logger.js";
import { createServer } from "./server.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRootDirectory = path.resolve(currentDirectory, "../../..");
const workspaceRootEnvLocalFile = path.join(
  workspaceRootDirectory,
  ".env.local"
);

if (existsSync(workspaceRootEnvLocalFile)) {
  globalThis.process.loadEnvFile(workspaceRootEnvLocalFile);
}

const config = getApiConfig();
const logger = createApiLogger(config.nodeEnv);
const server = createServer();

server.listen(config.port, () => {
  logger.info("API gateway started", {
    port: config.port,
    nodeEnv: config.nodeEnv,
  });
});
