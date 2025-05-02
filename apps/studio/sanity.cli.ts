import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;
const host = process.env.HOST_NAME;

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: dataset,
  },
  studioHost: host && host !== "main" ? `${host}-turbo-start-sanity` : "turbo-start-sanity",
  autoUpdates: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vite: (prev: { resolve: { alias: any } }) => ({
    ...prev,
    resolve: {
      ...prev?.resolve,
      alias: {
        ...prev?.resolve?.alias,
        "@studio": __dirname,
      },
    },
  }),
});
