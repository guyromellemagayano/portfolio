/**
 * @file apps/api-jobs/src/modules/sources/sources.routes.ts
 * @author Guy Romelle Magayano
 * @description Source registry and verification routes for jobs ingestion.
 */

import { t } from "elysia";
import { Elysia } from "elysia";

import {
  JOBS_ROUTE_SOURCES,
  JOBS_ROUTE_SOURCES_VERIFY,
} from "@portfolio/api-contracts";
import { sendSuccess } from "@api-jobs/contracts/http";
import { createJobsService } from "@api-jobs/modules/jobs/jobs.service";

/** Creates the job source registry router. */
export function createSourcesRouter(
  service: ReturnType<typeof createJobsService>
) {
  return new Elysia({ name: "sources-routes" })
    .get(JOBS_ROUTE_SOURCES, async (context) => {
      const data = await service.listSources();
      return sendSuccess(context, data);
    })
    .post(
      JOBS_ROUTE_SOURCES_VERIFY,
      async ({ body, ...context }) => {
        const data = await service.verifySources(body?.sourceIds);
        return sendSuccess(context, data);
      },
      {
        body: t.Optional(
          t.Object({
            sourceIds: t.Optional(t.Array(t.String())),
          })
        ),
      }
    );
}
