/**
 * @file packages/sanity-studio/src/config/studio.ts
 * @author Guy Romelle Magayano
 * @description Factory for creating reusable Sanity Studio configuration across apps.
 */

import {
  type Config as SanityStudioConfig,
  defineConfig,
  type SchemaTypeDefinition,
} from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { defaultSanitySchemaTypes } from "../schema-types";

/** Options for creating Sanity Studio config. */
export type CreateSanityStudioConfigOptions = {
  projectId: string;
  dataset: string;
  title?: string;
  name?: string;
  basePath?: string;
  previewEnablePath?: string;
  schemaTypes?: SchemaTypeDefinition[];
};

/** Creates a Sanity Studio config with shared defaults used across monorepo apps. */
export function createSanityStudioConfig(
  options: CreateSanityStudioConfigOptions
): SanityStudioConfig {
  const {
    projectId,
    dataset,
    title = "Portfolio Studio",
    name = "default",
    basePath = "/",
    previewEnablePath = "/api/draft-mode/enable",
    schemaTypes = defaultSanitySchemaTypes,
  } = options;

  return defineConfig({
    name,
    title,
    projectId,
    dataset,
    basePath,
    plugins: [
      structureTool(),
      presentationTool({
        previewUrl: {
          previewMode: {
            enable: previewEnablePath,
          },
        },
      }),
    ],
    schema: {
      types: schemaTypes,
    },
  });
}
