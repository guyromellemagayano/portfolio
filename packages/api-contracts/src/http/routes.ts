/**
 * @file packages/api-contracts/src/http/routes.ts
 * @author Guy Romelle Magayano
 * @description Canonical route constants for API gateway HTTP endpoints.
 */

/** Root route for API gateway runtime health redirection. */
export const API_ROOT_ROUTE = "/";

/** Version prefix for stable API gateway routes. */
export const API_VERSION_PREFIX = "/v1";

/** Legacy health endpoint path preserved for backwards compatibility. */
export const HEALTH_ROUTE_LEGACY = "/status";

/** Canonical versioned health endpoint path. */
export const HEALTH_ROUTE_STATUS = `${API_VERSION_PREFIX}/status`;

/** Legacy message endpoint path pattern preserved for backwards compatibility. */
export const MESSAGE_ROUTE_LEGACY_PATTERN = "/message/:name";

/** Canonical versioned message endpoint path pattern. */
export const MESSAGE_ROUTE_PATTERN = `${API_VERSION_PREFIX}/message/:name`;

/** Canonical OpenAPI UI/documentation endpoint path. */
export const OPENAPI_ROUTE = "/openapi";

/** Canonical OpenAPI JSON schema endpoint path. */
export const OPENAPI_JSON_ROUTE = `${OPENAPI_ROUTE}/json`;

/** Vercel rewrite prefix for API functions. */
export const VERCEL_API_ROUTE_PREFIX = "/api";

/** Builds the canonical versioned message route for a person name. */
export function getMessageRoute(name: string): string {
  return `${API_VERSION_PREFIX}/message/${encodeURIComponent(name)}`;
}
