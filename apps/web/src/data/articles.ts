/**
 * @file apps/web/src/data/articles.ts
 * @author Guy Romelle Magayano
 * @description Article data stored as simple page-ready records.
 */

import {
  type ContentPortableTextBlock,
  type ContentPortableTextImageBlock,
  type ContentTwitterCard,
} from "@web/data/portable-text";

export interface Article {
  title: string;
  badge: string;
  category: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
  featured?: boolean;
  hideFromSitemap?: boolean;
  seoNoIndex?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoCanonicalPath?: string;
  seoNoFollow?: boolean;
  seoOgTitle?: string;
  seoOgDescription?: string;
  seoOgImage?: string;
  seoOgImageWidth?: number;
  seoOgImageHeight?: number;
  seoOgImageAlt?: string;
  seoTwitterCard?: ContentTwitterCard;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  body: Array<ContentPortableTextBlock | ContentPortableTextImageBlock>;
}

export const articleCategories = [
  "All",
  "Frontend Architecture",
  "Design Systems",
  "Monorepo",
  "Content Modeling",
] as const;

function paragraph(key: string, text: string): ContentPortableTextBlock {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    children: [
      {
        _key: `${key}-span`,
        _type: "span",
        text,
        marks: [],
      },
    ],
    markDefs: [],
  };
}

export const articles: Article[] = [
  {
    title: "Designing system boundaries before the UI starts drifting",
    badge: "FRONTEND ARCHITECTURE",
    category: "Frontend Architecture",
    slug: "designing-system-boundaries-before-the-ui-starts-drifting",
    date: "2026-04-18T00:00:00.000Z",
    description:
      "A practical way to tighten product architecture before every new screen becomes a one-off exception.",
    tags: ["frontend-architecture", "design-systems", "product-systems"],
    featured: true,
    body: [
      paragraph(
        "system-boundaries-1",
        "Strong product systems usually fail long before the UI looks obviously broken. The first signs are duplicated decisions, route-specific exceptions, and component APIs that stop describing real domain intent."
      ),
      paragraph(
        "system-boundaries-2",
        "The fix is rarely another wrapper component. It is usually a sharper boundary between layout concerns, domain state, and reusable product primitives."
      ),
      paragraph(
        "system-boundaries-3",
        "I like starting with the routes and the repeated user jobs because they reveal where the product already has natural seams. A dashboard, an editor, a checkout step, and an operational queue should not all ask the same component layer to solve different domain problems."
      ),
      paragraph(
        "system-boundaries-4",
        "The next useful move is to name which parts are durable and which parts are allowed to stay local. Shared navigation, page chrome, form behavior, content metadata, and accessibility primitives usually deserve a common home. One-off copy, single-route layout choices, and experimental flows usually do not."
      ),
      paragraph(
        "system-boundaries-5",
        "This matters for delivery speed because unclear boundaries make every change feel risky. Engineers hesitate to touch shared code, product teams lose confidence in estimates, and small UI requests become architecture debates."
      ),
      paragraph(
        "system-boundaries-6",
        "A good boundary is boring to use. It gives teams a small set of reliable decisions, makes exceptions visible, and leaves enough room for product-specific work without forcing every screen through the same abstraction."
      ),
    ],
  },
  {
    title: "A monorepo should prove leverage, not just collect packages",
    badge: "MONOREPO",
    category: "Monorepo",
    slug: "a-monorepo-should-prove-leverage-not-just-collect-packages",
    date: "2026-04-05T00:00:00.000Z",
    description:
      "A portfolio monorepo only matters if the shared system makes each app cheaper to build and easier to reason about.",
    tags: ["monorepo", "platform", "developer-experience"],
    featured: true,
    body: [
      paragraph(
        "monorepo-proof-1",
        "A monorepo becomes expensive when teams centralize abstractions without proving where reuse pays off. Shared packages need to shorten delivery, not just tidy the repository tree."
      ),
      paragraph(
        "monorepo-proof-2",
        "The useful test is whether a new product surface can reuse navigation, content models, forms, tables, permissions, and release tooling without importing accidental complexity."
      ),
      paragraph(
        "monorepo-proof-3",
        "A healthy monorepo should make ownership easier to see. Shared packages should describe real contracts: UI primitives, typed helpers, testing presets, lint rules, and deployment assumptions that every app can actually depend on."
      ),
      paragraph(
        "monorepo-proof-4",
        "The failure mode is collecting packages before the product has repeated needs. That usually creates a second product inside the repo: one that exists only to maintain abstractions no app is clearly asking for."
      ),
      paragraph(
        "monorepo-proof-5",
        "The stronger approach is to let reuse earn its place. Keep page data local until an integration is justified. Keep app-specific code in the app until two surfaces prove the same problem exists. Keep package exports narrow enough that dependency direction stays obvious."
      ),
      paragraph(
        "monorepo-proof-6",
        "When the monorepo is doing its job, adding a new surface feels less like starting over and more like choosing from known building blocks with clear tradeoffs."
      ),
    ],
  },
  {
    title: "Content models are product architecture, not editorial paperwork",
    badge: "CONTENT MODELING",
    category: "Content Modeling",
    slug: "content-models-are-product-architecture-not-editorial-paperwork",
    date: "2026-03-21T00:00:00.000Z",
    description:
      "Structured content earns its keep when it improves navigation, metadata, SEO, and delivery consistency across the whole product.",
    tags: ["content-modeling", "cms", "seo"],
    featured: true,
    body: [
      paragraph(
        "content-modeling-1",
        "Teams often treat content modeling as a tooling setup task. In practice it shapes route structure, metadata, preview flows, validation rules, and how reliably a site evolves."
      ),
      paragraph(
        "content-modeling-2",
        "When the model is explicit, pages become easier to render locally, easier to index, and easier to move between static delivery paths."
      ),
      paragraph(
        "content-modeling-3",
        "The important content decisions are product decisions. Which fields drive page titles, summaries, calls to action, dates, social previews, and structured data? Which records deserve their own routes? Which relationships should appear as navigation instead of living as hidden editor context?"
      ),
      paragraph(
        "content-modeling-4",
        "Those choices shape how reliably the site can be crawled, shared, and maintained. A clean model makes it hard to forget canonical URLs, time semantics, article descriptions, or service metadata because the rendering layer has a consistent contract."
      ),
      paragraph(
        "content-modeling-5",
        "Local typed data is often enough at the beginning. It keeps the editorial shape visible in code, lowers operational overhead, and makes future migration to a CMS less chaotic because the site already knows what a page or article needs."
      ),
      paragraph(
        "content-modeling-6",
        "A CMS becomes valuable when collaboration, preview, permissions, publishing workflow, or content volume justify the moving parts. Until then, the useful work is modeling the product honestly and keeping the rendering path easy to inspect."
      ),
    ],
  },
];
