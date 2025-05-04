import { join } from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { vercelPreset } from "@vercel/remix/vite";

installGlobals();

export default defineConfig({
  envDir: join(__dirname, "../../"),
  plugins: [remix({ presets: [vercelPreset()] }), tsconfigPaths()],
});
