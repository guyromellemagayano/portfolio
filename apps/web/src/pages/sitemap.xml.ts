/**
 * @file apps/web/src/pages/sitemap.xml.ts
 * @author Guy Romelle Magayano
 * @description Static sitemap endpoint for Astro builds.
 */

import { getAllArticles } from "@web/utils/articles";
import { getAllPages } from "@web/utils/pages";
import { resolveSiteUrlBaseOrDefault } from "@web/utils/site-url";

const DEFAULT_SITE_URL = "https://www.guyromellemagayano.com";

/** Handles static sitemap generation for portfolio content routes. */
export async function GET() {
  const siteUrl = resolveSiteUrlBaseOrDefault(
    globalThis.process.env.PUBLIC_SITE_URL ||
      globalThis.process.env.SITEMAP_SITE_URL ||
      DEFAULT_SITE_URL
  );
  const [articles, pages] = await Promise.all([
    getAllArticles(),
    getAllPages(),
  ]);
  const urls = [
    "",
    ...pages
      .filter((page) => !page.hideFromSitemap && page.seoNoIndex !== true)
      .map((page) => page.slug),
    ...articles
      .filter(
        (article) => !article.hideFromSitemap && article.seoNoIndex !== true
      )
      .map((article) => `articles/${article.slug}`),
  ];
  const uniqueUrls = Array.from(new Set(urls));
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${uniqueUrls
    .map((path) => {
      const normalizedPath = path ? `/${path.replace(/^\/+/, "")}` : "/";

      return `  <url><loc>${siteUrl}${normalizedPath}</loc></url>`;
    })
    .join("\n")}\n</urlset>`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
    },
  });
}
