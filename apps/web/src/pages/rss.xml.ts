/**
 * @file apps/web/src/pages/rss.xml.ts
 * @author Guy Romelle Magayano
 * @description Static RSS feed for local portfolio notes.
 */

import { type APIRoute } from "astro";

import { SITE_NAME } from "@web/lib/metadata";
import { getAllArticles } from "@web/utils/articles";
import { toAbsoluteSiteUrl } from "@web/utils/site-url";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getRssDate(value: string): string {
  const parsedDate = new Date(value);

  return Number.isNaN(parsedDate.getTime())
    ? new Date().toUTCString()
    : parsedDate.toUTCString();
}

/** Renders the public RSS feed for note syndication. */
export const GET: APIRoute = async () => {
  const articles = await getAllArticles();
  const siteUrl =
    toAbsoluteSiteUrl("/") ?? "https://www.guyromellemagayano.com/";
  const feedUrl = toAbsoluteSiteUrl("/rss.xml") ?? `${siteUrl}rss.xml`;
  const notesUrl =
    toAbsoluteSiteUrl("/notes") ?? `${siteUrl.replace(/\/$/, "")}/notes`;
  const items = articles
    .filter(
      (article) => !article.hideFromSitemap && article.seoNoIndex !== true
    )
    .map((article) => {
      const articleUrl =
        toAbsoluteSiteUrl(`/notes/${article.slug}`) ??
        `${siteUrl.replace(/\/$/, "")}/notes/${article.slug}`;

      return [
        "    <item>",
        `      <title>${escapeXml(article.title)}</title>`,
        `      <link>${escapeXml(articleUrl)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(articleUrl)}</guid>`,
        `      <description>${escapeXml(article.description)}</description>`,
        `      <pubDate>${getRssDate(article.date)}</pubDate>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");
  const latestArticleDate = articles.at(0)?.date;
  const lastBuildDate = latestArticleDate
    ? getRssDate(latestArticleDate)
    : new Date().toUTCString();
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(`${SITE_NAME} Notes`)}</title>`,
    `    <link>${escapeXml(notesUrl)}</link>`,
    "    <description>Notes on product engineering, frontend architecture, platform systems, and content-heavy product surfaces.</description>",
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
    },
  });
};
