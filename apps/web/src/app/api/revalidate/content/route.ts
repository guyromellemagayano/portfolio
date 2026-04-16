/**
 * @file apps/web/src/app/api/revalidate/content/route.ts
 * @author Guy Romelle Magayano
 * @description Handles content revalidation requests and invalidates article/page cache tags and paths.
 */

import { Buffer } from "node:buffer";
import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import logger from "@portfolio/logger";

import { normalizeError } from "@web/utils/error";

const REVALIDATE_AUTH_HEADER = "authorization";
const CONTENT_REVALIDATE_SECRET_HEADER = "x-content-revalidate-secret";
const ARTICLE_LIST_TAG = "articles";
const ARTICLE_DETAIL_TAG_PREFIX = "article:";
const ARTICLE_LIST_PATH = "/articles";
const SITEMAP_PATH = "/sitemap.xml";
const PAGE_LIST_TAG = "pages";
const PAGE_DETAIL_TAG_PREFIX = "page:";

type UnknownRecord = Record<string, unknown>;

export const runtime = "nodejs";

/** Reads and trims the content revalidation secret from env. */
function getContentRevalidateSecret(): string | undefined {
  const secret = globalThis?.process?.env?.CONTENT_REVALIDATE_SECRET?.trim();

  return secret && secret.length > 0 ? secret : undefined;
}

/** Reads a property from an unknown record-like revalidation payload object. */
function getRecordValue(source: unknown, key: string): unknown {
  if (!source || typeof source !== "object" || Array.isArray(source)) {
    return undefined;
  }

  return (source as UnknownRecord)[key];
}

/** Reads and trims a string property from an unknown revalidation payload object. */
function getStringValue(source: unknown, key: string): string | undefined {
  const value = getRecordValue(source, key);

  if (typeof value !== "string") {
    return undefined;
  }

  const normalizedValue = value.trim();

  return normalizedValue.length > 0 ? normalizedValue : undefined;
}

/** Normalizes slug payload variants (`string` or `{ current }`). */
function getSlugFromValue(value: unknown): string | undefined {
  if (typeof value === "string") {
    const normalizedSlug = value.trim();
    return normalizedSlug.length > 0 ? normalizedSlug : undefined;
  }

  return getStringValue(value, "current");
}

/** Collects unique slugs from common payload shapes. */
function collectDocumentSlugs(payload: unknown): string[] {
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

/** Resolves resource type from generic or legacy payload shapes. */
function getRevalidateResource(payload: unknown): string | undefined {
  return (
    getStringValue(payload, "resource") ||
    getStringValue(payload, "_type") ||
    getStringValue(getRecordValue(payload, "document"), "_type") ||
    getStringValue(getRecordValue(payload, "after"), "_type") ||
    getStringValue(getRecordValue(payload, "before"), "_type")
  );
}

/** Extracts a bearer token from the `Authorization` header when present. */
function getBearerToken(request: Request): string | undefined {
  const authorizationHeader = request.headers
    .get(REVALIDATE_AUTH_HEADER)
    ?.trim();

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

/** Compares secrets using a timing-safe equality check. */
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

/** Validates request credentials against the configured shared secret. */
function isAuthorizedRevalidationRequest(
  request: Request,
  configuredSecret: string
): boolean {
  const bearerToken = getBearerToken(request);
  const headerSecret = request.headers
    .get(CONTENT_REVALIDATE_SECRET_HEADER)
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
  const paths = new Set<string>([ARTICLE_LIST_PATH, SITEMAP_PATH]);

  for (const slug of slugs) {
    paths.add(`${ARTICLE_LIST_PATH}/${encodeURIComponent(slug)}`);
  }

  return [...paths];
}

/** Builds the set of page cache tags to invalidate. */
function getPageRevalidationTags(slugs: string[]): string[] {
  const tags = new Set<string>([PAGE_LIST_TAG]);

  for (const slug of slugs) {
    tags.add(`${PAGE_DETAIL_TAG_PREFIX}${slug}`);
  }

  return [...tags];
}

/** Builds the set of page paths to invalidate. */
function getPageRevalidationPaths(slugs: string[]): string[] {
  const paths = new Set<string>([SITEMAP_PATH]);

  for (const slug of slugs) {
    const normalizedSlug = slug.trim();

    if (!normalizedSlug) {
      continue;
    }

    paths.add(`/${encodeURIComponent(normalizedSlug)}`);
  }

  return [...paths];
}

/** Handles a revalidation request and triggers content cache invalidation. */
export async function POST(request: NextRequest) {
  const revalidateSecret = getContentRevalidateSecret();

  if (!revalidateSecret) {
    logger.error("Content revalidation secret is missing", {
      component: "web.api.revalidate.content",
      operation: "POST",
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "CONTENT_REVALIDATE_SECRET_MISSING",
          message: "Content revalidation secret is not configured.",
        },
      },
      { status: 500 }
    );
  }

  if (!isAuthorizedRevalidationRequest(request, revalidateSecret)) {
    logger.warn("Rejected unauthorized content revalidation request", {
      component: "web.api.revalidate.content",
      operation: "POST",
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Invalid revalidation credentials.",
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
          message: "Revalidation payload must be valid JSON.",
        },
      },
      { status: 400 }
    );
  }

  try {
    const resource = getRevalidateResource(payload);
    const documentSlugs = collectDocumentSlugs(payload);
    const normalizedResource = resource?.trim().toLowerCase();

    let tagsToRevalidate: string[] = [];
    let pathsToRevalidate: string[] = [];
    let revalidatedResource: "article" | "page" | null = null;

    if (normalizedResource === "article") {
      tagsToRevalidate = getArticleRevalidationTags(documentSlugs);
      pathsToRevalidate = getArticleRevalidationPaths(documentSlugs);
      revalidatedResource = "article";
    } else if (normalizedResource === "page") {
      tagsToRevalidate = getPageRevalidationTags(documentSlugs);
      pathsToRevalidate = getPageRevalidationPaths(documentSlugs);
      revalidatedResource = "page";
    } else if (!normalizedResource && documentSlugs.length > 0) {
      tagsToRevalidate = getArticleRevalidationTags(documentSlugs);
      pathsToRevalidate = getArticleRevalidationPaths(documentSlugs);
      revalidatedResource = "article";
    }

    if (!revalidatedResource) {
      return NextResponse.json(
        {
          success: true,
          revalidated: false,
          reason: "unsupported_resource_type",
          resource: resource ?? null,
        },
        { status: 202 }
      );
    }

    for (const tag of tagsToRevalidate) {
      revalidateTag(tag, "max");
    }

    for (const routePath of pathsToRevalidate) {
      revalidatePath(routePath);
    }

    logger.info(
      "Revalidated content cache tags from content revalidation API",
      {
        component: "web.api.revalidate.content",
        operation: "POST",
        metadata: {
          resource: revalidatedResource,
          tags: tagsToRevalidate,
          paths: pathsToRevalidate,
        },
      }
    );

    return NextResponse.json({
      success: true,
      revalidated: true,
      resource: revalidatedResource,
      tags: tagsToRevalidate,
      paths: pathsToRevalidate,
      slugs: documentSlugs,
    });
  } catch (error) {
    logger.error("Content revalidation failed", normalizeError(error), {
      component: "web.api.revalidate.content",
      operation: "POST",
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "REVALIDATION_FAILED",
          message: "Failed to revalidate content.",
        },
      },
      { status: 500 }
    );
  }
}
