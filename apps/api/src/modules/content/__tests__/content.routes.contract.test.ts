/**
 * @file apps/api/src/modules/content/__tests__/content.routes.contract.test.ts
 * @author Guy Romelle Magayano
 * @description Contract tests for the content articles route envelopes and metadata.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createApiLogger } from "@api/config/logger";
import { GatewayError } from "@api/contracts/errors";
import { createErrorHandler } from "@api/middleware/error-handler";
import { createRequestContextMiddleware } from "@api/middleware/request-context";
import { createContentRouter } from "@api/modules/content/content.routes";
import type { ContentService } from "@api/modules/content/content.service";

type MockRequest = {
  method: string;
  path: string;
  originalUrl: string;
  headers: Record<string, string | undefined>;
  params: Record<string, string | undefined>;
  id?: string;
  correlationId?: string;
  logger?: unknown;
};

type MockResponse = {
  statusCode: number;
  body?: unknown;
  headers: Record<string, string>;
  setHeader: (name: string, value: string) => void;
  status: (statusCode: number) => MockResponse;
  json: (payload: unknown) => MockResponse;
};

type RouteHandler = (
  request: MockRequest,
  response: MockResponse,
  next: (error?: unknown) => void
) => Promise<unknown> | unknown;

function createMockRequest(options: {
  path: string;
  method?: string;
  correlationId?: string;
  params?: Record<string, string | undefined>;
}): MockRequest {
  return {
    method: options.method ?? "GET",
    path: options.path,
    originalUrl: options.path,
    headers: {
      "x-correlation-id": options.correlationId,
    },
    params: options.params ?? {},
  };
}

function createMockResponse(): MockResponse {
  return {
    statusCode: 200,
    headers: {},
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

function getContentRouteHandler(
  contentService: ContentService,
  routePath: string
): RouteHandler {
  const router = createContentRouter(contentService) as {
    stack: Array<{
      route?: {
        path?: string;
        stack?: Array<{
          handle: RouteHandler;
        }>;
      };
    }>;
  };

  const routeLayer = router.stack.find(
    (layer) => layer.route?.path === routePath
  );
  const routeHandler = routeLayer?.route?.stack?.[0]?.handle;

  if (!routeHandler) {
    throw new Error(
      `Content route handler could not be resolved for ${routePath}.`
    );
  }

  return routeHandler;
}

async function runRequestContext(
  request: MockRequest,
  response: MockResponse
): Promise<void> {
  const logger = createApiLogger("test");
  const middleware = createRequestContextMiddleware(logger);

  await new Promise<void>((resolve, reject) => {
    middleware(request as never, response as never, (error?: unknown) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

async function invokeRoute(
  handler: RouteHandler,
  request: MockRequest,
  response: MockResponse
): Promise<unknown> {
  let nextError: unknown;

  await handler(request, response, (error?: unknown) => {
    if (error) {
      nextError = error;
    }
  });

  if (nextError) {
    throw nextError;
  }

  return response.body;
}

function runErrorHandler(
  error: unknown,
  request: MockRequest,
  response: MockResponse
): void {
  const logger = createApiLogger("test");
  const errorHandler = createErrorHandler(logger);

  errorHandler(error, request as never, response as never, vi.fn());
}

describe("GET /v1/content/articles contract", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the standard success envelope with request metadata and correlation ID", async () => {
    const request = createMockRequest({
      path: "/v1/content/articles",
      correlationId: "corr-test-articles-success",
    });
    const response = createMockResponse();
    const handler = getContentRouteHandler(
      {
        providerName: "static",
        getArticles: vi.fn().mockResolvedValue([]),
        getArticleBySlug: vi.fn().mockResolvedValue(null),
      },
      "/articles"
    );

    await runRequestContext(request, response);
    await invokeRoute(handler, request, response);

    expect(response.statusCode).toBe(200);
    expect(response.headers["x-correlation-id"]).toBe(
      "corr-test-articles-success"
    );
    expect(response.body).toMatchObject({
      success: true,
      data: [],
      meta: {
        correlationId: "corr-test-articles-success",
        provider: "static",
        count: 0,
        module: "content",
      },
    });

    const body = response.body as {
      meta: {
        requestId?: string;
        timestamp?: string;
      };
    };

    expect(typeof body.meta.requestId).toBe("string");
    expect(body.meta.requestId?.length).toBeGreaterThan(0);
    expect(Number.isNaN(Date.parse(body.meta.timestamp ?? ""))).toBe(false);
  });

  it("returns the standard error envelope when the route propagates a provider error", async () => {
    const request = createMockRequest({
      path: "/v1/content/articles",
      correlationId: "corr-test-articles-error",
    });
    const response = createMockResponse();
    const handler = getContentRouteHandler(
      {
        providerName: "sanity",
        getArticles: vi.fn().mockRejectedValue(
          new GatewayError({
            statusCode: 502,
            code: "SANITY_UPSTREAM_ERROR",
            message: "Failed to fetch articles from Sanity.",
            details: {
              status: 503,
            },
          })
        ),
        getArticleBySlug: vi.fn().mockResolvedValue(null),
      },
      "/articles"
    );

    await runRequestContext(request, response);

    let routeError: unknown;

    try {
      await invokeRoute(handler, request, response);
    } catch (error) {
      routeError = error;
    }

    runErrorHandler(routeError, request, response);

    expect(response.statusCode).toBe(502);
    expect(response.headers["x-correlation-id"]).toBe(
      "corr-test-articles-error"
    );
    expect(response.body).toMatchObject({
      success: false,
      error: {
        code: "SANITY_UPSTREAM_ERROR",
        message: "Failed to fetch articles from Sanity.",
        details: {
          status: 503,
        },
      },
      meta: {
        correlationId: "corr-test-articles-error",
      },
    });

    const body = response.body as {
      meta: {
        requestId?: string;
        timestamp?: string;
      };
    };

    expect(typeof body.meta.requestId).toBe("string");
    expect(Number.isNaN(Date.parse(body.meta.timestamp ?? ""))).toBe(false);
  });
});

describe("GET /v1/content/articles/:slug contract", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the standard success envelope for article detail", async () => {
    const request = createMockRequest({
      path: "/v1/content/articles/example-article",
      correlationId: "corr-test-article-detail-success",
      params: {
        slug: "example-article",
      },
    });
    const response = createMockResponse();
    const handler = getContentRouteHandler(
      {
        providerName: "sanity",
        getArticles: vi.fn().mockResolvedValue([]),
        getArticleBySlug: vi.fn().mockResolvedValue({
          id: "article-1",
          title: "Example Article",
          slug: "example-article",
          publishedAt: "2026-02-24T00:00:00.000Z",
          excerpt: "Summary",
          seoDescription: "SEO Summary",
          imageUrl: "https://cdn.example.com/article.jpg",
          imageAlt: "Example article cover",
          tags: ["engineering"],
          body: [
            {
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "Hello world",
                },
              ],
            },
          ],
        }),
      },
      "/articles/:slug"
    );

    await runRequestContext(request, response);
    await invokeRoute(handler, request, response);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
      data: {
        slug: "example-article",
        body: expect.any(Array),
      },
      meta: {
        correlationId: "corr-test-article-detail-success",
        provider: "sanity",
        slug: "example-article",
        module: "content",
        resource: "article",
      },
    });
  });

  it("returns the standard error envelope for a missing article slug", async () => {
    const request = createMockRequest({
      path: "/v1/content/articles/missing-article",
      correlationId: "corr-test-article-detail-missing",
      params: {
        slug: "missing-article",
      },
    });
    const response = createMockResponse();
    const handler = getContentRouteHandler(
      {
        providerName: "sanity",
        getArticles: vi.fn().mockResolvedValue([]),
        getArticleBySlug: vi.fn().mockResolvedValue(null),
      },
      "/articles/:slug"
    );

    await runRequestContext(request, response);

    let routeError: unknown;

    try {
      await invokeRoute(handler, request, response);
    } catch (error) {
      routeError = error;
    }

    runErrorHandler(routeError, request, response);

    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({
      success: false,
      error: {
        code: "CONTENT_ARTICLE_NOT_FOUND",
        message: "Article not found.",
        details: {
          slug: "missing-article",
        },
      },
      meta: {
        correlationId: "corr-test-article-detail-missing",
      },
    });
  });
});
