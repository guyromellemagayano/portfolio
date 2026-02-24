/**
 * @file packages/api-contracts/src/http/envelope.ts
 * @author Guy Romelle Magayano
 * @description Canonical response envelope contracts for API communication.
 */

export type ApiResponseMeta = {
  correlationId: string;
  requestId: string;
  timestamp: string;
} & Record<string, unknown>;

export type ApiSuccessEnvelope<T> = {
  success: true;
  data: T;
  meta: ApiResponseMeta;
};

export type ApiErrorEnvelope = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta: ApiResponseMeta;
};

/** Canonical union type for API response envelopes. */
export type ApiEnvelope<T> = ApiSuccessEnvelope<T> | ApiErrorEnvelope;
