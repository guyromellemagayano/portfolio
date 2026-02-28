/**
 * @file packages/api-contracts/src/http/errors.ts
 * @author Guy Romelle Magayano
 * @description Canonical error codes and messages for API gateway responses.
 */

/** Canonical API error code identifiers returned by the gateway. */
export const API_ERROR_CODES = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
  CONTENT_ARTICLE_SLUG_REQUIRED: "CONTENT_ARTICLE_SLUG_REQUIRED",
  CONTENT_ARTICLE_NOT_FOUND: "CONTENT_ARTICLE_NOT_FOUND",
  CONTENT_PAGE_SLUG_REQUIRED: "CONTENT_PAGE_SLUG_REQUIRED",
  CONTENT_PAGE_NOT_FOUND: "CONTENT_PAGE_NOT_FOUND",
  SANITY_UPSTREAM_TIMEOUT: "SANITY_UPSTREAM_TIMEOUT",
  SANITY_UPSTREAM_NETWORK_ERROR: "SANITY_UPSTREAM_NETWORK_ERROR",
  SANITY_UPSTREAM_ERROR: "SANITY_UPSTREAM_ERROR",
  SANITY_INVALID_RESPONSE: "SANITY_INVALID_RESPONSE",
} as const;

/** Union type of all canonical API error code identifiers. */
export type ApiErrorCode =
  (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];

/** Canonical static API error messages shared across gateway modules. */
export const API_ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "An unexpected internal error occurred.",
  CONTENT_ARTICLE_SLUG_REQUIRED: "Article slug is required.",
  CONTENT_ARTICLE_NOT_FOUND: "Article not found.",
  CONTENT_PAGE_SLUG_REQUIRED: "Page slug is required.",
  CONTENT_PAGE_NOT_FOUND: "Page not found.",
  SANITY_INVALID_RESPONSE: "Received an invalid response from Sanity.",
} as const;

/** Builds a route-not-found error message for an incoming request. */
export function getRouteNotFoundMessage(
  method: string,
  requestPath: string
): string {
  return `No route matches ${method} ${requestPath}.`;
}

/** Builds a timeout message for failed Sanity upstream requests. */
export function getSanityTimeoutMessage(resourceLabel: string): string {
  return `Sanity request timed out while fetching ${resourceLabel}.`;
}

/** Builds a network failure message for failed Sanity upstream requests. */
export function getSanityNetworkFailureMessage(resourceLabel: string): string {
  return `Failed to reach Sanity while fetching ${resourceLabel}.`;
}

/** Builds an upstream failure message for non-success Sanity responses. */
export function getSanityUpstreamFailureMessage(resourceLabel: string): string {
  return `Failed to fetch ${resourceLabel} from Sanity.`;
}
