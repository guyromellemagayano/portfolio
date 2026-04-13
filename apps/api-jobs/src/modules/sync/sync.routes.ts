/**
 * @file apps/api-jobs/src/modules/sync/sync.routes.ts
 * @author Guy Romelle Magayano
 * @description Manual sync trigger and status routes for the jobs API runtime.
 */

import { t } from "elysia";
import { Elysia } from "elysia";

import {
  JOBS_ROUTE_SYNC_RUN,
  JOBS_ROUTE_SYNC_STATUS,
} from "@portfolio/api-contracts";
import { sendSuccess } from "@api-jobs/contracts/http";
import { createJobsService } from "@api-jobs/modules/jobs/jobs.service";

/** Creates the sync router. */
export function createSyncRouter(
  service: ReturnType<typeof createJobsService>
) {
  return new Elysia({ name: "sync-routes" })
    .post(
      JOBS_ROUTE_SYNC_RUN,
      async ({ body, ...context }) => {
        const data = await service.runSync(body?.triggeredBy ?? "manual");
        return sendSuccess(context, data, {
          statusCode: 202,
        });
      },
      {
        body: t.Optional(
          t.Object({
            triggeredBy: t.Optional(t.String()),
          })
        ),
      }
    )
    .get(JOBS_ROUTE_SYNC_STATUS, async (context) => {
      const data = await service.getLatestSyncStatus();
      return sendSuccess(context, data);
    });
}
