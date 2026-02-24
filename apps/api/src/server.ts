/**
 * @file apps/api/src/server.ts
 * @author Guy Romelle Magayano
 * @description Express server composition for the API gateway.
 */

import { json, urlencoded } from "body-parser";
import cors, { type CorsOptions } from "cors";
import express, { type Express } from "express";

import { getApiConfig, type ApiRuntimeConfig } from "@api/config/env";
import { createApiLogger } from "@api/config/logger";
import { createProviderRegistry } from "@api/gateway/provider-registry";
import { createErrorHandler } from "@api/middleware/error-handler";
import { createHttpLoggerMiddleware } from "@api/middleware/http-logger";
import { notFoundHandler } from "@api/middleware/not-found";
import { createRequestContextMiddleware } from "@api/middleware/request-context";
import { createContentRouter } from "@api/modules/content/content.routes";
import { createContentService } from "@api/modules/content/content.service";
import { createHealthRouter } from "@api/modules/health/health.routes";
import { createMessageRouter } from "@api/modules/message/message.routes";

export function resolveCorsOrigin(
  config: ApiRuntimeConfig
): CorsOptions["origin"] {
  if (config.corsOrigins.length > 0) {
    return config.corsOrigins;
  }

  if (config.nodeEnv === "production") {
    return false;
  }

  return true;
}

export const createServer = (): Express => {
  const config = getApiConfig();
  const logger = createApiLogger(config.nodeEnv);
  const providers = createProviderRegistry(config, logger);
  const contentService = createContentService(providers.content);
  const corsOrigin = resolveCorsOrigin(config);

  const app = express();

  app.disable("x-powered-by");

  app.use(createRequestContextMiddleware(logger));
  app.use(createHttpLoggerMiddleware(logger));
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(
    cors({
      origin: corsOrigin,
      credentials: corsOrigin !== false,
    })
  );

  if (corsOrigin === false) {
    logger.warn(
      "CORS allowlist is empty in production. Cross-origin browser requests are disabled."
    );
  }

  app.use(createHealthRouter());
  app.use(createMessageRouter());
  app.use("/v1/content", createContentRouter(contentService));

  app.use(notFoundHandler);
  app.use(createErrorHandler(logger));

  return app;
};
