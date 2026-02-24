/**
 * @file apps/api/src/contracts/errors.ts
 * @author Guy Romelle Magayano
 * @description Normalized API gateway error types and helpers.
 */

export type GatewayErrorOptions = {
  statusCode: number;
  code: string;
  message: string;
  details?: unknown;
};

export class GatewayError extends Error {
  statusCode: number;
  code: string;
  details?: unknown;

  constructor(options: GatewayErrorOptions) {
    super(options.message);
    this.name = "GatewayError";
    this.statusCode = options.statusCode;
    this.code = options.code;
    this.details = options.details;
  }
}

/** Converts unknown errors into a normalized `GatewayError`. */
export function toGatewayError(error: unknown): GatewayError {
  if (error instanceof GatewayError) {
    return error;
  }

  if (error instanceof Error) {
    return new GatewayError({
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected internal error occurred.",
      details: {
        name: error.name,
      },
    });
  }

  return new GatewayError({
    statusCode: 500,
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected internal error occurred.",
  });
}
