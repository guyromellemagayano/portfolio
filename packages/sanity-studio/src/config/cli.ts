/**
 * @file packages/sanity-studio/src/config/cli.ts
 * @author Guy Romelle Magayano
 * @description Factory for creating reusable Sanity CLI configuration.
 */

import { defineCliConfig } from "sanity/cli";

/** Options for creating Sanity CLI config. */
export type CreateSanityCliConfigOptions = {
  projectId: string;
  dataset: string;
};

/** Creates Sanity CLI config for project and dataset resolution. */
export function createSanityCliConfig(options: CreateSanityCliConfigOptions) {
  const { projectId, dataset } = options;

  return defineCliConfig({
    api: {
      projectId,
      dataset,
    },
  });
}
