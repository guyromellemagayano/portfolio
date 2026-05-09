/**
 * @file apps/web/src/data/standalone-pages.ts
 * @author Guy Romelle Magayano
 * @description Standalone page data stored as simple local records.
 */

import {
  type ContentPortableTextBlock,
  type ContentPortableTextImageBlock,
  type ContentTwitterCard,
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
      "A personal snapshot of what I am learning, studying, and rehearsing right now.",
    updatedAt: "2026-05-09T00:00:00.000Z",
    hideFromSitemap: false,
    seoNoIndex: false,
    seoDescription:
      "A personal snapshot of what Guy Romelle Magayano is learning, studying, and rehearsing right now across software architecture, product thinking, and technical communication.",
    body: [
      paragraph(
        "now-1",
        "Lately I have been spending a lot of time going back to fundamentals. I want my thinking to stay clear when a system gets messy, so I have been revisiting system design, data modeling, and the parts of frontend architecture that decide whether a product stays maintainable."
      ),
      paragraph(
        "now-2",
        "I have also been studying by building small things on purpose. Short experiments, notes, and narrow refactors help me separate what I actually understand from what I only know how to repeat."
      ),
      paragraph(
        "now-3",
        "Another focus right now is rehearsal. I want to explain architecture more simply, talk through tradeoffs without hiding behind jargon, stay calm while debugging, and turn vague product requests into plans that a team can really ship."
      ),
      paragraph(
        "now-4",
        "This page is less a status report and more a snapshot of where my attention is going. If it changes often, that is probably a good sign."
      ),
    ],
  },
];
