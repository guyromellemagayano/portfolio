/**
 * @file apps/api-jobs/src/modules/tracker/tracker.routes.ts
 * @author Guy Romelle Magayano
 * @description Tracker mutation routes for single-user local job state.
 */

import { t } from "elysia";
import { Elysia } from "elysia";

import {
  JOBS_ROUTE_APPLICATION_RESET_PATTERN,
  JOBS_ROUTE_STATE_PATTERN,
} from "@portfolio/api-contracts";
import { sendSuccess } from "@api-jobs/contracts/http";
import { createJobsService } from "@api-jobs/modules/jobs/jobs.service";

/** Creates the tracker mutation router. */
export function createTrackerRouter(
  service: ReturnType<typeof createJobsService>
) {
  return new Elysia({ name: "tracker-routes" })
    .patch(
      JOBS_ROUTE_STATE_PATTERN,
      async ({ params, body, ...context }) => {
        const data = await service.updateUserJobState(params.id, body);
        return sendSuccess(context, data);
      },
      {
        params: t.Object({
          id: t.String(),
        }),
        body: t.Object({
          ignored: t.Optional(t.Boolean()),
          saved: t.Optional(t.Boolean()),
          applied: t.Optional(t.Boolean()),
          applicationStatus: t.Optional(
            t.Union([
              t.Literal("not_started"),
              t.Literal("saved"),
              t.Literal("applied"),
              t.Literal("screening"),
              t.Literal("interview"),
              t.Literal("offer"),
              t.Literal("rejected"),
              t.Literal("withdrawn"),
            ])
          ),
          notes: t.Optional(t.String()),
        }),
      }
    )
    .delete(
      JOBS_ROUTE_APPLICATION_RESET_PATTERN,
      async ({ params, ...context }) => {
        const data = await service.resetUserJobApplication(params.id);
        return sendSuccess(context, data);
      },
      {
        params: t.Object({
          id: t.String(),
        }),
      }
    );
}
