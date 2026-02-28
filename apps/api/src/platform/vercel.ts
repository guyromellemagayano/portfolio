/**
 * @file apps/api/src/platform/vercel.ts
 * @author Guy Romelle Magayano
 * @description Vercel Node Function adapter for the API gateway Elysia app.
 */

import { Buffer } from "node:buffer";
import type { IncomingMessage, ServerResponse } from "node:http";
import { Readable } from "node:stream";

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

/** Resolves the first string value from a Node header field shape. */
function getFirstHeaderValue(
  value: string | string[] | undefined
): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0];
  }

  return undefined;
}

/** Maps Node request headers to a Fetch API `Headers` instance. */
function toFetchHeaders(request: VercelNodeRequest): Headers {
  const headers = new Headers();

  for (const [headerName, headerValue] of Object.entries(request.headers)) {
    if (typeof headerValue === "undefined") {
      continue;
    }

    if (Array.isArray(headerValue)) {
      for (const value of headerValue) {
        headers.append(headerName, value);
      }
      continue;
    }

    headers.set(headerName, headerValue);
  }

  return headers;
}

/** Resolves the absolute origin for a Vercel Node request. */
function resolveRequestOrigin(request: VercelNodeRequest): string {
  const forwardedProtocol = getFirstHeaderValue(
    request.headers["x-forwarded-proto"]
  );
  const protocol = forwardedProtocol?.split(",")[0]?.trim() || "https";
  const forwardedHost = getFirstHeaderValue(
    request.headers["x-forwarded-host"]
  );
  const host = forwardedHost || getFirstHeaderValue(request.headers.host);

  return `${protocol}://${host || "localhost"}`;
}

/** Reads a Node request body into a single buffer for Fetch API interop. */
async function readRequestBody(
  request: VercelNodeRequest,
  requestMethod: string
): Promise<Buffer | undefined> {
  if (requestMethod === "GET" || requestMethod === "HEAD") {
    return undefined;
  }

  const bodyChunks: Buffer[] = [];

  for await (const chunk of request) {
    bodyChunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return bodyChunks.length > 0 ? Buffer.concat(bodyChunks) : undefined;
}

/** Streams a Fetch API response back through the Node response object. */
async function writeFetchResponse(
  appResponse: Response,
  response: VercelNodeResponse,
  requestMethod: string
): Promise<void> {
  response.statusCode = appResponse.status;

  for (const [headerName, headerValue] of appResponse.headers.entries()) {
    response.setHeader(headerName, headerValue);
  }

  if (!appResponse.body || requestMethod === "HEAD") {
    response.end();
    return;
  }

  const responseStream = Readable.fromWeb(
    appResponse.body as unknown as ReadableStream<Uint8Array>
  );

  await new Promise<void>((resolve, reject) => {
    responseStream.on("error", reject);
    response.on("error", reject);
    response.on("finish", resolve);
    responseStream.pipe(response);
  });
}

/** Handles Vercel Node Function requests by delegating to the Elysia Web handler. */
export default async function vercelApiGatewayHandler(
  request: VercelNodeRequest,
  response: VercelNodeResponse
): Promise<void> {
  const normalizedPath = normalizeVercelApiGatewayRequestUrl(
    request.url ?? API_ROOT_ROUTE
  );
  const requestMethod = (request.method || "GET").toUpperCase();
  const requestUrl = new URL(normalizedPath, resolveRequestOrigin(request));

  const app = getCachedServer();
  const requestBody = await readRequestBody(request, requestMethod);
  const appRequest = new Request(requestUrl, {
    method: requestMethod,
    headers: toFetchHeaders(request),
    body: requestBody,
  });

  const appResponse = await app.handle(appRequest);
  await writeFetchResponse(appResponse, response, requestMethod);
}
