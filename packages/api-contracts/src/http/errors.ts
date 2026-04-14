/**
 * @file packages/api-contracts/src/http/errors.ts
 * @author Guy Romelle Magayano
 * @description Canonical error codes and messages for portfolio API responses.
 */

/** Canonical API error code identifiers returned by the portfolio API. */
export const API_ERROR_CODES = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
  CONTENT_ARTICLE_SLUG_REQUIRED: "CONTENT_ARTICLE_SLUG_REQUIRED",
  CONTENT_ARTICLE_NOT_FOUND: "CONTENT_ARTICLE_NOT_FOUND",
  CONTENT_PAGE_SLUG_REQUIRED: "CONTENT_PAGE_SLUG_REQUIRED",
  CONTENT_PAGE_NOT_FOUND: "CONTENT_PAGE_NOT_FOUND",
  CONTENT_UPSTREAM_TIMEOUT: "CONTENT_UPSTREAM_TIMEOUT",
  CONTENT_UPSTREAM_NETWORK_ERROR: "CONTENT_UPSTREAM_NETWORK_ERROR",
  CONTENT_UPSTREAM_ERROR: "CONTENT_UPSTREAM_ERROR",
  CONTENT_INVALID_RESPONSE: "CONTENT_INVALID_RESPONSE",
  OPSDESK_DATA_UNAVAILABLE: "OPSDESK_DATA_UNAVAILABLE",
  OPSDESK_REQUEST_NOT_FOUND: "OPSDESK_REQUEST_NOT_FOUND",
  OPSDESK_REQUEST_OWNER_REQUIRED: "OPSDESK_REQUEST_OWNER_REQUIRED",
  OPSDESK_ASSIGNMENT_ACTOR_REQUIRED: "OPSDESK_ASSIGNMENT_ACTOR_REQUIRED",
  OPSDESK_IDEMPOTENCY_KEY_REQUIRED: "OPSDESK_IDEMPOTENCY_KEY_REQUIRED",
  OPSDESK_REQUEST_VERSION_CONFLICT: "OPSDESK_REQUEST_VERSION_CONFLICT",
  OPSDESK_ASSIGNMENT_NO_CHANGE: "OPSDESK_ASSIGNMENT_NO_CHANGE",
  OPSDESK_REQUEST_ESCALATION_NO_CHANGE: "OPSDESK_REQUEST_ESCALATION_NO_CHANGE",
  OPSDESK_APPROVAL_NOT_FOUND: "OPSDESK_APPROVAL_NOT_FOUND",
  OPSDESK_APPROVAL_DECISION_REQUIRED: "OPSDESK_APPROVAL_DECISION_REQUIRED",
  OPSDESK_APPROVAL_VERSION_CONFLICT: "OPSDESK_APPROVAL_VERSION_CONFLICT",
  OPSDESK_APPROVAL_DECISION_NO_CHANGE: "OPSDESK_APPROVAL_DECISION_NO_CHANGE",
} as const;

/** Union type of all canonical API error code identifiers. */
export type ApiErrorCode =
  (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];

/** Canonical static API error messages shared across portfolio API modules. */
export const API_ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "An unexpected internal error occurred.",
  CONTENT_ARTICLE_SLUG_REQUIRED: "Article slug is required.",
  CONTENT_ARTICLE_NOT_FOUND: "Article not found.",
  CONTENT_PAGE_SLUG_REQUIRED: "Page slug is required.",
  CONTENT_PAGE_NOT_FOUND: "Page not found.",
  CONTENT_INVALID_RESPONSE:
    "Received an invalid response from the content upstream.",
  OPSDESK_DATA_UNAVAILABLE:
    "OpsDesk operational data is currently unavailable.",
  OPSDESK_REQUEST_NOT_FOUND: "OpsDesk request not found.",
  OPSDESK_REQUEST_OWNER_REQUIRED: "OpsDesk request owner is required.",
  OPSDESK_ASSIGNMENT_ACTOR_REQUIRED:
    "OpsDesk assignment actor header is required.",
  OPSDESK_IDEMPOTENCY_KEY_REQUIRED:
    "OpsDesk idempotency key header is required.",
  OPSDESK_REQUEST_VERSION_CONFLICT:
    "OpsDesk request version does not match the current record.",
  OPSDESK_ASSIGNMENT_NO_CHANGE: "OpsDesk request assignment is unchanged.",
  OPSDESK_REQUEST_ESCALATION_NO_CHANGE:
    "OpsDesk request escalation is unchanged.",
  OPSDESK_APPROVAL_NOT_FOUND: "OpsDesk approval not found.",
  OPSDESK_APPROVAL_DECISION_REQUIRED: "OpsDesk approval decision is required.",
  OPSDESK_APPROVAL_VERSION_CONFLICT:
    "OpsDesk approval version does not match the current record.",
  OPSDESK_APPROVAL_DECISION_NO_CHANGE:
    "OpsDesk approval decision is unchanged.",
} as const;

/** Builds a route-not-found error message for an incoming request. */
export function getRouteNotFoundMessage(
  method: string,
  requestPath: string
): string {
  return `No route matches ${method} ${requestPath}.`;
}

/** Builds a timeout message for failed content upstream requests. */
export function getContentTimeoutMessage(resourceLabel: string): string {
  return `Content request timed out while fetching ${resourceLabel}.`;
}

/** Builds a network failure message for failed content upstream requests. */
export function getContentNetworkFailureMessage(resourceLabel: string): string {
  return `Failed to reach the content upstream while fetching ${resourceLabel}.`;
}

/** Builds an upstream failure message for non-success content responses. */
export function getContentUpstreamFailureMessage(
  resourceLabel: string
): string {
  return `Failed to fetch ${resourceLabel} from the content upstream.`;
}

/** Builds an availability message for failed OpsDesk operational data requests. */
export function getOpsDeskDataUnavailableMessage(
  resourceLabel: string
): string {
  return `OpsDesk operational data is unavailable for ${resourceLabel}.`;
}
