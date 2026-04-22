/**
 * @file apps/web/src/portfolio-api/content/articles.ts
 * @author Guy Romelle Magayano
 * @description Portfolio API client for content article retrieval in the web app.
 */

import { cache } from "react";

import {
  CONTENT_ARTICLES_ROUTE,
  CONTENT_REVALIDATE_SECONDS,
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
const PORTFOLIO_API_REQUEST_TIMEOUT_MS = 3000;

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

/** Builds a more actionable timeout message for stalled portfolio API requests. */
function createPortfolioApiTimeoutErrorMessage(endpointUrl: string): string {
  const baseMessage = `Portfolio API content request timed out after ${PORTFOLIO_API_REQUEST_TIMEOUT_MS}ms for ${endpointUrl}.`;

  try {
    const parsed = new URL(endpointUrl);

    if (
      getEnvVar("NODE_ENV") !== "production" &&
      isLocalOnlyHostname(parsed.hostname)
    ) {
      return `${baseMessage} The configured local portfolio API host may be unreachable. Point \`PORTFOLIO_API_URL\` to \`http://localhost:${DEFAULT_PORTFOLIO_API_PORT}\` or start the local domain stack before loading API-backed routes.`;
    }
  } catch {
    return baseMessage;
  }

  return baseMessage;
}

/** Indicates whether a thrown fetch error represents an aborted request. */
function isAbortError(error: unknown): boolean {
  return (
    !!error &&
    typeof error === "object" &&
    "name" in error &&
    error.name === "AbortError"
  );
}

/** Fetches a portfolio API endpoint with a bounded timeout to avoid hanging SSR renders. */
export async function fetchPortfolioApi(
  endpointUrl: string,
  init: Omit<RequestInit, "signal">
): Promise<Response> {
  try {
    return await globalThis.fetch(endpointUrl, {
      ...init,
      signal: AbortSignal.timeout(PORTFOLIO_API_REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    if (isAbortError(error)) {
      const timeoutError = new Error(
        createPortfolioApiTimeoutErrorMessage(endpointUrl)
      ) as Error & { cause?: unknown };

      timeoutError.cause = error;

      throw timeoutError;
    }

    throw error;
  }
}

/** Resolves the portfolio API base URL for server-side fetches in `apps/web`. */
export const resolvePortfolioApiBaseUrl = cache(
  function resolvePortfolioApiBaseUrl(): string | null {
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
);

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
export const getAllPortfolioArticles = cache(
  async function getAllPortfolioArticles(): Promise<ContentArticlesResponseData> {
    const portfolioApiBaseUrl = resolvePortfolioApiBaseUrl();

    if (!portfolioApiBaseUrl) {
      throw new Error(
        "Portfolio API URL is not configured. Set `PORTFOLIO_API_URL` or `NEXT_PUBLIC_API_URL` in production."
      );
    }

    const endpointUrl = `${portfolioApiBaseUrl}${CONTENT_ARTICLES_ROUTE}`;

    const response = await fetchPortfolioApi(endpointUrl, {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: CONTENT_REVALIDATE_SECONDS,
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
      throw new Error(
        "Portfolio API returned an unexpected response envelope."
      );
    }

    return envelope.data;
  }
);

/** Fetches a single article detail payload from the portfolio API by slug. */
export const getPortfolioArticleBySlug = cache(
  async function getPortfolioArticleBySlug(
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

    const response = await fetchPortfolioApi(endpointUrl, {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: CONTENT_REVALIDATE_SECONDS,
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
      throw new Error(
        "Portfolio API returned an unexpected response envelope."
      );
    }

    return envelope.data;
  }
);
