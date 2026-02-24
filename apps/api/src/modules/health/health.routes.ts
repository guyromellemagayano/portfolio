/**
 * @file apps/api/src/modules/health/health.routes.ts
 * @author Guy Romelle Magayano
 * @description Health-check routes for gateway liveness and readiness.
 */

import { Router } from "express";

import { sendSuccess } from "@api/contracts/http";

/** Creates health-check routes. */
export function createHealthRouter(): Router {
  const router = Router();

  router.get("/status", (request, response) => {
    request.logger.debug("Legacy health check requested");
    response.json({ ok: true });
  });

  router.get("/v1/status", (request, response) => {
    request.logger.debug("Versioned health check requested");

    return sendSuccess(
      request,
      response,
      { ok: true },
      {
        meta: {
          service: "api-gateway",
        },
      }
    );
  });

  return router;
}
