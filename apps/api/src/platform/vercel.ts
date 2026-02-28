/**
 * @file apps/api/src/platform/vercel.ts
 * @author Guy Romelle Magayano
 * @description Vercel Node Function adapter for the API gateway Elysia app.
 */

import type { IncomingMessage, ServerResponse } from "node:http";

import {
  API_ROOT_ROUTE,
  VERCEL_API_ROUTE_PREFIX,
} from "@portfolio/api-contracts/http";

import { createServer } from "../server.js";

let cachedServer: ReturnType<typeof createServer> | null = null;

/** Lazily creates and memoizes the Elysia app for warm Vercel invocations. */
function getCachedServer(): ReturnType<typeof createServer> {
  if (!cachedServer) {
    cachedServer = createServer();
  }

  return cachedServer;
}

/** Normalizes rewritten Vercel function URLs so Elysia receives root-domain API routes. */
export function normalizeVercelApiGatewayRequestUrl(url: string): string {
  const normalizedUrl = url.trim() || API_ROOT_ROUTE;
  const hasApiPrefix =
    normalizedUrl === VERCEL_API_ROUTE_PREFIX ||
    normalizedUrl.startsWith(`${VERCEL_API_ROUTE_PREFIX}/`) ||
    normalizedUrl.startsWith(`${VERCEL_API_ROUTE_PREFIX}?`);
  const strippedApiPrefix = hasApiPrefix
    ? normalizedUrl.slice(VERCEL_API_ROUTE_PREFIX.length)
    : normalizedUrl;

  if (!strippedApiPrefix) {
    return API_ROOT_ROUTE;
  }

  if (strippedApiPrefix.startsWith("?")) {
    return `${API_ROOT_ROUTE}${strippedApiPrefix}`;
  }

  return strippedApiPrefix;
}

type VercelNodeRequest = IncomingMessage & {
  url?: string;
};
type VercelNodeResponse = ServerResponse;

/** Handles Vercel Node Function requests by delegating to the Elysia API gateway app. */
export default function vercelApiGatewayHandler(
  request: VercelNodeRequest,
  response: VercelNodeResponse
): void {
  request.url = normalizeVercelApiGatewayRequestUrl(
    request.url ?? API_ROOT_ROUTE
  );

  const app = getCachedServer();
  const requestHandler = app.handle as unknown as (
    req: IncomingMessage,
    res: ServerResponse
  ) => void;

  requestHandler(request, response);
}
