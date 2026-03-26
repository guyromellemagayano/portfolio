/**
 * @file apps/api-portfolio/src/modules/opsdesk/__tests__/opsdesk.routes.contract.test.ts
 * @author Guy Romelle Magayano
 * @description Contract tests for OpsDesk routes using Elysia runtime request handling.
 */

import { Elysia } from "elysia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  API_ERROR_CODES,
  CORRELATION_ID_HEADER,
  getOpsDeskDataUnavailableMessage,
} from "@portfolio/api-contracts/http";
import {
  OPSDESK_APPROVALS_ROUTE,
  OPSDESK_AUDIT_ROUTE,
  OPSDESK_INCIDENTS_ROUTE,
  OPSDESK_OVERVIEW_ROUTE,
  OPSDESK_REQUESTS_ROUTE,
  OPSDESK_TEAMS_ROUTE,
} from "@portfolio/api-contracts/opsdesk";

import { createApiLogger } from "@api-portfolio/config/logger";
import { ApiError } from "@api-portfolio/contracts/errors";
import { createErrorHandlerPlugin } from "@api-portfolio/middleware/error-handler";
import { createRequestContextPlugin } from "@api-portfolio/middleware/request-context";
import { createOpsDeskRouter } from "@api-portfolio/modules/opsdesk/opsdesk.routes";
import type { OpsDeskService } from "@api-portfolio/modules/opsdesk/opsdesk.service";

function createOpsDeskServiceMock(
  overrides: Partial<OpsDeskService> = {}
): OpsDeskService {
  return {
    getOverview: vi.fn().mockResolvedValue({
      metrics: [],
      incidents: [],
      teams: [],
    }),
    getRequests: vi.fn().mockResolvedValue([]),
    getApprovals: vi.fn().mockResolvedValue([]),
    getTeams: vi.fn().mockResolvedValue([]),
    getIncidents: vi.fn().mockResolvedValue([]),
    getAuditLog: vi.fn().mockResolvedValue([]),
    ...overrides,
  };
}

function createOpsDeskTestApp(opsDeskService: OpsDeskService) {
  const logger = createApiLogger("test");

  return new Elysia()
    .use(createRequestContextPlugin(logger))
    .use(createErrorHandlerPlugin(logger))
    .use(createOpsDeskRouter(opsDeskService));
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

describe("GET /v1/opsdesk/overview contract", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the standard success envelope with overview data and request metadata", async () => {
    const app = createOpsDeskTestApp(createOpsDeskServiceMock());
    const response = await app.handle(
      new Request(`http://localhost${OPSDESK_OVERVIEW_ROUTE}`, {
        headers: {
          [CORRELATION_ID_HEADER]: "corr-test-opsdesk-overview-success",
        },
      })
    );
    const body = await parseJsonResponse<{
      success: boolean;
      data: {
        metrics: unknown[];
        incidents: unknown[];
        teams: unknown[];
      };
      meta: {
        correlationId: string;
        requestId: string;
        timestamp: string;
        module: string;
        resource: string;
      };
    }>(response);

    expect(response.status).toBe(200);
    expect(response.headers.get(CORRELATION_ID_HEADER)).toBe(
      "corr-test-opsdesk-overview-success"
    );
    expect(body).toMatchObject({
      success: true,
      data: {
        metrics: [],
        incidents: [],
        teams: [],
      },
      meta: {
        correlationId: "corr-test-opsdesk-overview-success",
        module: "opsdesk",
        resource: "overview",
      },
    });
    expect(typeof body.meta.requestId).toBe("string");
    expect(Number.isNaN(Date.parse(body.meta.timestamp))).toBe(false);
  });

  it("returns the standard error envelope when overview data is unavailable", async () => {
    const app = createOpsDeskTestApp(
      createOpsDeskServiceMock({
        getOverview: vi.fn().mockRejectedValue(
          new ApiError({
            statusCode: 503,
            code: API_ERROR_CODES.OPSDESK_DATA_UNAVAILABLE,
            message: getOpsDeskDataUnavailableMessage("overview"),
            details: {
              resource: "overview",
            },
          })
        ),
      })
    );
    const response = await app.handle(
      new Request(`http://localhost${OPSDESK_OVERVIEW_ROUTE}`, {
        headers: {
          [CORRELATION_ID_HEADER]: "corr-test-opsdesk-overview-error",
        },
      })
    );
    const body = await parseJsonResponse<{
      success: boolean;
      error: {
        code: string;
        message: string;
        details: {
          resource: string;
        };
      };
      meta: {
        correlationId: string;
      };
    }>(response);

    expect(response.status).toBe(503);
    expect(body).toMatchObject({
      success: false,
      error: {
        code: API_ERROR_CODES.OPSDESK_DATA_UNAVAILABLE,
        message: getOpsDeskDataUnavailableMessage("overview"),
        details: {
          resource: "overview",
        },
      },
      meta: {
        correlationId: "corr-test-opsdesk-overview-error",
      },
    });
  });
});

describe("OpsDesk collection route contracts", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    {
      route: OPSDESK_REQUESTS_ROUTE,
      resource: "requests",
    },
    {
      route: OPSDESK_APPROVALS_ROUTE,
      resource: "approvals",
    },
    {
      route: OPSDESK_TEAMS_ROUTE,
      resource: "teams",
    },
    {
      route: OPSDESK_INCIDENTS_ROUTE,
      resource: "incidents",
    },
    {
      route: OPSDESK_AUDIT_ROUTE,
      resource: "audit",
    },
  ])(
    "returns the standard success envelope for $resource",
    async ({ route, resource }) => {
      const app = createOpsDeskTestApp(createOpsDeskServiceMock());
      const response = await app.handle(
        new Request(`http://localhost${route}`, {
          headers: {
            [CORRELATION_ID_HEADER]: `corr-test-opsdesk-${resource}-success`,
          },
        })
      );
      const body = await parseJsonResponse<{
        success: boolean;
        data: unknown[];
        meta: {
          correlationId: string;
          module: string;
          resource: string;
          count: number;
        };
      }>(response);

      expect(response.status).toBe(200);
      expect(body).toMatchObject({
        success: true,
        data: [],
        meta: {
          correlationId: `corr-test-opsdesk-${resource}-success`,
          module: "opsdesk",
          resource,
          count: 0,
        },
      });
    }
  );
});
