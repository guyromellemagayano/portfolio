/**
 * @file apps/api-jobs/src/modules/jobs/jobs.routes.ts
 * @author Guy Romelle Magayano
 * @description Search and detail routes for normalized job data.
 */

import { sendSuccess } from "@api-jobs/contracts/http";
import { createJobsService } from "@api-jobs/modules/jobs/jobs.service";
import { Elysia, t } from "elysia";

import {
  JOBS_ROUTE_DETAIL_PATTERN,
  JOBS_ROUTE_LIST,
} from "@portfolio/api-contracts";

/** Creates the jobs search and detail router. */
export function createJobsRouter(
  service: ReturnType<typeof createJobsService>
) {
  return new Elysia({ name: "jobs-routes" })
    .get(
      JOBS_ROUTE_LIST,
      async ({ query, ...context }) => {
        const data = await service.searchJobs({
          keyword: query.keyword,
          ats: query.ats
            ? ((Array.isArray(query.ats) ? query.ats : [query.ats]) as Array<
                "ashby" | "greenhouse" | "lever" | "workday"
              >)
            : undefined,
          company: query.company,
          location: query.location,
          remoteModes: query.remoteModes
            ? ((Array.isArray(query.remoteModes)
                ? query.remoteModes
                : [query.remoteModes]) as Array<
                "hybrid" | "on_site" | "remote" | "unknown"
              >)
            : undefined,
          employmentTypes: query.employmentTypes
            ? ((Array.isArray(query.employmentTypes)
                ? query.employmentTypes
                : [query.employmentTypes]) as Array<
                | "contract"
                | "full_time"
                | "internship"
                | "part_time"
                | "temporary"
                | "unknown"
              >)
            : undefined,
          freshWithinHours: query.freshWithinHours,
          includeIgnored: query.includeIgnored,
          onlyApplied: query.onlyApplied,
          onlySaved: query.onlySaved,
          page: query.page,
          pageSize: query.pageSize,
        });
        return sendSuccess(context, data);
      },
      {
        query: t.Object(
          {
            keyword: t.Optional(t.String()),
            ats: t.Optional(t.Union([t.String(), t.Array(t.String())])),
            company: t.Optional(t.String()),
            location: t.Optional(t.String()),
            remoteModes: t.Optional(t.Union([t.String(), t.Array(t.String())])),
            employmentTypes: t.Optional(
              t.Union([t.String(), t.Array(t.String())])
            ),
            freshWithinHours: t.Optional(t.Numeric()),
            includeIgnored: t.Optional(t.BooleanString()),
            onlyApplied: t.Optional(t.BooleanString()),
            onlySaved: t.Optional(t.BooleanString()),
            page: t.Optional(t.Numeric()),
            pageSize: t.Optional(t.Numeric()),
          },
          {
            additionalProperties: false,
          }
        ),
      }
    )
    .get(
      JOBS_ROUTE_DETAIL_PATTERN,
      async ({ params, ...context }) => {
        const data = await service.getJobDetail(params.id);
        return sendSuccess(context, data);
      },
      {
        params: t.Object({
          id: t.String(),
        }),
      }
    );
}
