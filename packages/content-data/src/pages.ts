/**
 * @file packages/content-data/src/pages.ts
 * @author Guy Romelle Magayano
 * @description Local standalone page snapshot data that matches API content contracts.
 */

import type { ContentPageDetail } from "@portfolio/api-contracts/content";

/** Typed local page records used by the content data snapshot. */
export type LocalPageRecord = ContentPageDetail;

/** Seed page snapshot; replace via `snapshot:export:sanity` during migration. */
export const pagesSnapshot: ReadonlyArray<LocalPageRecord> = [
  {
    id: "local-page-now",
    slug: "now",
    title: "Now",
    subheading: "What I am focused on",
    intro:
      "A local content snapshot page used to validate the Sanity migration pipeline.",
    updatedAt: "2026-03-13T00:00:00.000Z",
    hideFromSitemap: false,
    seoNoIndex: false,
    body: [
      {
        _key: "now-page-paragraph-1",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "now-page-span-1",
            _type: "span",
            text: "This page is served from local typed content data instead of Sanity.",
            marks: [],
          },
        ],
      },
    ],
  },
];
