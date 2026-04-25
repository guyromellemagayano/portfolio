/**
 * @file apps/web/src/data/articles.ts
 * @author Guy Romelle Magayano
 * @description Article data stored as simple page-ready records.
 */

import type {
  ContentPortableTextBlock,
  ContentPortableTextImageBlock,
  ContentTwitterCard,
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
        "Teams often treat content modeling as a CMS setup task. In practice it shapes route structure, metadata, preview flows, validation rules, and how reliably a site evolves."
      ),
      paragraph(
        "content-modeling-2",
        "When the model is explicit, pages become easier to render locally, easier to index, and easier to move between static delivery paths."
      ),
    ],
  },
];
