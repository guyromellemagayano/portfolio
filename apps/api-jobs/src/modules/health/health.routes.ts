/**
 * @file apps/api-jobs/src/modules/health/health.routes.ts
 * @author Guy Romelle Magayano
 * @description Health routes for the jobs API runtime.
 */

import { sendSuccess } from "@api-jobs/contracts/http";
import { Elysia } from "elysia";

/** Creates the jobs API health router. */
export function createHealthRouter() {
  return new Elysia({ name: "jobs-health" }).get("/v1/status", (context) => {
    return sendSuccess(context, {
      service: "api-jobs",
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  });
}
