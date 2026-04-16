/**
 * @file apps/web/src/portfolio-api/content/articles.ts
 * @author Guy Romelle Magayano
 * @description Portfolio API client for content article retrieval in the web app.
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

import { isLocalOnlyHostname } from "@web/utils/site-url";

const DEFAULT_PORTFOLIO_API_PORT = "5001";
const DEFAULT_PORTFOLIO_API_REVALIDATE_SECONDS = 60;

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

/** Removes a trailing slash from a configured portfolio API URL. */
function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

/** Indicates whether a configured portfolio API URL is local-only and unsafe for production runtimes. */
function isLocalOnlyPortfolioApiUrlInProduction(value: string): boolean {
  if (getEnvVar("NODE_ENV") !== "production") {
    return false;
  }

  try {
    const parsed = new URL(value);

    return isLocalOnlyHostname(parsed.hostname);
  } catch {
    return false;
  }
}

/** Builds a more actionable portfolio API error message for failed content requests. */
function createPortfolioApiRequestErrorMessage(
  endpointUrl: string,
  status: number
): string {
  const baseMessage = `Portfolio API content request failed with status ${status} for ${endpointUrl}.`;

  if (
    status === 404 &&
    endpointUrl.startsWith("http://localhost:5001/") &&
    getEnvVar("NODE_ENV") !== "production"
  ) {
    return `${baseMessage} Local portfolio API may not be running. Start the portfolio API app (port 5001 by default) before loading web pages that fetch content.`;
  }

  return baseMessage;
}

/** Resolves the portfolio API base URL for server-side fetches in `apps/web`. */
export function resolvePortfolioApiBaseUrl(): string | null {
  const explicitPortfolioApiUrl =
    getEnvVar("PORTFOLIO_API_URL") ||
    getEnvVar("API_GATEWAY_URL") ||
    getEnvVar("NEXT_PUBLIC_API_URL");

  if (explicitPortfolioApiUrl) {
    if (isLocalOnlyPortfolioApiUrlInProduction(explicitPortfolioApiUrl)) {
      return null;
    }

    return trimTrailingSlash(explicitPortfolioApiUrl);
  }

  const nodeEnv = getEnvVar("NODE_ENV");

  if (nodeEnv === "production") {
    return null;
  }

  const port =
    getEnvVar("API_PORT") || getEnvVar("PORT") || DEFAULT_PORTFOLIO_API_PORT;

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

/** Fetches article summaries from the portfolio API and validates the response envelope. */
export async function getAllPortfolioArticles(): Promise<ContentArticlesResponseData> {
  const portfolioApiBaseUrl = resolvePortfolioApiBaseUrl();

  if (!portfolioApiBaseUrl) {
    throw new Error(
      "Portfolio API URL is not configured. Set `PORTFOLIO_API_URL` or `NEXT_PUBLIC_API_URL` in production."
    );
  }

  const endpointUrl = `${portfolioApiBaseUrl}${CONTENT_ARTICLES_ROUTE}`;

  const response = await fetch(endpointUrl, {
    method: "GET",
    cache: "force-cache",
    next: {
      revalidate: DEFAULT_PORTFOLIO_API_REVALIDATE_SECONDS,
      tags: ["articles"],
    },
  });

  if (!response.ok) {
    throw new Error(
      createPortfolioApiRequestErrorMessage(endpointUrl, response.status)
    );
  }

  let envelope: ContentArticlesEnvelope;

  try {
    envelope = (await response.json()) as ContentArticlesEnvelope;
  } catch {
    throw new Error("Portfolio API returned an invalid JSON response.");
  }

  if (!isContentArticlesSuccessEnvelope(envelope)) {
    throw new Error("Portfolio API returned an unexpected response envelope.");
  }

  return envelope.data;
}

/** Fetches a single article detail payload from the portfolio API by slug. */
export async function getPortfolioArticleBySlug(
  slug: string
): Promise<ContentArticleDetailResponseData | null> {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  const portfolioApiBaseUrl = resolvePortfolioApiBaseUrl();

  if (!portfolioApiBaseUrl) {
    throw new Error(
      "Portfolio API URL is not configured. Set `PORTFOLIO_API_URL` or `NEXT_PUBLIC_API_URL` in production."
    );
  }

  const endpointUrl = `${portfolioApiBaseUrl}${getContentArticleRoute(normalizedSlug)}`;

  const response = await fetch(endpointUrl, {
    method: "GET",
    cache: "force-cache",
    next: {
      revalidate: DEFAULT_PORTFOLIO_API_REVALIDATE_SECONDS,
      tags: ["articles", `article:${normalizedSlug}`],
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      createPortfolioApiRequestErrorMessage(endpointUrl, response.status)
    );
  }

  let envelope: ContentArticleDetailEnvelope;

  try {
    envelope = (await response.json()) as ContentArticleDetailEnvelope;
  } catch {
    throw new Error("Portfolio API returned an invalid JSON response.");
  }

  if (!isContentArticleDetailSuccessEnvelope(envelope)) {
    throw new Error("Portfolio API returned an unexpected response envelope.");
  }

  return envelope.data;
}
