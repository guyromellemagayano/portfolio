/**
 * @file apps/web/src/portfolio-api/content/pages.ts
 * @author Guy Romelle Magayano
 * @description Portfolio API client for standalone content page retrieval in the web app.
 */

import { cache } from "react";

import {
  CONTENT_PAGES_ROUTE,
  CONTENT_REVALIDATE_SECONDS,
  type ContentPageDetailResponseData,
  type ContentPagesResponseData,
  getContentPageRoute,
} from "@portfolio/api-contracts/content";
import {
  type ApiErrorEnvelope,
  type ApiSuccessEnvelope,
} from "@portfolio/api-contracts/http";

import { fetchPortfolioApi, resolvePortfolioApiBaseUrl } from "./articles";

type ContentPagesEnvelope =
  | ApiSuccessEnvelope<ContentPagesResponseData>
  | ApiErrorEnvelope;
type ContentPageDetailEnvelope =
  | ApiSuccessEnvelope<ContentPageDetailResponseData>
  | ApiErrorEnvelope;

/** Validates the expected success envelope shape for page list responses. */
function isContentPagesSuccessEnvelope(
  payload: unknown
): payload is ApiSuccessEnvelope<ContentPagesResponseData> {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const envelope = payload as Partial<ApiSuccessEnvelope<unknown>>;

  return envelope.success === true && Array.isArray(envelope.data);
}

/** Validates the expected success envelope shape for page detail responses. */
function isContentPageDetailSuccessEnvelope(
  payload: unknown
): payload is ApiSuccessEnvelope<ContentPageDetailResponseData> {
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

/** Fetches standalone page summaries from the portfolio API and validates the response envelope. */
export const getAllPortfolioPages = cache(
  async function getAllPortfolioPages(): Promise<ContentPagesResponseData> {
    const portfolioApiBaseUrl = resolvePortfolioApiBaseUrl();

    if (!portfolioApiBaseUrl) {
      throw new Error(
        "Portfolio API URL is not configured. Set `PORTFOLIO_API_URL` or `NEXT_PUBLIC_API_URL` in production."
      );
    }

    const endpointUrl = `${portfolioApiBaseUrl}${CONTENT_PAGES_ROUTE}`;

    const response = await fetchPortfolioApi(endpointUrl, {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: CONTENT_REVALIDATE_SECONDS,
        tags: ["pages"],
      },
    });

    if (!response.ok) {
      throw new Error(
        `Portfolio API content request failed with status ${response.status}.`
      );
    }

    let envelope: ContentPagesEnvelope;

    try {
      envelope = (await response.json()) as ContentPagesEnvelope;
    } catch {
      throw new Error("Portfolio API returned an invalid JSON response.");
    }

    if (!isContentPagesSuccessEnvelope(envelope)) {
      throw new Error(
        "Portfolio API returned an unexpected response envelope."
      );
    }

    return envelope.data;
  }
);

/** Fetches a single standalone page detail payload from the portfolio API by slug. */
export const getPortfolioPageBySlug = cache(
  async function getPortfolioPageBySlug(
    slug: string
  ): Promise<ContentPageDetailResponseData | null> {
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

    const endpointUrl = `${portfolioApiBaseUrl}${getContentPageRoute(normalizedSlug)}`;

    const response = await fetchPortfolioApi(endpointUrl, {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: CONTENT_REVALIDATE_SECONDS,
        tags: ["pages", `page:${normalizedSlug}`],
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(
        `Portfolio API content request failed with status ${response.status}.`
      );
    }

    let envelope: ContentPageDetailEnvelope;

    try {
      envelope = (await response.json()) as ContentPageDetailEnvelope;
    } catch {
      throw new Error("Portfolio API returned an invalid JSON response.");
    }

    if (!isContentPageDetailSuccessEnvelope(envelope)) {
      throw new Error(
        "Portfolio API returned an unexpected response envelope."
      );
    }

    return envelope.data;
  }
);
