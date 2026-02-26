/**
 * @file apps/web/src/app/sitemap.ts
 * @author Guy Romelle Magayano
 * @description Generates sitemap.xml entries for static routes and Sanity-backed article/page routes.
 */

import type { MetadataRoute } from "next";

import { getAllArticles } from "@web/utils/articles";
import { getAllPages } from "@web/utils/pages";

const DEFAULT_SITE_URL = "http://localhost:3000";
const STATIC_SITEMAP_PATHS = [
  "/",
  "/about",
  "/articles",
  "/contact",
  "/projects",
  "/uses",
] as const;

/** Resolves a normalized absolute site URL base for sitemap entry generation. */
function getSiteUrlBase(): string {
  const siteUrl = globalThis?.process?.env?.NEXT_PUBLIC_SITE_URL?.trim();

  if (!siteUrl) {
    return DEFAULT_SITE_URL;
  }

  try {
    return new URL(siteUrl).toString().replace(/\/+$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/** Builds an absolute URL string for sitemap entries from a route path. */
function toAbsoluteUrl(path: string): string {
  return `${getSiteUrlBase()}${path}`;
}

/** Generates the app sitemap from static routes and Sanity-backed article/page routes. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, pages] = await Promise.all([
    getAllArticles(),
    getAllPages(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_SITEMAP_PATHS.map(
    (path) => ({
      url: toAbsoluteUrl(path),
    })
  );

  const articleEntries: MetadataRoute.Sitemap = articles
    .filter(
      (article) =>
        article.hideFromSitemap !== true && article.seoNoIndex !== true
    )
    .map((article) => ({
      url: toAbsoluteUrl(`/articles/${article.slug}`),
      lastModified: article.date,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const pageEntries: MetadataRoute.Sitemap = pages
    .filter((page) => page.hideFromSitemap !== true && page.seoNoIndex !== true)
    .map((page) => ({
      url: toAbsoluteUrl(`/${page.slug}`),
      lastModified: page.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticEntries, ...articleEntries, ...pageEntries];
}
