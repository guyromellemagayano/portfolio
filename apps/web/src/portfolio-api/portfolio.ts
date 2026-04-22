/**
 * @file apps/web/src/portfolio-api/portfolio.ts
 * @author Guy Romelle Magayano
 * @description Portfolio API client for brochure snapshot retrieval in the web app.
 */

import { cache } from "react";

import {
  type ContentPortfolioSnapshotResponseData,
  PORTFOLIO_REVALIDATE_SECONDS,
  PORTFOLIO_ROUTE,
} from "@portfolio/api-contracts/content";
import {
  type ApiErrorEnvelope,
  type ApiSuccessEnvelope,
} from "@portfolio/api-contracts/http";
import { contentSnapshot } from "@portfolio/content-data";

import {
  fetchPortfolioApi,
  resolvePortfolioApiBaseUrl,
} from "./content/articles";

type PortfolioSnapshotEnvelope =
  | ApiSuccessEnvelope<ContentPortfolioSnapshotResponseData>
  | ApiErrorEnvelope;

/** Returns a cloned local portfolio snapshot for static-first fallback behavior. */
function getLocalPortfolioSnapshot(): ContentPortfolioSnapshotResponseData {
  return globalThis.structuredClone(contentSnapshot.portfolio);
}

/** Validates the expected success envelope shape for portfolio snapshot responses. */
function isPortfolioSnapshotSuccessEnvelope(
  payload: unknown
): payload is ApiSuccessEnvelope<ContentPortfolioSnapshotResponseData> {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const envelope = payload as Partial<ApiSuccessEnvelope<unknown>>;

  return (
    envelope.success === true &&
    !!envelope.data &&
    typeof envelope.data === "object" &&
    !Array.isArray(envelope.data) &&
    typeof (envelope.data as { schemaVersion?: unknown }).schemaVersion ===
      "string"
  );
}

/** Fetches the canonical portfolio snapshot from the portfolio API. */
export const getPortfolioSnapshot = cache(
  async function getPortfolioSnapshot(): Promise<ContentPortfolioSnapshotResponseData> {
    const portfolioApiBaseUrl = resolvePortfolioApiBaseUrl();

    if (!portfolioApiBaseUrl) {
      return getLocalPortfolioSnapshot();
    }

    const endpointUrl = `${portfolioApiBaseUrl}${PORTFOLIO_ROUTE}`;
    try {
      const response = await fetchPortfolioApi(endpointUrl, {
        method: "GET",
        cache: "force-cache",
        next: {
          revalidate: PORTFOLIO_REVALIDATE_SECONDS,
          tags: ["portfolio"],
        },
      });

      if (!response.ok) {
        return getLocalPortfolioSnapshot();
      }

      let envelope: PortfolioSnapshotEnvelope;

      try {
        envelope = (await response.json()) as PortfolioSnapshotEnvelope;
      } catch {
        return getLocalPortfolioSnapshot();
      }

      if (!isPortfolioSnapshotSuccessEnvelope(envelope)) {
        return getLocalPortfolioSnapshot();
      }

      return envelope.data;
    } catch {
      return getLocalPortfolioSnapshot();
    }
  }
);
