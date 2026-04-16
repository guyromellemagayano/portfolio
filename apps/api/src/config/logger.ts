/**
 * @file apps/api/src/config/logger.ts
 * @author Guy Romelle Magayano
 * @description Logger factory for portfolio API runtime.
 */

import { createLogger, type ILogger, LogLevel } from "@portfolio/logger";

import type { ApiRuntimeEnvironment } from "./env.js";

/** Creates the base logger for the portfolio API process. */
export function createApiLogger(nodeEnv: ApiRuntimeEnvironment): ILogger {
  const level =
    nodeEnv === "test"
      ? LogLevel.SILENT
      : nodeEnv === "production"
        ? LogLevel.INFO
        : LogLevel.DEBUG;

  return createLogger({
    level,
    defaultContext: {
      component: "api",
      metadata: {
        service: "apps/api",
      },
    },
    errorHandling: {
      handleExceptions: false,
      handleRejections: false,
      exitOnError: false,
    },
  });
}
