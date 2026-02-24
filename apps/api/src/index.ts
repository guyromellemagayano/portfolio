/**
 * @file apps/api/src/index.ts
 * @author Guy Romelle Magayano
 * @description API gateway bootstrap entrypoint.
 */

import { getApiConfig } from "@api/config/env";
import { createApiLogger } from "@api/config/logger";
import { createServer } from "@api/server";

const config = getApiConfig();
const logger = createApiLogger(config.nodeEnv);
const server = createServer();

server.listen(config.port, () => {
  logger.info("API gateway started", {
    port: config.port,
    nodeEnv: config.nodeEnv,
  });
});
