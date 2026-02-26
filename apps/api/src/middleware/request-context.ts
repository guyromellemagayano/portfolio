/**
 * @file apps/api/src/middleware/request-context.ts
 * @author Guy Romelle Magayano
 * @description Middleware attaching request ID, correlation ID, and request-scoped logger.
 */

import type { RequestHandler } from "express";

import { generateRequestId, type ILogger } from "@portfolio/logger";

/** Normalizes the incoming correlation header into a single usable correlation ID. */
function resolveCorrelationId(
  correlationHeader: string | string[] | undefined
): string | null {
  if (!correlationHeader) {
    return null;
  }

  if (Array.isArray(correlationHeader)) {
    const [firstCorrelationId] = correlationHeader;
    return firstCorrelationId?.trim() || null;
  }

  const correlationId = correlationHeader.trim();
  return correlationId.length > 0 ? correlationId : null;
}

/** Creates middleware that enriches every request with correlation context. */
export function createRequestContextMiddleware(
  baseLogger: ILogger
): RequestHandler {
  return function requestContextMiddleware(request, response, next) {
    const requestId = generateRequestId();
    const incomingCorrelationId = resolveCorrelationId(
      request.headers["x-correlation-id"]
    );
    const correlationId = incomingCorrelationId ?? requestId;

    request.id = requestId;
    request.correlationId = correlationId;
    response.setHeader("x-correlation-id", correlationId);

    request.logger = baseLogger.child({
      requestId,
      metadata: {
        correlationId,
        method: request.method,
        path: request.originalUrl,
      },
    });

    next();
  };
}
