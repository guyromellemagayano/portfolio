/**
 * @file packages/content-data/src/pages.ts
 * @author Guy Romelle Magayano
 * @description Local standalone page snapshot data that matches API content contracts.
 */

import type { ContentPageDetail } from "@portfolio/api-contracts/content";

import { createPortableTextParagraph, definePage } from "./authoring";

/** Typed local page records used by the content data snapshot. */
export type LocalPageRecord = ContentPageDetail;

/** Seed page snapshot; update this list directly when local content changes. */
export const pagesSnapshot: ReadonlyArray<LocalPageRecord> = [
  definePage({
    id: "local-page-now",
    slug: "now",
    title: "Now",
    subheading: "What I am focused on",
    intro:
      "A local content snapshot page used to validate the content migration pipeline.",
    updatedAt: "2026-03-13T00:00:00.000Z",
    hideFromSitemap: false,
    seoNoIndex: false,
    body: [
      createPortableTextParagraph(
        "now-page-paragraph-1",
        "This page is served from local typed content data instead of an external CMS."
      ),
    ],
  }),
];
