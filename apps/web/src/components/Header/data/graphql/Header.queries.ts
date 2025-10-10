// ============================================================================
// SHARED FOOTER COMPONENT DATA QUERIES
// ============================================================================

import { unstable_cache } from "next/cache";

import {
  HEADER_COMPONENT_LABELS,
  HEADER_COMPONENT_NAV_LINKS,
  type HeaderLink,
} from "../Header.data";

// ============================================================================
// CONSTANTS
// ============================================================================

export const HEADER_TAG = "header";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface HeaderData {
  /** Brand name used by the header */
  brandName: string;
  /** Optional tagline displayed in the header */
  tagline?: string;
  /** Navigation links */
  nav: ReadonlyArray<HeaderLink>;
  /** Optional avatar image URL override */
  avatarUrl?: string;
}

// ============================================================================
// QUERIES
// ============================================================================

/** Replace this with your CMS call when ready. */
export async function fetchHeaderRaw(): Promise<HeaderData> {
  // TODO: replace with CMS call when ready.
  const endpoint = globalThis?.process?.env?.CMS_HEADER_ENDPOINT;
  if (!endpoint) {
    // Static fallback
    return {
      brandName: HEADER_COMPONENT_LABELS.brandName,
      tagline: HEADER_COMPONENT_LABELS.tagline,
      nav: HEADER_COMPONENT_NAV_LINKS,
    };
  }
  const res = await fetch(endpoint, {
    next: { revalidate: 3600, tags: [HEADER_TAG] },
  });

  if (!res.ok) throw new Error("Failed to fetch header data");
  return (await res.json()) as HeaderData;
}

/** Cached getter; can be revalidated via revalidateTag('header'). */
export const getHeaderData = unstable_cache(
  async (): Promise<HeaderData> => {
    const raw = await fetchHeaderRaw();
    return {
      brandName: raw.brandName ?? HEADER_COMPONENT_LABELS.brandName,
      tagline: raw.tagline ?? HEADER_COMPONENT_LABELS.tagline,
      nav: raw.nav?.length ? raw.nav : HEADER_COMPONENT_NAV_LINKS,
      avatarUrl: raw.avatarUrl,
    };
  },
  ["header-data"],
  { revalidate: 3600, tags: [HEADER_TAG] }
);
