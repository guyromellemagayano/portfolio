/**
 * @file apps/api/src/platform/vercel.ts
 * @author Guy Romelle Magayano
 * @description Vercel Node Function adapter for the API gateway Express app.
 */

import type { IncomingMessage, ServerResponse } from "node:http";
import { type Express } from "express";

import { createServer } from "../server.js";

let cachedServer: Express | null = null;

/** Lazily creates and memoizes the Express app for warm Vercel invocations. */
function getCachedServer(): Express {
  if (!cachedServer) {
    cachedServer = createServer();
  }

  return cachedServer;
}

/** Normalizes rewritten Vercel function URLs so Express receives root-domain API routes. */
export function normalizeVercelApiGatewayRequestUrl(url: string): string {
  const normalizedUrl = url.trim() || "/";
  const strippedApiPrefix = normalizedUrl.replace(/^\/api(?=\/|\?|$)/, "");

  if (!strippedApiPrefix) {
    return "/";
  }

  if (strippedApiPrefix.startsWith("?")) {
    return `/${strippedApiPrefix}`;
  }

  return strippedApiPrefix;
}

type VercelNodeRequest = IncomingMessage & {
  url?: string;
};
type VercelNodeResponse = ServerResponse;

/** Handles Vercel Node Function requests by delegating to the Express API gateway app. */
export default function vercelApiGatewayHandler(
  request: VercelNodeRequest,
  response: VercelNodeResponse
): void {
  request.url = normalizeVercelApiGatewayRequestUrl(request.url ?? "/");

  const app = getCachedServer();
  const requestHandler = app as unknown as (
    req: IncomingMessage,
    res: ServerResponse
  ) => void;

  requestHandler(request, response);
}
