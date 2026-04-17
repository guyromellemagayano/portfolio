/**
 * @file apps/web/src/portfolio-api/portfolio.ts
 * @author Guy Romelle Magayano
 * @description Portfolio API client for brochure snapshot retrieval in the web app.
 */

import {
  PORTFOLIO_ROUTE,
  type ContentPortfolioSnapshotResponseData,
} from "@portfolio/api-contracts/content";
import { contentSnapshot } from "@portfolio/content-data";
import {
  type ApiErrorEnvelope,
  type ApiSuccessEnvelope,
} from "@portfolio/api-contracts/http";

import { resolvePortfolioApiBaseUrl } from "./content/articles";

type PortfolioSnapshotEnvelope =
  | ApiSuccessEnvelope<ContentPortfolioSnapshotResponseData>
  | ApiErrorEnvelope;

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
export async function getPortfolioSnapshot(): Promise<ContentPortfolioSnapshotResponseData> {
  const portfolioApiBaseUrl = resolvePortfolioApiBaseUrl();

  if (!portfolioApiBaseUrl) {
    return structuredClone(contentSnapshot.portfolio);
  }

  const endpointUrl = `${portfolioApiBaseUrl}${PORTFOLIO_ROUTE}`;
  const response = await fetch(endpointUrl, {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: ["portfolio"],
    },
  });

  if (!response.ok) {
    throw new Error(
      `Portfolio API snapshot request failed with status ${response.status}.`
    );
  }

  let envelope: PortfolioSnapshotEnvelope;

  try {
    envelope = (await response.json()) as PortfolioSnapshotEnvelope;
  } catch {
    throw new Error("Portfolio API returned an invalid JSON response.");
  }

  if (!isPortfolioSnapshotSuccessEnvelope(envelope)) {
    throw new Error("Portfolio API returned an unexpected response envelope.");
  }

  return envelope.data;
}
