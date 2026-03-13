#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");
const outputDirectory = path.resolve(packageRoot, "src");

const DEFAULT_SANITY_API_VERSION = "2025-02-19";

const SANITY_ARTICLES_GROQ = `*[_type == "article" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, _createdAt),
  "excerpt": coalesce(excerpt, seo.description, ""),
  "hideFromSitemap": seo.hideFromSitemap,
  "seoNoIndex": seo.noIndex,
  "imageUrl": mainImage.asset->url,
  "imageWidth": mainImage.asset->metadata.dimensions.width,
  "imageHeight": mainImage.asset->metadata.dimensions.height,
  tags
}`;

const SANITY_ARTICLE_BY_SLUG_GROQ = `*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, _createdAt),
  "excerpt": coalesce(excerpt, seo.description, ""),
  "hideFromSitemap": seo.hideFromSitemap,
  "seoTitle": seo.title,
  "seoDescription": seo.description,
  "seoCanonicalPath": seo.canonicalPath,
  "seoNoIndex": seo.noIndex,
  "seoNoFollow": seo.noFollow,
  "seoOgTitle": seo.ogTitle,
  "seoOgDescription": seo.ogDescription,
  "seoOgImageUrl": seo.ogImage.asset->url,
  "seoOgImageWidth": seo.ogImage.asset->metadata.dimensions.width,
  "seoOgImageHeight": seo.ogImage.asset->metadata.dimensions.height,
  "seoOgImageAlt": seo.ogImage.alt,
  "seoTwitterCard": seo.twitterCard,
  "imageUrl": mainImage.asset->url,
  "imageWidth": mainImage.asset->metadata.dimensions.width,
  "imageHeight": mainImage.asset->metadata.dimensions.height,
  "imageAlt": mainImage.alt,
  tags,
  "body": coalesce(body, [])[]{
    ...,
    _type == "image" => {
      ...,
      "asset": {
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
      }
    }
  }
}`;

const SANITY_PAGES_GROQ = `*[_type == "page" && defined(slug.current)] | order(_updatedAt desc) {
  _id,
  title,
  "slug": slug.current,
  subheading,
  intro,
  "updatedAt": _updatedAt,
  "hideFromSitemap": seo.hideFromSitemap,
  "seoNoIndex": seo.noIndex
}`;

const SANITY_PAGE_BY_SLUG_GROQ = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  subheading,
  intro,
  "updatedAt": _updatedAt,
  "hideFromSitemap": seo.hideFromSitemap,
  "seoTitle": seo.title,
  "seoDescription": seo.description,
  "seoCanonicalPath": seo.canonicalPath,
  "seoNoIndex": seo.noIndex,
  "seoNoFollow": seo.noFollow,
  "seoOgTitle": seo.ogTitle,
  "seoOgDescription": seo.ogDescription,
  "seoOgImageUrl": seo.ogImage.asset->url,
  "seoOgImageWidth": seo.ogImage.asset->metadata.dimensions.width,
  "seoOgImageHeight": seo.ogImage.asset->metadata.dimensions.height,
  "seoOgImageAlt": seo.ogImage.alt,
  "seoTwitterCard": seo.twitterCard,
  "body": coalesce(body, [])[]{
    ...,
    _type == "image" => {
      ...,
      "asset": {
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
      }
    }
  }
}`;

function getEnv(key) {
  return process.env[key]?.trim() ?? "";
}

function getOptionalNonEmptyString(value) {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
}

function getOptionalBoolean(value) {
  return typeof value === "boolean" ? value : undefined;
}

function getOptionalPositiveNumber(value) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return undefined;
  }

  return Math.round(value);
}

function getTwitterCard(value) {
  return value === "summary" || value === "summary_large_image"
    ? value
    : undefined;
}

function normalizePortableTextBody(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (block) => block && typeof block === "object" && !Array.isArray(block)
  );
}

function createSanityQueryUrl(options, query, params = {}) {
  const baseHost = options.useCdn ? "apicdn.sanity.io" : "api.sanity.io";
  const searchParams = new URLSearchParams({ query });

  for (const [key, rawValue] of Object.entries(params)) {
    if (typeof rawValue === "string" && rawValue.trim().length > 0) {
      searchParams.set(`$${key}`, rawValue.trim());
    }
  }

  return `https://${options.projectId}.${baseHost}/v${options.apiVersion}/data/query/${options.dataset}?${searchParams.toString()}`;
}

async function fetchSanityQuery(options, query, params = {}) {
  const requestUrl = createSanityQueryUrl(options, query, params);
  const headers = {
    accept: "application/json",
  };

  if (options.readToken) {
    headers.authorization = `Bearer ${options.readToken}`;
  }

  const response = await fetch(requestUrl, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `Sanity query failed (${response.status}) for ${requestUrl}${errorText ? `: ${errorText}` : ""}`
    );
  }

  const payload = await response.json();

  if (!payload || typeof payload !== "object") {
    throw new Error(
      `Sanity query returned an invalid payload for ${requestUrl}`
    );
  }

  return payload.result;
}

function mapArticleSummaryToDetail(summaryPayload, detailPayload) {
  const id = getOptionalNonEmptyString(
    detailPayload?._id || summaryPayload?._id
  );
  const title = getOptionalNonEmptyString(
    detailPayload?.title || summaryPayload?.title
  );
  const slug = getOptionalNonEmptyString(
    detailPayload?.slug || summaryPayload?.slug
  );
  const publishedAt = getOptionalNonEmptyString(
    detailPayload?.publishedAt || summaryPayload?.publishedAt
  );

  if (!id || !title || !slug || !publishedAt) {
    return null;
  }

  const tags = Array.isArray(detailPayload?.tags)
    ? detailPayload.tags
        .map((tag) => getOptionalNonEmptyString(tag))
        .filter(Boolean)
    : Array.isArray(summaryPayload?.tags)
      ? summaryPayload.tags
          .map((tag) => getOptionalNonEmptyString(tag))
          .filter(Boolean)
      : [];

  return {
    id,
    title,
    slug,
    publishedAt,
    excerpt:
      getOptionalNonEmptyString(
        detailPayload?.excerpt || summaryPayload?.excerpt
      ) || "",
    hideFromSitemap: getOptionalBoolean(
      detailPayload?.hideFromSitemap ?? summaryPayload?.hideFromSitemap
    ),
    seoNoIndex: getOptionalBoolean(
      detailPayload?.seoNoIndex ?? summaryPayload?.seoNoIndex
    ),
    imageUrl: getOptionalNonEmptyString(
      detailPayload?.imageUrl || summaryPayload?.imageUrl
    ),
    imageWidth: getOptionalPositiveNumber(
      detailPayload?.imageWidth ?? summaryPayload?.imageWidth
    ),
    imageHeight: getOptionalPositiveNumber(
      detailPayload?.imageHeight ?? summaryPayload?.imageHeight
    ),
    tags,
    seoTitle: getOptionalNonEmptyString(detailPayload?.seoTitle),
    seoDescription: getOptionalNonEmptyString(detailPayload?.seoDescription),
    seoCanonicalPath: getOptionalNonEmptyString(
      detailPayload?.seoCanonicalPath
    ),
    seoNoFollow: getOptionalBoolean(detailPayload?.seoNoFollow),
    seoOgTitle: getOptionalNonEmptyString(detailPayload?.seoOgTitle),
    seoOgDescription: getOptionalNonEmptyString(
      detailPayload?.seoOgDescription
    ),
    seoOgImageUrl: getOptionalNonEmptyString(detailPayload?.seoOgImageUrl),
    seoOgImageWidth: getOptionalPositiveNumber(detailPayload?.seoOgImageWidth),
    seoOgImageHeight: getOptionalPositiveNumber(
      detailPayload?.seoOgImageHeight
    ),
    seoOgImageAlt: getOptionalNonEmptyString(detailPayload?.seoOgImageAlt),
    seoTwitterCard: getTwitterCard(detailPayload?.seoTwitterCard),
    imageAlt: getOptionalNonEmptyString(detailPayload?.imageAlt),
    body: normalizePortableTextBody(detailPayload?.body),
  };
}

function mapPageSummaryToDetail(summaryPayload, detailPayload) {
  const id = getOptionalNonEmptyString(
    detailPayload?._id || summaryPayload?._id
  );
  const title = getOptionalNonEmptyString(
    detailPayload?.title || summaryPayload?.title
  );
  const slug = getOptionalNonEmptyString(
    detailPayload?.slug || summaryPayload?.slug
  );

  if (!id || !title || !slug) {
    return null;
  }

  return {
    id,
    title,
    slug,
    subheading: getOptionalNonEmptyString(
      detailPayload?.subheading || summaryPayload?.subheading
    ),
    intro: getOptionalNonEmptyString(
      detailPayload?.intro || summaryPayload?.intro
    ),
    updatedAt: getOptionalNonEmptyString(
      detailPayload?.updatedAt || summaryPayload?.updatedAt
    ),
    hideFromSitemap: getOptionalBoolean(
      detailPayload?.hideFromSitemap ?? summaryPayload?.hideFromSitemap
    ),
    seoNoIndex: getOptionalBoolean(
      detailPayload?.seoNoIndex ?? summaryPayload?.seoNoIndex
    ),
    seoTitle: getOptionalNonEmptyString(detailPayload?.seoTitle),
    seoDescription: getOptionalNonEmptyString(detailPayload?.seoDescription),
    seoCanonicalPath: getOptionalNonEmptyString(
      detailPayload?.seoCanonicalPath
    ),
    seoNoFollow: getOptionalBoolean(detailPayload?.seoNoFollow),
    seoOgTitle: getOptionalNonEmptyString(detailPayload?.seoOgTitle),
    seoOgDescription: getOptionalNonEmptyString(
      detailPayload?.seoOgDescription
    ),
    seoOgImageUrl: getOptionalNonEmptyString(detailPayload?.seoOgImageUrl),
    seoOgImageWidth: getOptionalPositiveNumber(detailPayload?.seoOgImageWidth),
    seoOgImageHeight: getOptionalPositiveNumber(
      detailPayload?.seoOgImageHeight
    ),
    seoOgImageAlt: getOptionalNonEmptyString(detailPayload?.seoOgImageAlt),
    seoTwitterCard: getTwitterCard(detailPayload?.seoTwitterCard),
    body: normalizePortableTextBody(detailPayload?.body),
  };
}

function toTypeScriptModule({ description, typeName, exportName, values }) {
  return `/**\n * @file packages/content-data/src/${exportName === "articlesSnapshot" ? "articles" : "pages"}.ts\n * @author Guy Romelle Magayano\n * @description ${description}\n */\n\nimport type { ${typeName} } from \"@portfolio/api-contracts/content\";\n\n/** Typed local ${exportName === "articlesSnapshot" ? "article" : "page"} records used by the content data snapshot. */\nexport type ${exportName === "articlesSnapshot" ? "LocalArticleRecord" : "LocalPageRecord"} = ${typeName};\n\n/** Exported ${exportName === "articlesSnapshot" ? "article" : "page"} snapshot generated from Sanity migration data. */\nexport const ${exportName}: ReadonlyArray<${exportName === "articlesSnapshot" ? "LocalArticleRecord" : "LocalPageRecord"}> = ${JSON.stringify(values, null, 2)};\n`;
}

async function main() {
  const projectId =
    getEnv("SANITY_STUDIO_PROJECT_ID") ||
    getEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset =
    getEnv("SANITY_STUDIO_DATASET") || getEnv("NEXT_PUBLIC_SANITY_DATASET");
  const apiVersion =
    getEnv("SANITY_API_VERSION") ||
    getEnv("NEXT_PUBLIC_SANITY_API_VERSION") ||
    DEFAULT_SANITY_API_VERSION;
  const readToken = getEnv("SANITY_API_READ_TOKEN") || undefined;
  const useCdnRaw = getEnv("SANITY_USE_CDN").toLowerCase();
  const useCdn = useCdnRaw ? useCdnRaw === "true" || useCdnRaw === "1" : true;

  if (!projectId || !dataset) {
    throw new Error(
      "Missing Sanity project configuration. Set SANITY_STUDIO_PROJECT_ID/SANITY_STUDIO_DATASET or NEXT_PUBLIC_SANITY_PROJECT_ID/NEXT_PUBLIC_SANITY_DATASET."
    );
  }

  const options = {
    projectId,
    dataset,
    apiVersion,
    readToken,
    useCdn,
  };

  console.log("Exporting content snapshot from Sanity...");

  const articleSummaries = await fetchSanityQuery(
    options,
    SANITY_ARTICLES_GROQ
  );
  const pageSummaries = await fetchSanityQuery(options, SANITY_PAGES_GROQ);

  if (!Array.isArray(articleSummaries) || !Array.isArray(pageSummaries)) {
    throw new Error("Expected article and page summary arrays from Sanity.");
  }

  const articleDetails = [];

  for (const summary of articleSummaries) {
    const slug = getOptionalNonEmptyString(summary?.slug);

    if (!slug) {
      continue;
    }

    const detail = await fetchSanityQuery(
      options,
      SANITY_ARTICLE_BY_SLUG_GROQ,
      {
        slug,
      }
    );
    const mapped = mapArticleSummaryToDetail(summary, detail);

    if (mapped) {
      articleDetails.push(mapped);
    }
  }

  const pageDetails = [];

  for (const summary of pageSummaries) {
    const slug = getOptionalNonEmptyString(summary?.slug);

    if (!slug) {
      continue;
    }

    const detail = await fetchSanityQuery(options, SANITY_PAGE_BY_SLUG_GROQ, {
      slug,
    });
    const mapped = mapPageSummaryToDetail(summary, detail);

    if (mapped) {
      pageDetails.push(mapped);
    }
  }

  articleDetails.sort((a, z) => z.publishedAt.localeCompare(a.publishedAt));
  pageDetails.sort((a, z) => a.slug.localeCompare(z.slug));

  mkdirSync(outputDirectory, { recursive: true });

  const articlesModule = toTypeScriptModule({
    description:
      "Local article snapshot data that matches API content contracts.",
    typeName: "ContentArticleDetail",
    exportName: "articlesSnapshot",
    values: articleDetails,
  });

  const pagesModule = toTypeScriptModule({
    description:
      "Local standalone page snapshot data that matches API content contracts.",
    typeName: "ContentPageDetail",
    exportName: "pagesSnapshot",
    values: pageDetails,
  });

  writeFileSync(
    path.join(outputDirectory, "articles.ts"),
    articlesModule,
    "utf8"
  );
  writeFileSync(path.join(outputDirectory, "pages.ts"), pagesModule, "utf8");

  console.log(
    `Wrote ${articleDetails.length} articles and ${pageDetails.length} pages to packages/content-data/src.`
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
