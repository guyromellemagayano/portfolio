/**
 * @file apps/api/src/server.ts
 * @author Guy Romelle Magayano
 * @description Express server composition for the API gateway.
 */

import bodyParser from "body-parser";
import cors, { type CorsOptions } from "cors";
import express, { type Express } from "express";

import { type ApiRuntimeConfig, getApiConfig } from "./config/env.js";
import { createApiLogger } from "./config/logger.js";
import { createProviderRegistry } from "./gateway/provider-registry.js";
import { createErrorHandler } from "./middleware/error-handler.js";
import { createHttpLoggerMiddleware } from "./middleware/http-logger.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { createRequestContextMiddleware } from "./middleware/request-context.js";
import { createContentRouter } from "./modules/content/content.routes.js";
import { createContentService } from "./modules/content/content.service.js";
import { createHealthRouter } from "./modules/health/health.routes.js";
import { createMessageRouter } from "./modules/message/message.routes.js";

/** Resolves the CORS `origin` configuration based on environment and allowlist settings. */
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

/** Creates the composed Express server instance for the API gateway runtime. */
export const createServer = (): Express => {
  const { json, urlencoded } = bodyParser;
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

  app.get("/", (_request, response) => {
    response.redirect(308, "/v1/status");
  });

  app.use(createHealthRouter());
  app.use(createMessageRouter());
  app.use("/v1/content", createContentRouter(contentService));

  app.use(notFoundHandler);
  app.use(createErrorHandler(logger));

  return app;
};
