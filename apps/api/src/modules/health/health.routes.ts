/**
 * @file apps/api/src/modules/health/health.routes.ts
 * @author Guy Romelle Magayano
 * @description Health-check routes for gateway liveness/readiness, with legacy route redirects to the latest versioned endpoint.
 */

import { Elysia, t } from "elysia";

import {
  HEALTH_ROUTE_LEGACY,
  HEALTH_ROUTE_STATUS,
} from "@portfolio/api-contracts/http";
import type { ILogger } from "@portfolio/logger";

import { sendSuccess } from "../../contracts/http.js";

/** Creates health-check routes. */
export function createHealthRouter(): Elysia {
  return new Elysia({
    name: "api-health-routes",
  })
    .get(
      HEALTH_ROUTE_LEGACY,
      (context) => {
        const requestLogger =
          "logger" in context ? (context as { logger?: ILogger }).logger : null;

        requestLogger?.debug(
          "Redirecting legacy health check route to versioned endpoint"
        );
        context.set.status = 308;

        return new Response(null, {
          status: 308,
          headers: {
            location: HEALTH_ROUTE_STATUS,
          },
        });
      },
      {
        detail: {
          tags: ["Health"],
          summary: "Legacy health redirect",
          description: "Redirects legacy health checks to the versioned route.",
        },
      }
    )
    .get(
      HEALTH_ROUTE_STATUS,
      (context) => {
        const requestLogger =
          "logger" in context ? (context as { logger?: ILogger }).logger : null;

        requestLogger?.debug("Versioned health check requested");

        return sendSuccess(
          context,
          { ok: true },
          {
            meta: {
              service: "api-gateway",
            },
          }
        );
      },
      {
        detail: {
          tags: ["Health"],
          summary: "Gateway health status",
          description: "Returns the API gateway liveness status.",
        },
        response: {
          200: t.Any(),
        },
      }
    );
}
