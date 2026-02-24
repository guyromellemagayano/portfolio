/**
 * @file apps/api/src/middleware/http-logger.ts
 * @author Guy Romelle Magayano
 * @description HTTP access logging middleware powered by the shared logger.
 */

import type { RequestHandler } from "express";

import type { ILogger } from "@portfolio/logger";

function formatHttpAccessLogMessage(
  requestId: string,
  correlationId: string,
  method: string,
  path: string,
  statusCode: number,
  contentLength: string,
  responseTimeMs: number,
  userAgent?: string
): string {
  const baseMessage = `${requestId} ${correlationId} ${method} ${path} ${statusCode} ${contentLength} - ${responseTimeMs.toFixed(2)} ms`;

  if (!userAgent) {
    return baseMessage;
  }

  return `${baseMessage} "${userAgent}"`;
}

/** Creates an HTTP access log middleware wired to the shared logger. */
export function createHttpLoggerMiddleware(logger: ILogger): RequestHandler {
  const isProduction = process.env.NODE_ENV === "production";

  return function httpLoggerMiddleware(request, response, next) {
    const shouldSkip =
      isProduction &&
      (request.originalUrl === "/status" ||
        request.originalUrl === "/v1/status");

    if (shouldSkip) {
      next();
      return;
    }

    const startedAt = process.hrtime.bigint();

    response.on("finish", () => {
      const requestLogger = request.logger ?? logger;
      const elapsedMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
      const contentLength = response.getHeader("content-length");
      const contentLengthText =
        typeof contentLength === "number"
          ? String(contentLength)
          : typeof contentLength === "string"
            ? contentLength
            : "-";
      const userAgent = request.get("User-Agent");

      requestLogger.http(
        formatHttpAccessLogMessage(
          request.id,
          request.correlationId,
          request.method,
          request.originalUrl,
          response.statusCode,
          contentLengthText,
          elapsedMs,
          isProduction ? undefined : (userAgent ?? "-")
        ),
        {
          statusCode: response.statusCode,
          method: request.method,
          path: request.originalUrl,
          contentLength: contentLengthText,
          responseTimeMs: elapsedMs,
          userAgent: userAgent ?? null,
        }
      );
    });

    next();
  };
}
