import { config as loadEnv } from "dotenv";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineCliConfig } from "sanity/cli";

import { dataset, projectId, studioHost } from "@studio/configs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const MONOREPO = join(ROOT, "..", "..");
loadEnv({ path: "../../.env" });

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
