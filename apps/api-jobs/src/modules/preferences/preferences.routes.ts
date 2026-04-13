/**
 * @file apps/api-jobs/src/modules/preferences/preferences.routes.ts
 * @author Guy Romelle Magayano
 * @description Single-user preference routes for jobs filters and defaults.
 */

import { t } from "elysia";
import { Elysia } from "elysia";

import { JOBS_ROUTE_PREFERENCES } from "@portfolio/api-contracts";
import { sendSuccess } from "@api-jobs/contracts/http";
import { createJobsService } from "@api-jobs/modules/jobs/jobs.service";

/** Creates the preferences router. */
export function createPreferencesRouter(
  service: ReturnType<typeof createJobsService>
) {
  return new Elysia({ name: "preferences-routes" })
    .get(JOBS_ROUTE_PREFERENCES, async (context) => {
      const data = await service.getUserPreferences();
      return sendSuccess(context, data);
    })
    .patch(
      JOBS_ROUTE_PREFERENCES,
      async ({ body, ...context }) => {
        const data = await service.updateUserPreferences(body);
        return sendSuccess(context, data);
      },
      {
        body: t.Object({
          keywords: t.Optional(t.Array(t.String())),
          preferredLocations: t.Optional(t.Array(t.String())),
          remoteModes: t.Optional(
            t.Array(
              t.Union([
                t.Literal("remote"),
                t.Literal("hybrid"),
                t.Literal("on_site"),
                t.Literal("unknown"),
              ])
            )
          ),
          employmentTypes: t.Optional(
            t.Array(
              t.Union([
                t.Literal("full_time"),
                t.Literal("part_time"),
                t.Literal("contract"),
                t.Literal("internship"),
                t.Literal("temporary"),
                t.Literal("unknown"),
              ])
            )
          ),
        }),
      }
    );
}
