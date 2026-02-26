/**
 * @file apps/api/src/modules/message/__tests__/message.routes.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for message route redirect behavior.
 */

import { describe, expect, it, vi } from "vitest";

import { createMessageRouter } from "@api/modules/message/message.routes";

type RouteHandler = (
  request: {
    params: {
      name?: string;
    };
    get: ReturnType<typeof vi.fn>;
    logger: {
      info: ReturnType<typeof vi.fn>;
    };
  },
  response: {
    redirect: ReturnType<typeof vi.fn>;
  }
) => unknown;

function getRouteHandler(routePath: string): RouteHandler {
  const router = createMessageRouter() as {
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
      `Message route handler could not be resolved for ${routePath}.`
    );
  }

  return routeHandler;
}

describe("message routes", () => {
  it("redirects the legacy /message/:name route to the versioned route", () => {
    const handler = getRouteHandler("/message/:name");
    const info = vi.fn();
    const getHeader = vi.fn().mockReturnValue("vitest");
    const redirect = vi.fn();

    handler(
      {
        params: {
          name: "Guy Romelle",
        },
        get: getHeader,
        logger: {
          info,
        },
      },
      {
        redirect,
      }
    );

    expect(info).toHaveBeenCalledWith(
      "Redirecting legacy message request to versioned route",
      {
        name: "Guy Romelle",
        userAgent: "vitest",
      }
    );
    expect(getHeader).toHaveBeenCalledWith("User-Agent");
    expect(redirect).toHaveBeenCalledWith(
      308,
      `/v1/message/${encodeURIComponent("Guy Romelle")}`
    );
  });
});
