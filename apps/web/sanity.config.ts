/**
 * @file apps/web/sanity.config.ts
 * @author Guy Romelle Magayano
 * @description Defines the Sanity Studio configuration for the web project.
 */

"use client";

import logger from "@portfolio/logger";
import { createSanityStudioConfig } from "@portfolio/sanity-studio/config/studio";
import { defaultSanitySchemaTypes } from "@portfolio/sanity-studio/schema-types";

import { requireSanityStudioConfig } from "./src/sanity/env";

const sanityConfig = requireSanityStudioConfig();
const projectId = sanityConfig.projectId;
const dataset = sanityConfig.dataset;
const previewOrigin =
  globalThis?.process?.env?.SANITY_STUDIO_PREVIEW_ORIGIN?.trim() ||
  globalThis?.process?.env?.NEXT_PUBLIC_SITE_URL?.trim() ||
  globalThis?.process?.env?.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
  "";
const normalizedPreviewOrigin = previewOrigin
  ? /^https?:\/\//.test(previewOrigin)
    ? previewOrigin.replace(/\/+$/, "")
    : `https://${previewOrigin.replace(/\/+$/, "")}`
  : "";
const previewEnablePath = normalizedPreviewOrigin
  ? `${normalizedPreviewOrigin}/api/draft-mode/enable`
  : "/api/draft-mode/enable";

if (globalThis?.process?.env?.NODE_ENV !== "production") {
  logger.info("[sanity.studio.config] Resolved Sanity project config", {
    projectId,
    dataset,
    previewEnablePath,
  });
}

export default createSanityStudioConfig({
  projectId,
  dataset,
  title: "Portfolio Studio",
  name: "default",
  basePath: "/",
  previewEnablePath,
  schemaTypes: defaultSanitySchemaTypes,
});
