/**
 * @file apps/api/src/modules/portfolio/__tests__/portfolio.routes.contract.test.ts
 * @author Guy Romelle Magayano
 * @description Contract tests for portfolio snapshot routes using Elysia runtime request handling.
 */

import { Elysia } from "elysia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PORTFOLIO_ROUTE } from "@portfolio/api-contracts/content";
import {
  API_ERROR_CODES,
  API_ERROR_MESSAGES,
  CORRELATION_ID_HEADER,
} from "@portfolio/api-contracts/http";
import { contentSnapshot } from "@portfolio/content-data";

import { createApiLogger } from "@api/config/logger";
import { createErrorHandlerPlugin } from "@api/middleware/error-handler";
import { createRequestContextPlugin } from "@api/middleware/request-context";
import type { ContentService } from "@api/modules/content/content.service";
import { createPortfolioRouter } from "@api/modules/portfolio/portfolio.routes";

function createContentServiceMock(
  overrides: Partial<ContentService> = {}
): ContentService {
  return {
    providerName: "static",
    getArticles: vi.fn().mockResolvedValue([]),
    getArticleBySlug: vi.fn().mockResolvedValue(null),
    getPages: vi.fn().mockResolvedValue([]),
    getPageBySlug: vi.fn().mockResolvedValue(null),
    getPortfolioSnapshot: vi
      .fn()
      .mockResolvedValue(structuredClone(contentSnapshot.portfolio)),
    ...overrides,
  };
}

function createPortfolioTestApp(contentService: ContentService) {
  const logger = createApiLogger("test");

  return new Elysia()
    .use(createRequestContextPlugin(logger))
    .use(createErrorHandlerPlugin(logger))
    .use(createPortfolioRouter(contentService));
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

describe("GET /v1/portfolio contract", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the standard success envelope with cache headers and request metadata", async () => {
    const app = createPortfolioTestApp(createContentServiceMock());
    const response = await app.handle(
      new Request(`http://localhost${PORTFOLIO_ROUTE}`, {
        headers: {
          [CORRELATION_ID_HEADER]: "corr-test-portfolio-success",
        },
      })
    );
    const correlationIdHeader = response.headers.get(CORRELATION_ID_HEADER);
    const cacheControlHeader = response.headers.get("cache-control");
    const body = await parseJsonResponse<{
      success: boolean;
      data: {
        schemaVersion: string;
        pages: unknown[];
      };
      meta: {
        correlationId: string;
        provider: string;
        module: string;
        resource: string;
        pageCount: number;
        requestId: string;
        timestamp: string;
      };
    }>(response);

    expect(response.status).toBe(200);
    expect(correlationIdHeader).toBe("corr-test-portfolio-success");
    expect(cacheControlHeader).toBe(
      "public, s-maxage=300, stale-while-revalidate=3600"
    );
    expect(body).toMatchObject({
      success: true,
      data: {
        schemaVersion: "1.0",
        pages: expect.any(Array),
      },
      meta: {
        correlationId: "corr-test-portfolio-success",
        provider: "static",
        module: "portfolio",
        resource: "snapshot",
        pageCount: contentSnapshot.portfolio.pages.length,
      },
    });
    expect(typeof body.meta.requestId).toBe("string");
    expect(Number.isNaN(Date.parse(body.meta.timestamp))).toBe(false);
  });

  it("returns the standard error envelope when no portfolio snapshot is available", async () => {
    const app = createPortfolioTestApp(
      createContentServiceMock({
        getPortfolioSnapshot: vi.fn().mockResolvedValue(null),
      })
    );
    const response = await app.handle(
      new Request(`http://localhost${PORTFOLIO_ROUTE}`, {
        headers: {
          [CORRELATION_ID_HEADER]: "corr-test-portfolio-missing",
        },
      })
    );
    const body = await parseJsonResponse<{
      success: boolean;
      error: {
        code: string;
        message: string;
      };
      meta: {
        correlationId: string;
        requestId: string;
        timestamp: string;
      };
    }>(response);

    expect(response.status).toBe(404);
    expect(response.headers.get(CORRELATION_ID_HEADER)).toBe(
      "corr-test-portfolio-missing"
    );
    expect(body).toMatchObject({
      success: false,
      error: {
        code: API_ERROR_CODES.PORTFOLIO_NOT_FOUND,
        message: API_ERROR_MESSAGES.PORTFOLIO_NOT_FOUND,
      },
      meta: {
        correlationId: "corr-test-portfolio-missing",
      },
    });
    expect(typeof body.meta.requestId).toBe("string");
    expect(Number.isNaN(Date.parse(body.meta.timestamp))).toBe(false);
  });
});
