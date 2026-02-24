/**
 * @file apps/web/sanity.cli.ts
 * @author Guy Romelle Magayano
 * @description Sanity CLI config using environment-driven `projectId` and `dataset`.
 */

import { createSanityCliConfig } from "@portfolio/sanity-studio/config/cli";

import { getSanityConfig } from "./src/sanity/env";

const sanityConfig = getSanityConfig();

export default createSanityCliConfig({
  projectId: sanityConfig?.projectId ?? "missing-project-id",
  dataset: sanityConfig?.dataset ?? "missing-dataset",
});
