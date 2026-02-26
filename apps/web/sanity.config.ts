/**
 * @file apps/web/sanity.config.ts
 * @author Guy Romelle Magayano
 * @description Defines the Sanity Studio configuration for the web project.
 */

"use client";

import { createSanityStudioConfig } from "@portfolio/sanity-studio/config/studio";
import { defaultSanitySchemaTypes } from "@portfolio/sanity-studio/schema-types";

import { getSanityConfig } from "./src/sanity/env";

const sanityConfig = getSanityConfig();
const projectId = sanityConfig?.projectId ?? "missing-project-id";
const dataset = sanityConfig?.dataset ?? "missing-dataset";

// eslint-disable-next-line no-undef -- Next.js inlines process.env.NODE_ENV in client bundles
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line no-console -- Avoid importing the shared logger into the client Studio bundle.
  console.info("[sanity.studio.config] Resolved Sanity project config", {
    projectId,
    dataset,
  });
}

export default createSanityStudioConfig({
  projectId,
  dataset,
  title: "Portfolio Studio",
  name: "default",
  basePath: "/studio",
  previewEnablePath: "/api/draft-mode/enable",
  schemaTypes: defaultSanitySchemaTypes,
});
