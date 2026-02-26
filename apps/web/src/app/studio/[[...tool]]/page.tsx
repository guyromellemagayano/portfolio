/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/studio/[[...tool]]/page.tsx
 * @author Guy Romelle Magayano
 * @description Embedded Sanity Studio route for content administration.
 */

import { NextStudio } from "next-sanity/studio";

import { hasSanityConfig } from "@web/sanity/env";

import config from "../../../../sanity.config";

export const dynamic = "force-static";
export const maxDuration = 60;

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!hasSanityConfig()) {
    return (
      <main role="main" aria-label="Sanity Studio setup required">
        Sanity Studio is not configured. Set{" "}
        <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
        <code>NEXT_PUBLIC_SANITY_DATASET</code> to enable this route.
      </main>
    );
  }

  return <NextStudio config={config} />;
}
