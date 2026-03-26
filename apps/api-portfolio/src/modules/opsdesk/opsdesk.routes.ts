/**
 * @file apps/api-portfolio/src/modules/opsdesk/opsdesk.routes.ts
 * @author Guy Romelle Magayano
 * @description Versioned OpsDesk routes exposed by the portfolio API.
 */

import { Elysia, t } from "elysia";

import {
  OPSDESK_APPROVALS_ROUTE,
  OPSDESK_AUDIT_ROUTE,
  OPSDESK_INCIDENTS_ROUTE,
  OPSDESK_OVERVIEW_ROUTE,
  OPSDESK_REQUESTS_ROUTE,
  OPSDESK_ROUTE_PREFIX,
  OPSDESK_TEAMS_ROUTE,
} from "@portfolio/api-contracts/opsdesk";
import type { ILogger } from "@portfolio/logger";

import { sendSuccess } from "../../contracts/http.js";
import type { OpsDeskService } from "./opsdesk.service.js";

const responseMetaSchema = t.Object(
  {
    correlationId: t.String(),
    requestId: t.String(),
    timestamp: t.String(),
  },
  {
    additionalProperties: true,
  }
);

const successEnvelopeSchema = t.Object({
  success: t.Literal(true),
  data: t.Any(),
  meta: responseMetaSchema,
});

const errorEnvelopeSchema = t.Object({
  success: t.Literal(false),
  error: t.Object({
    code: t.String(),
    message: t.String(),
    details: t.Optional(t.Any()),
  }),
  meta: responseMetaSchema,
});

/** Creates routes for OpsDesk operational resources. */
export function createOpsDeskRouter(opsDeskService: OpsDeskService) {
  return new Elysia({
    name: "api-opsdesk-routes",
    prefix: OPSDESK_ROUTE_PREFIX,
  })
    .get(
      OPSDESK_OVERVIEW_ROUTE.replace(OPSDESK_ROUTE_PREFIX, ""),
      async (context) => {
        const requestLogger =
          "logger" in context ? (context as { logger?: ILogger }).logger : null;
        const overview = await opsDeskService.getOverview();

        requestLogger?.info("Serving OpsDesk overview", {
          metrics: overview.metrics.length,
          incidents: overview.incidents.length,
          teams: overview.teams.length,
        });

        return sendSuccess(context, overview, {
          meta: {
            module: "opsdesk",
            resource: "overview",
          },
        });
      },
      {
        detail: {
          tags: ["OpsDesk"],
          summary: "Get OpsDesk overview",
          description:
            "Returns the top-level OpsDesk operational view, including metrics, incidents, and team load.",
        },
        response: {
          200: successEnvelopeSchema,
          500: errorEnvelopeSchema,
        },
      }
    )
    .get(
      OPSDESK_REQUESTS_ROUTE.replace(OPSDESK_ROUTE_PREFIX, ""),
      async (context) => {
        const requestLogger =
          "logger" in context ? (context as { logger?: ILogger }).logger : null;
        const requests = await opsDeskService.getRequests();

        requestLogger?.info("Serving OpsDesk requests", {
          count: requests.length,
        });

        return sendSuccess(context, requests, {
          meta: {
            module: "opsdesk",
            resource: "requests",
            count: requests.length,
          },
        });
      },
      {
        detail: {
          tags: ["OpsDesk"],
          summary: "List OpsDesk requests",
          description:
            "Returns the operational request queue used by the OpsDesk admin workspace.",
        },
        response: {
          200: successEnvelopeSchema,
          500: errorEnvelopeSchema,
        },
      }
    )
    .get(
      OPSDESK_APPROVALS_ROUTE.replace(OPSDESK_ROUTE_PREFIX, ""),
      async (context) => {
        const requestLogger =
          "logger" in context ? (context as { logger?: ILogger }).logger : null;
        const approvals = await opsDeskService.getApprovals();

        requestLogger?.info("Serving OpsDesk approvals", {
          count: approvals.length,
        });

        return sendSuccess(context, approvals, {
          meta: {
            module: "opsdesk",
            resource: "approvals",
            count: approvals.length,
          },
        });
      },
      {
        detail: {
          tags: ["OpsDesk"],
          summary: "List OpsDesk approvals",
          description:
            "Returns the approval queue used by the OpsDesk admin workspace.",
        },
        response: {
          200: successEnvelopeSchema,
          500: errorEnvelopeSchema,
        },
      }
    )
    .get(
      OPSDESK_TEAMS_ROUTE.replace(OPSDESK_ROUTE_PREFIX, ""),
      async (context) => {
        const requestLogger =
          "logger" in context ? (context as { logger?: ILogger }).logger : null;
        const teams = await opsDeskService.getTeams();

        requestLogger?.info("Serving OpsDesk teams", {
          count: teams.length,
        });

        return sendSuccess(context, teams, {
          meta: {
            module: "opsdesk",
            resource: "teams",
            count: teams.length,
          },
        });
      },
      {
        detail: {
          tags: ["OpsDesk"],
          summary: "List OpsDesk teams",
          description:
            "Returns OpsDesk team ownership and workload coverage rows.",
        },
        response: {
          200: successEnvelopeSchema,
          500: errorEnvelopeSchema,
        },
      }
    )
    .get(
      OPSDESK_INCIDENTS_ROUTE.replace(OPSDESK_ROUTE_PREFIX, ""),
      async (context) => {
        const requestLogger =
          "logger" in context ? (context as { logger?: ILogger }).logger : null;
        const incidents = await opsDeskService.getIncidents();

        requestLogger?.info("Serving OpsDesk incidents", {
          count: incidents.length,
        });

        return sendSuccess(context, incidents, {
          meta: {
            module: "opsdesk",
            resource: "incidents",
            count: incidents.length,
          },
        });
      },
      {
        detail: {
          tags: ["OpsDesk"],
          summary: "List OpsDesk incidents",
          description:
            "Returns active and recently resolved incident rows for OpsDesk.",
        },
        response: {
          200: successEnvelopeSchema,
          500: errorEnvelopeSchema,
        },
      }
    )
    .get(
      OPSDESK_AUDIT_ROUTE.replace(OPSDESK_ROUTE_PREFIX, ""),
      async (context) => {
        const requestLogger =
          "logger" in context ? (context as { logger?: ILogger }).logger : null;
        const auditLog = await opsDeskService.getAuditLog();

        requestLogger?.info("Serving OpsDesk audit log", {
          count: auditLog.length,
        });

        return sendSuccess(context, auditLog, {
          meta: {
            module: "opsdesk",
            resource: "audit",
            count: auditLog.length,
          },
        });
      },
      {
        detail: {
          tags: ["OpsDesk"],
          summary: "List OpsDesk audit events",
          description:
            "Returns the latest operator-facing audit rows for OpsDesk.",
        },
        response: {
          200: successEnvelopeSchema,
          500: errorEnvelopeSchema,
        },
      }
    );
}
