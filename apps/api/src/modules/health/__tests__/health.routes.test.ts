/**
 * @file apps/api/src/modules/health/__tests__/health.routes.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for health route redirect and versioned route registration behavior.
 */

import { describe, expect, it, vi } from "vitest";

import { createHealthRouter } from "@api/modules/health/health.routes";

type RouteHandler = (
  request: {
    logger: {
      debug: ReturnType<typeof vi.fn>;
    };
  },
  response: {
    redirect: ReturnType<typeof vi.fn>;
  }
) => unknown;

function getRouteHandler(routePath: string): RouteHandler {
  const router = createHealthRouter() as {
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
      `Health route handler could not be resolved for ${routePath}.`
    );
  }

  return routeHandler;
}

describe("health routes", () => {
  it("redirects the legacy /status route to /v1/status", () => {
    const handler = getRouteHandler("/status");
    const debug = vi.fn();
    const redirect = vi.fn();

    handler(
      {
        logger: {
          debug,
        },
      },
      {
        redirect,
      }
    );

    expect(debug).toHaveBeenCalledWith(
      "Redirecting legacy health check route to versioned endpoint"
    );
    expect(redirect).toHaveBeenCalledWith(308, "/v1/status");
  });
});
