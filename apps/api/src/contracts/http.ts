/**
 * @file apps/api/src/contracts/http.ts
 * @author Guy Romelle Magayano
 * @description Standard API gateway response envelopes.
 */

import type { Request, Response } from "express";

import type {
  ApiErrorEnvelope,
  ApiResponseMeta,
  ApiSuccessEnvelope,
} from "@portfolio/api-contracts/http";

export type { ApiErrorEnvelope, ApiResponseMeta, ApiSuccessEnvelope };

type SuccessResponseOptions = {
  statusCode?: number;
  meta?: Record<string, unknown>;
};

type ErrorResponseOptions = {
  statusCode: number;
  code: string;
  message: string;
  details?: unknown;
  meta?: Record<string, unknown>;
};

function createResponseMeta(
  request: Request,
  extraMeta?: Record<string, unknown>
): ApiResponseMeta {
  return {
    correlationId: request.correlationId,
    requestId: request.id,
    timestamp: new Date().toISOString(),
    ...extraMeta,
  };
}

/** Sends a success response envelope. */
export function sendSuccess<T>(
  request: Request,
  response: Response,
  data: T,
  options: SuccessResponseOptions = {}
): Response<ApiSuccessEnvelope<T>> {
  const { statusCode = 200, meta } = options;

  return response.status(statusCode).json({
    success: true,
    data,
    meta: createResponseMeta(request, meta),
  });
}

/** Sends an error response envelope. */
export function sendError(
  request: Request,
  response: Response,
  options: ErrorResponseOptions
): Response<ApiErrorEnvelope> {
  return response.status(options.statusCode).json({
    success: false,
    error: {
      code: options.code,
      message: options.message,
      details: options.details,
    },
    meta: createResponseMeta(request, options.meta),
  });
}
