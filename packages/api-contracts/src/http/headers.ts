/**
 * @file packages/api-contracts/src/http/headers.ts
 * @author Guy Romelle Magayano
 * @description Canonical HTTP header keys used by portfolio API contracts.
 */

/** Header carrying end-to-end correlation identifiers across portfolio API requests. */
export const CORRELATION_ID_HEADER = "x-correlation-id";

/** Header carrying idempotency keys for mutation retries. */
export const IDEMPOTENCY_KEY_HEADER = "idempotency-key";

/** Header carrying the local OpsDesk actor identity for mutation requests. */
export const OPSDESK_ACTOR_HEADER = "x-opsdesk-actor";
