/**
 * @file apps/api/src/middleware/error-handler.ts
 * @author Guy Romelle Magayano
 * @description Centralized error middleware for normalized API gateway responses.
 */

import type { ErrorRequestHandler } from "express";

import type { ILogger } from "@portfolio/logger";

import { toGatewayError } from "@api/contracts/errors";
import { sendError } from "@api/contracts/http";

/** Creates an error middleware that normalizes and logs all request failures. */
export function createErrorHandler(baseLogger: ILogger): ErrorRequestHandler {
  return function errorHandler(error, request, response, _next) {
    const gatewayError = toGatewayError(error);
    const requestLogger = request.logger ?? baseLogger;

    requestLogger.error("Unhandled API gateway error", gatewayError, {
      component: "error-handler",
      metadata: {
        code: gatewayError.code,
        statusCode: gatewayError.statusCode,
        path: request.path,
        method: request.method,
      },
    });

    sendError(request, response, {
      statusCode: gatewayError.statusCode,
      code: gatewayError.code,
      message: gatewayError.message,
      details: gatewayError.details,
    });
  };
}
