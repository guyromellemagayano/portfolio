/**
 * @file apps/web/src/gateway/content/pages.ts
 * @author Guy Romelle Magayano
 * @description API gateway client for standalone content page retrieval in the web app.
 */

import {
  CONTENT_PAGES_ROUTE,
  type ContentPageDetailResponseData,
  type ContentPagesResponseData,
  getContentPageRoute,
} from "@portfolio/api-contracts/content";
import {
  type ApiErrorEnvelope,
  type ApiSuccessEnvelope,
} from "@portfolio/api-contracts/http";

import { resolveApiGatewayBaseUrl } from "./articles";

const DEFAULT_GATEWAY_REVALIDATE_SECONDS = 60;

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

/** Fetches standalone page summaries from the API gateway and validates the response envelope. */
export async function getAllGatewayPages(): Promise<ContentPagesResponseData> {
  const gatewayBaseUrl = resolveApiGatewayBaseUrl();

  if (!gatewayBaseUrl) {
    throw new Error(
      "API gateway URL is not configured. Set API_GATEWAY_URL or NEXT_PUBLIC_API_URL in production."
    );
  }

  const endpointUrl = `${gatewayBaseUrl}${CONTENT_PAGES_ROUTE}`;

  const response = await fetch(endpointUrl, {
    method: "GET",
    next: {
      revalidate: DEFAULT_GATEWAY_REVALIDATE_SECONDS,
      tags: ["pages"],
    },
  });

  if (!response.ok) {
    throw new Error(
      `API gateway content request failed with status ${response.status}.`
    );
  }

  let envelope: ContentPagesEnvelope;

  try {
    envelope = (await response.json()) as ContentPagesEnvelope;
  } catch {
    throw new Error("API gateway returned an invalid JSON response.");
  }

  if (!isContentPagesSuccessEnvelope(envelope)) {
    throw new Error("API gateway returned an unexpected response envelope.");
  }

  return envelope.data;
}

/** Fetches a single standalone page detail payload from the API gateway by slug. */
export async function getGatewayPageBySlug(
  slug: string
): Promise<ContentPageDetailResponseData | null> {
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

  const endpointUrl = `${gatewayBaseUrl}${getContentPageRoute(normalizedSlug)}`;

  const response = await fetch(endpointUrl, {
    method: "GET",
    next: {
      revalidate: DEFAULT_GATEWAY_REVALIDATE_SECONDS,
      tags: ["pages", `page:${normalizedSlug}`],
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `API gateway content request failed with status ${response.status}.`
    );
  }

  let envelope: ContentPageDetailEnvelope;

  try {
    envelope = (await response.json()) as ContentPageDetailEnvelope;
  } catch {
    throw new Error("API gateway returned an invalid JSON response.");
  }

  if (!isContentPageDetailSuccessEnvelope(envelope)) {
    throw new Error("API gateway returned an unexpected response envelope.");
  }

  return envelope.data;
}
