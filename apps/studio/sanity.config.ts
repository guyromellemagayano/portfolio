import { assist } from "@sanity/assist";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { unsplashAssetSource, unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { iconPicker } from "sanity-plugin-icon-picker";
import { media, mediaAssetSource } from "sanity-plugin-media";

import { Logo } from "@studio/components";
import { locations } from "@studio/location";
import { presentationUrl } from "@studio/plugins/presentation-url";
import schemaTypes from "@studio/schemaTypes";
import { structure } from "@studio/structure";
import { createPageTemplate } from "@studio/utils/helper";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET;
const title = process.env.SANITY_STUDIO_TITLE;
const presentationOriginUrl = process.env.SANITY_STUDIO_PRESENTATION_URL;

export default defineConfig({
  name: "default",
  title: title ?? "Turbo Studio",
  projectId: projectId,
  icon: Logo,
  dataset: dataset ?? "production",
  plugins: [
    presentationTool({
      resolve: {
        locations,
      },
      previewUrl: {
        origin: presentationOriginUrl ?? "http://localhost:3000",
        previewMode: {
          enable: "/api/presentation-draft",
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
    newDocumentOptions: (prev, { creationContext }) => {
      const { type } = creationContext;
      if (type === "global") return [];
      return prev;
    },
  },
  schema: {
    types: schemaTypes,
    templates: createPageTemplate(),
  },
});
