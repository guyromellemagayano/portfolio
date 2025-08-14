import { unstable_cache } from "next/cache";

import type { FooterData, FooterLink } from "@web/components/footer/models";
import {
  FOOTER_COMPONENT_LABELS,
  FOOTER_COMPONENT_NAV_LINKS,
} from "@web/components/footer/models/data";

// This module is server-only, but Next.js pages directory doesn't support SC components across pages.
// Remove server-only to keep compatibility in mixed environments.

export const FOOTER_TAG = "footer";

/** Replace this with your CMS call when ready. */
async function fetchFooterRaw(): Promise<FooterData> {
  // TODO: replace with CMS call when ready.
  const endpoint = globalThis?.process?.env?.CMS_FOOTER_ENDPOINT;
  if (!endpoint) {
    // Static fallback
    return {
      brandName: FOOTER_COMPONENT_LABELS.brandName,
      legalText: FOOTER_COMPONENT_LABELS.legalText,
      nav: FOOTER_COMPONENT_NAV_LINKS as ReadonlyArray<FooterLink>,
    };
  }
  const res = await fetch(endpoint, {
    next: { revalidate: 3600, tags: [FOOTER_TAG] },
  });
  if (!res.ok) throw new Error("Failed to fetch footer data");
  return (await res.json()) as FooterData; // map/validate to your shape if needed
}

/** Cached getter; can be revalidated via revalidateTag('footer'). */
export const getFooterData = unstable_cache(
  async (): Promise<FooterData> => {
    const raw = await fetchFooterRaw();
    return {
      brandName: raw.brandName ?? FOOTER_COMPONENT_LABELS.brandName,
      legalText: raw.legalText ?? FOOTER_COMPONENT_LABELS.legalText,
      nav: raw.nav?.length ? raw.nav : FOOTER_COMPONENT_NAV_LINKS,
      year: raw.year,
    };
  },
  ["footer-data"],
  { revalidate: 3600, tags: [FOOTER_TAG] }
);
