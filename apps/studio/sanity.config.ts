import { assist } from "@sanity/assist";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import {
  unsplashAssetSource,
  unsplashImageAsset,
} from "sanity-plugin-asset-source-unsplash";
import { iconPicker } from "sanity-plugin-icon-picker";
import { media, mediaAssetSource } from "sanity-plugin-media";

import { Logo } from "@studio/components";
import {
  dataset,
  previewOrigin,
  previewUrl,
  projectId,
  title,
} from "@studio/configs/env";
import { locations } from "@studio/location";
import { presentationUrl } from "@studio/plugins/presentation-url";
import schemaTypes from "@studio/schemaTypes";
import { structure } from "@studio/structure";
import { createPageTemplate } from "@studio/utils/helper";

export default defineConfig({
  name: "default",
  title,
  projectId,
  dataset,
  icon: Logo,
  plugins: [
    presentationTool({
      resolve: {
        locations,
      },
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: previewUrl,
        },
      },
    }),
    assist(),
    structureTool({
      structure,
    }),
    visionTool(),
    iconPicker(),
    media(),
    presentationUrl(),
    unsplashImageAsset(),
  ],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vite: async (prev: { resolve: { alias: any } }) => {
    const PATH = await import("node:path");
    const URL = await import("node:url");
    const DOTENV = await import("dotenv");

    const ROOT = PATH.dirname(URL.fileURLToPath(import.meta.url));
    const MONOREPO = PATH.join(ROOT, "..", "..");
    DOTENV.config({ path: PATH.join(MONOREPO, ".env") });

    return {
      ...prev,
      envDir: MONOREPO,
      resolve: {
        alias: [
          ...(prev.resolve?.alias ?? []),
          { find: /^@studio$/, replacement: ROOT },
          { find: /^@studio\/(.*)$/, replacement: `${ROOT}/$1` },
        ],
      },
    };
  },
  form: {
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter(
          (assetSource) =>
            assetSource === mediaAssetSource ||
            assetSource === unsplashAssetSource
        );
      },
    },
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global" ? [] : prev,
  },
  schema: {
    types: schemaTypes,
    templates: createPageTemplate(),
  },
});
