/**
 * @file apps/web/src/app/api/revalidate/sanity/route.ts
 * @author Guy Romelle Magayano
 * @description Handles Sanity webhook requests and revalidates article cache tags and paths in the web app.
 */

import { Buffer } from "node:buffer";
import { timingSafeEqual } from "node:crypto";

import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import logger from "@portfolio/logger";

import { getSanityWebhookSecret } from "@web/sanity/env";
import { normalizeError } from "@web/utils/error";

const WEBHOOK_AUTH_HEADER = "authorization";
const SANITY_WEBHOOK_SECRET_HEADER = "x-sanity-webhook-secret";
const ARTICLE_LIST_TAG = "articles";
const ARTICLE_DETAIL_TAG_PREFIX = "article:";
const ARTICLE_LIST_PATH = "/articles";

type UnknownRecord = Record<string, unknown>;

export const runtime = "nodejs";

/** Reads a property from an unknown record-like webhook payload object. */
function getRecordValue(source: unknown, key: string): unknown {
  if (!source || typeof source !== "object" || Array.isArray(source)) {
    return undefined;
  }

  return (source as UnknownRecord)[key];
}

/** Reads and trims a string property from an unknown webhook payload object. */
function getStringValue(source: unknown, key: string): string | undefined {
  const value = getRecordValue(source, key);

  if (typeof value !== "string") {
    return undefined;
  }

  const normalizedValue = value.trim();

  return normalizedValue.length > 0 ? normalizedValue : undefined;
}

/** Normalizes Sanity slug payload variants (`string` or `{ current }`). */
function getSlugFromValue(value: unknown): string | undefined {
  if (typeof value === "string") {
    const normalizedSlug = value.trim();
    return normalizedSlug.length > 0 ? normalizedSlug : undefined;
  }

  return getStringValue(value, "current");
}

/** Collects unique article slugs from common Sanity webhook payload shapes. */
function collectArticleSlugs(payload: unknown): string[] {
  const slugCandidates = [
    getRecordValue(payload, "slug"),
    getRecordValue(getRecordValue(payload, "document"), "slug"),
    getRecordValue(getRecordValue(payload, "before"), "slug"),
    getRecordValue(getRecordValue(payload, "after"), "slug"),
    getRecordValue(payload, "previousSlug"),
  ];

  const slugListCandidates = [
    getRecordValue(payload, "slugs"),
    getRecordValue(getRecordValue(payload, "document"), "slugs"),
  ];

  const slugs = new Set<string>();

  for (const candidate of slugCandidates) {
    const slug = getSlugFromValue(candidate);

    if (slug) {
      slugs.add(slug);
    }
  }

  for (const listCandidate of slugListCandidates) {
    if (!Array.isArray(listCandidate)) {
      continue;
    }

    for (const item of listCandidate) {
      const slug = getSlugFromValue(item);

      if (slug) {
        slugs.add(slug);
      }
    }
  }

  return [...slugs];
}

/** Resolves the document type from common Sanity webhook payload shapes. */
function getWebhookDocumentType(payload: unknown): string | undefined {
  return (
    getStringValue(payload, "_type") ||
    getStringValue(getRecordValue(payload, "document"), "_type") ||
    getStringValue(getRecordValue(payload, "after"), "_type") ||
    getStringValue(getRecordValue(payload, "before"), "_type")
  );
}

/** Extracts a bearer token from the `Authorization` header when present. */
function getBearerToken(request: Request): string | undefined {
  const authorizationHeader = request.headers.get(WEBHOOK_AUTH_HEADER)?.trim();

  if (!authorizationHeader) {
    return undefined;
  }

  const [scheme, token] = authorizationHeader.split(/\s+/, 2);

  if (!scheme || scheme.toLowerCase() !== "bearer" || !token) {
    return undefined;
  }

  const normalizedToken = token.trim();

  return normalizedToken.length > 0 ? normalizedToken : undefined;
}

/** Compares webhook secrets using a timing-safe equality check. */
function safeCompareSecret(
  actualSecret: string,
  expectedSecret: string
): boolean {
  const actualBuffer = Buffer.from(actualSecret);
  const expectedBuffer = Buffer.from(expectedSecret);

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(actualBuffer, expectedBuffer);
}

/** Validates webhook credentials against the configured shared secret. */
function isAuthorizedWebhookRequest(
  request: Request,
  configuredSecret: string
): boolean {
  const bearerToken = getBearerToken(request);
  const headerSecret = request.headers
    .get(SANITY_WEBHOOK_SECRET_HEADER)
    ?.trim();
  const providedSecret = bearerToken || headerSecret || "";

  if (!providedSecret) {
    return false;
  }

  return safeCompareSecret(providedSecret, configuredSecret);
}

/** Builds the set of article cache tags to invalidate. */
function getArticleRevalidationTags(slugs: string[]): string[] {
  const tags = new Set<string>([ARTICLE_LIST_TAG]);

  for (const slug of slugs) {
    tags.add(`${ARTICLE_DETAIL_TAG_PREFIX}${slug}`);
  }

  return [...tags];
}

/** Builds the set of article paths to invalidate. */
function getArticleRevalidationPaths(slugs: string[]): string[] {
  const paths = new Set<string>([ARTICLE_LIST_PATH]);

  for (const slug of slugs) {
    paths.add(`${ARTICLE_LIST_PATH}/${encodeURIComponent(slug)}`);
  }

  return [...paths];
}

/**
 * Handles a Sanity webhook request and triggers article cache invalidation.
 *
 * @param request Next.js route request.
 * @returns JSON response describing authorization and revalidation outcomes.
 */
export async function POST(request: NextRequest) {
  const webhookSecret = getSanityWebhookSecret();

  if (!webhookSecret) {
    logger.error("Sanity webhook revalidation secret is missing", {
      component: "web.api.revalidate.sanity",
      operation: "POST",
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SANITY_WEBHOOK_SECRET_MISSING",
          message: "Sanity webhook secret is not configured.",
        },
      },
      { status: 500 }
    );
  }

  if (!isAuthorizedWebhookRequest(request, webhookSecret)) {
    logger.warn("Rejected unauthorized Sanity webhook revalidation request", {
      component: "web.api.revalidate.sanity",
      operation: "POST",
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Invalid webhook credentials.",
        },
      },
      { status: 401 }
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_JSON",
          message: "Webhook payload must be valid JSON.",
        },
      },
      { status: 400 }
    );
  }

  try {
    const documentType = getWebhookDocumentType(payload);
    const articleSlugs = collectArticleSlugs(payload);
    const shouldRevalidateArticleContent =
      documentType === "article" || articleSlugs.length > 0;

    if (!shouldRevalidateArticleContent) {
      return NextResponse.json(
        {
          success: true,
          revalidated: false,
          reason: "unsupported_document_type",
          documentType: documentType ?? null,
        },
        { status: 202 }
      );
    }

    const tagsToRevalidate = getArticleRevalidationTags(articleSlugs);
    const pathsToRevalidate = getArticleRevalidationPaths(articleSlugs);

    for (const tag of tagsToRevalidate) {
      revalidateTag(tag, "max");
    }

    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    logger.info("Revalidated article cache tags from Sanity webhook", {
      component: "web.api.revalidate.sanity",
      operation: "POST",
      metadata: {
        documentType: documentType ?? "unknown",
        tags: tagsToRevalidate,
        paths: pathsToRevalidate,
      },
    });

    return NextResponse.json({
      success: true,
      revalidated: true,
      documentType: documentType ?? null,
      tags: tagsToRevalidate,
      paths: pathsToRevalidate,
      slugs: articleSlugs,
    });
  } catch (error) {
    logger.error("Sanity webhook revalidation failed", normalizeError(error), {
      component: "web.api.revalidate.sanity",
      operation: "POST",
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "REVALIDATION_FAILED",
          message: "Failed to revalidate Sanity content.",
        },
      },
      { status: 500 }
    );
  }
}
