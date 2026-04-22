/**
 * @file packages/content-data/src/portfolio/shared.ts
 * @author Guy Romelle Magayano
 * @description Shared authoring constants for the local portfolio snapshot.
 */

/** Default publish status used by the local portfolio snapshot. */
export const PUBLISHED_STATUS = "published" as const;

/** Canonical published timestamp used by the seeded portfolio page documents. */
export const SEEDED_PUBLISHED_AT = "2026-03-13T00:00:00.000Z";

/** Canonical updated timestamp used by the seeded portfolio page documents. */
export const SEEDED_UPDATED_AT = "2026-03-13T00:00:00.000Z";
