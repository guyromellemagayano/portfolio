/**
 * @file apps/web/sanity.cli.ts
 * @author Guy Romelle Magayano
 * @description Sanity CLI config using environment-driven `projectId` and `dataset`.
 */

import { createSanityCliConfig } from "@portfolio/sanity-studio/config/cli";

import {
  getSanityConfig,
  getSanityStudioConfig,
  requireSanityStudioConfig,
} from "./src/sanity/env";

const cliArgs = (globalThis?.process?.argv ?? []).slice(2);
const hasHelpFlag = cliArgs.some(
  (arg) => arg === "--help" || arg === "-h" || arg === "help"
);
const requiresProjectConfig =
  !hasHelpFlag &&
  cliArgs.some((arg) => ["deploy", "build", "dev", "start"].includes(arg));
const studioSanityConfig = requiresProjectConfig
  ? requireSanityStudioConfig()
  : getSanityStudioConfig();
const sanityConfig = studioSanityConfig ?? getSanityConfig();

export default createSanityCliConfig({
  projectId: sanityConfig?.projectId ?? "missing-project-id",
  dataset: sanityConfig?.dataset ?? "missing-dataset",
});
