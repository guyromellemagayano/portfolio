/**
 * @file apps/web/src/data/standalone-pages.ts
 * @author Guy Romelle Magayano
 * @description Standalone page data stored as simple local records.
 */

import type {
  ContentPortableTextBlock,
  ContentPortableTextImageBlock,
  ContentTwitterCard,
} from "@web/data/portable-text";

export interface StandalonePage {
  slug: string;
  title: string;
  subheading?: string;
  intro?: string;
  updatedAt?: string;
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
  body: Array<ContentPortableTextBlock | ContentPortableTextImageBlock>;
}

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

export const standalonePages: StandalonePage[] = [
  {
    slug: "now",
    title: "Now",
    subheading: "What I am focused on",
    intro:
      "A simple local page used to validate the direct-data rendering path.",
    updatedAt: "2026-03-13T00:00:00.000Z",
    hideFromSitemap: false,
    seoNoIndex: false,
    body: [
      paragraph(
        "now-1",
        "I am focused on simplifying this portfolio into a static-first Astro site with local, typed data that is easy to inspect and change."
      ),
      paragraph(
        "now-2",
        "The current priority is clarity: fewer services, fewer abstractions, and page data that sits close to the pages that render it."
      ),
    ],
  },
];
