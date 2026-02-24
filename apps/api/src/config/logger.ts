/**
 * @file apps/api/src/config/logger.ts
 * @author Guy Romelle Magayano
 * @description Logger factory for API gateway runtime.
 */

import { createLogger, LogLevel, type ILogger } from "@portfolio/logger";

import type { ApiRuntimeEnvironment } from "@api/config/env";

/** Creates the base logger for the API gateway process. */
export function createApiLogger(nodeEnv: ApiRuntimeEnvironment): ILogger {
  return createLogger({
    level: nodeEnv === "production" ? LogLevel.INFO : LogLevel.DEBUG,
    defaultContext: {
      component: "api-gateway",
      metadata: {
        service: "apps/api",
      },
    },
  });
}
