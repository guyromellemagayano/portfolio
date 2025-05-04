import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { defineCliConfig } from "sanity/cli";

const ROOT = dirname(fileURLToPath(import.meta.url));
const MONOREPO = join(ROOT, "..", "..");
loadEnv({ path: "../../.env" });

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";
const host = process.env.HOST_NAME;
const studioHost = host && host !== "main" ? `${host}-portfolio` : "portfolio";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost,
  autoUpdates: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vite: (prev: { resolve: { alias: any } }) => {
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
});
