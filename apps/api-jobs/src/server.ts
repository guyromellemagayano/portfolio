/**
 * @file apps/api-jobs/src/server.ts
 * @author Guy Romelle Magayano
 * @description Elysia server composition for the jobs API.
 */

import { randomUUID } from "node:crypto";

import { cors } from "@elysiajs/cors";
import { node } from "@elysiajs/node";
import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";

import {
  CORRELATION_ID_HEADER,
  API_ROOT_ROUTE,
  API_ERROR_CODES,
  HEALTH_ROUTE_STATUS,
  OPENAPI_ROUTE,
} from "@portfolio/api-contracts/http";

import {
  getJobsApiConfig,
  type JobsApiRuntimeConfig,
} from "@api-jobs/config/env";
import { sendError } from "@api-jobs/contracts/http";
import { getJobsSqlClient } from "@api-jobs/db/client";
import { runJobsMigrations } from "@api-jobs/db/migrate";
import {
  createJobsService,
  JobsServiceError,
} from "@api-jobs/modules/jobs/jobs.service";
import { createHealthRouter } from "@api-jobs/modules/health/health.routes";
import { createJobsRouter } from "@api-jobs/modules/jobs/jobs.routes";
import { createPreferencesRouter } from "@api-jobs/modules/preferences/preferences.routes";
import { createSourcesRouter } from "@api-jobs/modules/sources/sources.routes";
import { createSyncRouter } from "@api-jobs/modules/sync/sync.routes";
import { createTrackerRouter } from "@api-jobs/modules/tracker/tracker.routes";

type CorsOriginConfig = string[] | true | false;
type AnyElysiaInstance = Elysia<any, any, any, any, any, any, any>;

/** Detects whether the jobs API is running in a Bun runtime. */
function isBunRuntime(): boolean {
  return typeof (globalThis as { Bun?: unknown }).Bun !== "undefined";
}

/** Resolves the CORS `origin` configuration based on environment and allowlist settings. */
export function resolveCorsOrigin(
  config: JobsApiRuntimeConfig
): CorsOriginConfig {
  if (config.corsOrigins.length > 0) {
    return config.corsOrigins;
  }

  if (config.nodeEnv === "production") {
    return false;
  }

  return true;
}

/** Creates the composed Elysia server instance for the jobs API runtime. */
export async function createServer(): Promise<AnyElysiaInstance> {
  const config = getJobsApiConfig();
  const sql = getJobsSqlClient(config.databaseUrl);

  await runJobsMigrations(sql);

  const jobsService = createJobsService(sql);
  await jobsService.initialize();

  const corsOrigin = resolveCorsOrigin(config);
  const shouldUseNodeAdapter = !isBunRuntime();

  return new Elysia({
    name: "api-jobs",
    ...(shouldUseNodeAdapter
      ? {
          adapter: node(),
        }
      : {}),
  })
    .decorate("jobsService", jobsService)
    .state("jobsService", jobsService)
    .use(
      openapi({
        path: OPENAPI_ROUTE,
        documentation: {
          info: {
            title: "Jobs API",
            version: "1.0.0",
            description:
              "Single-user local-first direct ATS aggregation and tracker API.",
          },
          tags: [
            {
              name: "Health",
              description: "Service liveness endpoints.",
            },
            {
              name: "Jobs",
              description: "Normalized jobs search, detail, and tracker state.",
            },
          ],
        },
      })
    )
    .use(
      cors({
        origin: corsOrigin,
        credentials: corsOrigin !== false,
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: [
          "accept",
          "content-type",
          "authorization",
          CORRELATION_ID_HEADER,
        ],
        exposeHeaders: [CORRELATION_ID_HEADER],
      })
    )
    .derive(({ request, set }) => {
      const correlationId =
        request.headers.get(CORRELATION_ID_HEADER)?.trim() || randomUUID();

      set.headers[CORRELATION_ID_HEADER] = correlationId;

      return {
        requestContext: {
          correlationId,
          requestId: randomUUID(),
        },
      };
    })
    .onError(({ code, error, ...context }) => {
      if (error instanceof JobsServiceError) {
        return sendError(context, {
          statusCode: error.statusCode,
          code: error.code,
          message: error.message,
          details: error.details,
        });
      }

      return sendError(context, {
        statusCode: code === "NOT_FOUND" ? 404 : 500,
        code:
          code === "NOT_FOUND"
            ? API_ERROR_CODES.ROUTE_NOT_FOUND
            : API_ERROR_CODES.INTERNAL_SERVER_ERROR,
        message:
          code === "NOT_FOUND"
            ? `No route matches ${context.request.method} ${new URL(context.request.url).pathname}.`
            : error instanceof Error
              ? error.message
              : API_ERROR_CODES.INTERNAL_SERVER_ERROR,
      });
    })
    .get(API_ROOT_ROUTE, () => {
      return new Response(null, {
        status: 308,
        headers: {
          location: HEALTH_ROUTE_STATUS,
        },
      });
    })
    .use(createHealthRouter())
    .use(createJobsRouter(jobsService))
    .use(createSourcesRouter(jobsService))
    .use(createSyncRouter(jobsService))
    .use(createTrackerRouter(jobsService))
    .use(createPreferencesRouter(jobsService));
}
