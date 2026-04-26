/**
 * @file apps/web/src/pages/robots.txt.ts
 * @author Guy Romelle Magayano
 * @description Dynamic robots.txt endpoint using the configured Astro site URL.
 */

import type { APIRoute } from "astro";

const DEFAULT_SITE_URL = "https://www.guyromellemagayano.com";

function getRobotsTxt(sitemapUrl: URL): string {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${sitemapUrl.href}`,
    "",
  ].join("\n");
}

/** Renders root-level crawler directives for generated static builds. */
export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL(DEFAULT_SITE_URL);
  const sitemapUrl = new URL("/sitemap-index.xml", siteUrl);

  return new Response(getRobotsTxt(sitemapUrl), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
};
