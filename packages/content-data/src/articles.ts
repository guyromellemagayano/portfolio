/**
 * @file packages/content-data/src/articles.ts
 * @author Guy Romelle Magayano
 * @description Local article snapshot data that matches API content contracts.
 */

import type { ContentArticleDetail } from "@portfolio/api-contracts/content";

import { createPortableTextParagraph, defineArticle } from "./authoring";

/** Typed local article records used by the content data snapshot. */
export type LocalArticleRecord = ContentArticleDetail;

/** Seed article snapshot; update this list directly when local content changes. */
export const articlesSnapshot: ReadonlyArray<LocalArticleRecord> = [
  defineArticle({
    id: "local-article-system-boundaries",
    title: "Designing system boundaries before the UI starts drifting",
    slug: "designing-system-boundaries-before-the-ui-starts-drifting",
    publishedAt: "2026-04-18T00:00:00.000Z",
    excerpt:
      "A practical way to tighten product architecture before every new screen becomes a one-off exception.",
    hideFromSitemap: false,
    seoNoIndex: false,
    tags: ["frontend-architecture", "design-systems", "product-systems"],
    body: [
      createPortableTextParagraph(
        "system-boundaries-paragraph-1",
        "Strong product systems usually fail long before the UI looks obviously broken. The first signs are duplicated decisions, route-specific exceptions, and component APIs that stop describing real domain intent."
      ),
      createPortableTextParagraph(
        "system-boundaries-paragraph-2",
        "The fix is rarely another wrapper component. It is usually a sharper boundary between layout concerns, domain state, and reusable product primitives."
      ),
    ],
  }),
  defineArticle({
    id: "local-article-monorepo-proof",
    title: "A monorepo should prove leverage, not just collect packages",
    slug: "a-monorepo-should-prove-leverage-not-just-collect-packages",
    publishedAt: "2026-04-05T00:00:00.000Z",
    excerpt:
      "A portfolio monorepo only matters if the shared system makes each app cheaper to build and easier to reason about.",
    hideFromSitemap: false,
    seoNoIndex: false,
    tags: ["monorepo", "platform", "developer-experience"],
    body: [
      createPortableTextParagraph(
        "monorepo-proof-paragraph-1",
        "A monorepo becomes expensive when teams centralize abstractions without proving where reuse pays off. Shared packages need to shorten delivery, not just tidy the repository tree."
      ),
      createPortableTextParagraph(
        "monorepo-proof-paragraph-2",
        "The useful test is whether a new product surface can reuse navigation, content models, forms, tables, permissions, and release tooling without importing accidental complexity."
      ),
    ],
  }),
  defineArticle({
    id: "local-article-content-modeling",
    title: "Content models are product architecture, not editorial paperwork",
    slug: "content-models-are-product-architecture-not-editorial-paperwork",
    publishedAt: "2026-03-21T00:00:00.000Z",
    excerpt:
      "Structured content earns its keep when it improves navigation, metadata, SEO, and delivery consistency across the whole product.",
    hideFromSitemap: false,
    seoNoIndex: false,
    tags: ["content-modeling", "cms", "seo"],
    body: [
      createPortableTextParagraph(
        "content-modeling-paragraph-1",
        "Teams often treat content modeling as a CMS setup task. In practice it shapes route structure, metadata, preview flows, validation rules, and how reliably a site evolves."
      ),
      createPortableTextParagraph(
        "content-modeling-paragraph-2",
        "When the model is explicit, pages become easier to render locally, easier to index, and easier to move between static and API-backed delivery paths."
      ),
    ],
  }),
];
