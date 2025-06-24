/* eslint-disable simple-import-sort/imports */
import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { vercelPreset } from "@vercel/remix/vite";
import { join } from "node:path";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  envDir: join(__dirname, "../../"),
  plugins: [
    remix({ presets: [vercelPreset()] }),
    tsconfigPaths(),
    devtoolsJson(),
  ],
});
