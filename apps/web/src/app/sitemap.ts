/**
 * @file apps/web/src/app/sitemap.ts
 * @author Guy Romelle Magayano
 * @description Generates sitemap.xml entries for static routes and Sanity-backed article/page routes.
 */

import type { MetadataRoute } from "next";

import logger from "@portfolio/logger";

import { getAllArticles } from "@web/utils/articles";
import { getAllPages } from "@web/utils/pages";
import {
  resolveSiteUrlBase,
  resolveSiteUrlBaseOrDefault,
} from "@web/utils/site-url";

const DEFAULT_SITE_URL = "http://localhost:3000";
const DEFAULT_ENABLE_CMS_CONTENT = true;
const DEFAULT_FAIL_ON_CMS_FETCH_ERROR = false;
const STATIC_SITEMAP_PATHS = [
  "/",
  "/about",
  "/articles",
  "/contact",
  "/projects",
  "/uses",
] as const;

/** Reads and trims an env var value from the current server runtime. */
function getEnvVar(key: string): string {
  return globalThis?.process?.env?.[key]?.trim() ?? "";
}

/** Parses common boolean env formats while preserving a fallback default. */
function parseBooleanEnv(value: string, fallback: boolean): boolean {
  if (!value) {
    return fallback;
  }

  const normalizedValue = value.toLowerCase();

  if (normalizedValue === "true" || normalizedValue === "1") {
    return true;
  }

  if (normalizedValue === "false" || normalizedValue === "0") {
    return false;
  }

  return fallback;
}

/** Resolves a normalized absolute site URL base for sitemap entry generation. */
function getSiteUrlBase(): string {
  const explicitSitemapSiteUrl = getEnvVar("SITEMAP_SITE_URL");

  if (explicitSitemapSiteUrl) {
    return resolveSiteUrlBaseOrDefault(explicitSitemapSiteUrl);
  }

  const resolvedSiteUrl = resolveSiteUrlBase();

  if (resolvedSiteUrl) {
    return resolvedSiteUrl;
  }

  if (getEnvVar("NODE_ENV") === "production") {
    logger.warn(
      "Sitemap site URL is not configured; falling back to localhost default",
      {
        route: "/sitemap.xml",
        expectedEnvVars: [
          "SITEMAP_SITE_URL",
          "NEXT_PUBLIC_SITE_URL",
          "VERCEL_PROJECT_PRODUCTION_URL",
          "VERCEL_URL",
        ],
        fallbackUrl: DEFAULT_SITE_URL,
      }
    );
  }

  return resolveSiteUrlBaseOrDefault(DEFAULT_SITE_URL);
}

/** Builds an absolute URL string for sitemap entries from a route path and URL base. */
function toAbsoluteUrl(path: string, siteUrlBase: string): string {
  return `${siteUrlBase}${path}`;
}

/** Indicates whether the sitemap should include CMS-backed routes from the API gateway. */
function shouldIncludeCmsSitemapEntries(): boolean {
  return parseBooleanEnv(
    getEnvVar("SITEMAP_INCLUDE_CMS_CONTENT"),
    DEFAULT_ENABLE_CMS_CONTENT
  );
}

/** Indicates whether sitemap generation should fail instead of falling back when CMS fetches fail. */
function shouldFailOnCmsFetchError(): boolean {
  return parseBooleanEnv(
    getEnvVar("SITEMAP_FAIL_ON_CMS_FETCH_ERROR"),
    DEFAULT_FAIL_ON_CMS_FETCH_ERROR
  );
}

/** Builds sitemap entries for the static routes that do not depend on the API gateway. */
function createStaticSitemapEntries(
  siteUrlBase: string
): MetadataRoute.Sitemap {
  return STATIC_SITEMAP_PATHS.map((path) => ({
    url: toAbsoluteUrl(path, siteUrlBase),
  }));
}

/** Generates the app sitemap from static routes and Sanity-backed article/page routes. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrlBase = getSiteUrlBase();
  const staticEntries = createStaticSitemapEntries(siteUrlBase);

  let articles = [] as Awaited<ReturnType<typeof getAllArticles>>;
  let pages = [] as Awaited<ReturnType<typeof getAllPages>>;

  if (!shouldIncludeCmsSitemapEntries()) {
    logger.info(
      "Skipping CMS sitemap content fetch because it is disabled by env",
      {
        route: "/sitemap.xml",
        siteUrl: siteUrlBase,
        envVar: "SITEMAP_INCLUDE_CMS_CONTENT",
      }
    );

    return staticEntries;
  }

  try {
    [articles, pages] = await Promise.all([getAllArticles(), getAllPages()]);
  } catch (error) {
    if (shouldFailOnCmsFetchError()) {
      throw error;
    }

    logger.warn(
      "Sitemap content fetch failed; falling back to static routes only",
      {
        route: "/sitemap.xml",
        siteUrl: siteUrlBase,
        envVars: {
          sitemapIncludeCmsContent:
            getEnvVar("SITEMAP_INCLUDE_CMS_CONTENT") || null,
          sitemapFailOnCmsFetchError:
            getEnvVar("SITEMAP_FAIL_ON_CMS_FETCH_ERROR") || null,
          apiGatewayUrl: getEnvVar("API_GATEWAY_URL") || null,
          nextPublicApiUrl: getEnvVar("NEXT_PUBLIC_API_URL") || null,
        },
        error:
          error instanceof Error
            ? {
                name: error.name,
                message: error.message,
              }
            : {
                message: String(error),
              },
      }
    );
  }

  const articleEntries: MetadataRoute.Sitemap = articles
    .filter(
      (article) =>
        article.hideFromSitemap !== true && article.seoNoIndex !== true
    )
    .map((article) => ({
      url: `${siteUrlBase}/articles/${article.slug}`,
      lastModified: article.date,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const pageEntries: MetadataRoute.Sitemap = pages
    .filter((page) => page.hideFromSitemap !== true && page.seoNoIndex !== true)
    .map((page) => ({
      url: `${siteUrlBase}/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticEntries, ...articleEntries, ...pageEntries];
}
