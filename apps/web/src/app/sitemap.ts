/**
 * @file apps/web/src/app/sitemap.ts
 * @author Guy Romelle Magayano
 * @description Generates sitemap.xml entries for static routes and local article/page content.
 */

import type { MetadataRoute } from "next";

import { getAllArticles } from "@web/utils/articles";
import { getAllPages } from "@web/utils/pages";
import {
  resolveSiteUrlBase,
  resolveSiteUrlBaseOrDefault,
} from "@web/utils/site-url";

const DEFAULT_SITE_URL = "http://localhost:3000";
const STATIC_SITEMAP_PATHS = [
  "/",
  "/about",
  "/articles",
  "/book",
  "/hire",
  "/projects",
  "/services",
  "/uses",
] as const;

/** Reads and trims an env var value from the current server runtime. */
function getEnvVar(key: string): string {
  return globalThis?.process?.env?.[key]?.trim() ?? "";
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
    return resolveSiteUrlBaseOrDefault(DEFAULT_SITE_URL);
  }

  return resolveSiteUrlBaseOrDefault(DEFAULT_SITE_URL);
}

/** Builds an absolute URL string for sitemap entries from a route path and URL base. */
function toAbsoluteUrl(path: string, siteUrlBase: string): string {
  return `${siteUrlBase}${path}`;
}

/** Builds sitemap entries for the static brochure routes. */
function createStaticSitemapEntries(
  siteUrlBase: string
): MetadataRoute.Sitemap {
  return STATIC_SITEMAP_PATHS.map((path) => ({
    url: toAbsoluteUrl(path, siteUrlBase),
  }));
}

/** Generates the app sitemap from static routes and local article/page routes. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrlBase = getSiteUrlBase();
  const staticEntries = createStaticSitemapEntries(siteUrlBase);
  const [articles, pages] = await Promise.all([
    getAllArticles(),
    getAllPages(),
  ]);

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
