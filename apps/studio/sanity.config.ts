import { assist } from "@sanity/assist";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { unsplashAssetSource, unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { iconPicker } from "sanity-plugin-icon-picker";
import { media, mediaAssetSource } from "sanity-plugin-media";

import { Logo } from "./components";
import { locations } from "./location";
import { presentationUrl } from "./plugins/presentation-url";
import schemaTypes from "./schemaTypes";
import { structure } from "./structure";
import { createPageTemplate } from "./utils/helper";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";
const title = process.env.SANITY_STUDIO_TITLE ?? "Portfolio";
const previewOrigin = process.env.SANITY_STUDIO_PRESENTATION_URL ?? "http://localhost:3000";
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL ?? "/api/presentation-draft";

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
          (assetSource) => assetSource === mediaAssetSource || assetSource === unsplashAssetSource,
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
