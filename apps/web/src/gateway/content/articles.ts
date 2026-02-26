/**
 * @file apps/web/src/gateway/content/articles.ts
 * @author Guy Romelle Magayano
 * @description API gateway client for content article retrieval in the web app.
 */

import {
  CONTENT_ARTICLES_ROUTE,
  type ContentArticleDetailResponseData,
  type ContentArticlesResponseData,
  getContentArticleRoute,
} from "@portfolio/api-contracts/content";
import {
  type ApiErrorEnvelope,
  type ApiSuccessEnvelope,
} from "@portfolio/api-contracts/http";

const DEFAULT_API_GATEWAY_PORT = "5001";
const DEFAULT_GATEWAY_REVALIDATE_SECONDS = 60;

type ContentArticlesEnvelope =
  | ApiSuccessEnvelope<ContentArticlesResponseData>
  | ApiErrorEnvelope;
type ContentArticleDetailEnvelope =
  | ApiSuccessEnvelope<ContentArticleDetailResponseData>
  | ApiErrorEnvelope;

/** Reads and trims an env var value from the current server runtime. */
function getEnvVar(key: string): string {
  return globalThis?.process?.env?.[key]?.trim() ?? "";
}

/** Removes a trailing slash from a configured gateway URL. */
function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

/** Builds a more actionable gateway error message for failed content requests. */
function createGatewayRequestErrorMessage(
  endpointUrl: string,
  status: number
): string {
  const baseMessage = `API gateway content request failed with status ${status} for ${endpointUrl}.`;

  if (
    status === 404 &&
    endpointUrl.startsWith("http://localhost:5001/") &&
    getEnvVar("NODE_ENV") !== "production"
  ) {
    return `${baseMessage} Local API gateway may not be running. Start the API app (port 5001 by default) before loading web pages that fetch content.`;
  }

  return baseMessage;
}

/** Resolves the API gateway base URL for server-side fetches in `apps/web`. */
export function resolveApiGatewayBaseUrl(): string | null {
  const explicitGatewayUrl =
    getEnvVar("API_GATEWAY_URL") || getEnvVar("NEXT_PUBLIC_API_URL");

  if (explicitGatewayUrl) {
    return trimTrailingSlash(explicitGatewayUrl);
  }

  const nodeEnv = getEnvVar("NODE_ENV");

  if (nodeEnv === "production") {
    return null;
  }

  const port =
    getEnvVar("API_PORT") || getEnvVar("PORT") || DEFAULT_API_GATEWAY_PORT;

  return `http://localhost:${port}`;
}

/** Validates the expected success envelope shape for article list responses. */
function isContentArticlesSuccessEnvelope(
  payload: unknown
): payload is ApiSuccessEnvelope<ContentArticlesResponseData> {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const envelope = payload as Partial<ApiSuccessEnvelope<unknown>>;

  return envelope.success === true && Array.isArray(envelope.data);
}

/** Validates the expected success envelope shape for article detail responses. */
function isContentArticleDetailSuccessEnvelope(
  payload: unknown
): payload is ApiSuccessEnvelope<ContentArticleDetailResponseData> {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const envelope = payload as Partial<ApiSuccessEnvelope<unknown>>;

  return (
    envelope.success === true &&
    !!envelope.data &&
    typeof envelope.data === "object" &&
    !Array.isArray(envelope.data)
  );
}

/** Fetches article summaries from the API gateway and validates the response envelope. */
export async function getAllGatewayArticles(): Promise<ContentArticlesResponseData> {
  const gatewayBaseUrl = resolveApiGatewayBaseUrl();

  if (!gatewayBaseUrl) {
    throw new Error(
      "API gateway URL is not configured. Set API_GATEWAY_URL or NEXT_PUBLIC_API_URL in production."
    );
  }

  const endpointUrl = `${gatewayBaseUrl}${CONTENT_ARTICLES_ROUTE}`;

  const response = await fetch(endpointUrl, {
    method: "GET",
    next: {
      revalidate: DEFAULT_GATEWAY_REVALIDATE_SECONDS,
      tags: ["articles"],
    },
  });

  if (!response.ok) {
    throw new Error(
      createGatewayRequestErrorMessage(endpointUrl, response.status)
    );
  }

  let envelope: ContentArticlesEnvelope;

  try {
    envelope = (await response.json()) as ContentArticlesEnvelope;
  } catch {
    throw new Error("API gateway returned an invalid JSON response.");
  }

  if (!isContentArticlesSuccessEnvelope(envelope)) {
    throw new Error("API gateway returned an unexpected response envelope.");
  }

  return envelope.data;
}

/** Fetches a single article detail payload from the API gateway by slug. */
export async function getGatewayArticleBySlug(
  slug: string
): Promise<ContentArticleDetailResponseData | null> {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  const gatewayBaseUrl = resolveApiGatewayBaseUrl();

  if (!gatewayBaseUrl) {
    throw new Error(
      "API gateway URL is not configured. Set API_GATEWAY_URL or NEXT_PUBLIC_API_URL in production."
    );
  }

  const endpointUrl = `${gatewayBaseUrl}${getContentArticleRoute(normalizedSlug)}`;

  const response = await fetch(endpointUrl, {
    method: "GET",
    next: {
      revalidate: DEFAULT_GATEWAY_REVALIDATE_SECONDS,
      tags: ["articles", `article:${normalizedSlug}`],
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      createGatewayRequestErrorMessage(endpointUrl, response.status)
    );
  }

  let envelope: ContentArticleDetailEnvelope;

  try {
    envelope = (await response.json()) as ContentArticleDetailEnvelope;
  } catch {
    throw new Error("API gateway returned an invalid JSON response.");
  }

  if (!isContentArticleDetailSuccessEnvelope(envelope)) {
    throw new Error("API gateway returned an unexpected response envelope.");
  }

  return envelope.data;
}
