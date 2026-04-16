/**
 * @file apps/api/src/contracts/errors.ts
 * @author Guy Romelle Magayano
 * @description Normalized portfolio API error types and helpers.
 */

import {
  API_ERROR_CODES,
  API_ERROR_MESSAGES,
  type ApiErrorCode,
} from "@portfolio/api-contracts/http";

export type ApiErrorOptions = {
  statusCode: number;
  code: ApiErrorCode;
  message: string;
  details?: unknown;
};

export class ApiError extends Error {
  statusCode: number;
  code: ApiErrorCode;
  details?: unknown;

  constructor(options: ApiErrorOptions) {
    super(options.message);
    this.name = "ApiError";
    this.statusCode = options.statusCode;
    this.code = options.code;
    this.details = options.details;
  }
}

/** Converts unknown errors into a normalized `ApiError`. */
export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    return new ApiError({
      statusCode: 500,
      code: API_ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      details: {
        name: error.name,
        message: error.message,
      },
    });
  }

  return new ApiError({
    statusCode: 500,
    code: API_ERROR_CODES.INTERNAL_SERVER_ERROR,
    message: API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  });
}
