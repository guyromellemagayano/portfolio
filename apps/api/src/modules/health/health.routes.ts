/**
 * @file apps/api/src/modules/health/health.routes.ts
 * @author Guy Romelle Magayano
 * @description Health-check routes for gateway liveness/readiness, with legacy route redirects to the latest versioned endpoint.
 */

import { Router } from "express";

import { sendSuccess } from "@api/contracts/http";

/** Creates health-check routes. */
export function createHealthRouter(): Router {
  const router = Router();

  router.get("/status", (request, response) => {
    request.logger.debug(
      "Redirecting legacy health check route to versioned endpoint"
    );

    return response.redirect(308, "/v1/status");
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
