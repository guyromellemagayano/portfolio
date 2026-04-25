import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const site =
  process.env.PUBLIC_SITE_URL ||
  process.env.SITEMAP_SITE_URL ||
  "http://localhost:4321";

export default defineConfig({
  site,
  integrations: [mdx(), sitemap()],
  vite: {
    resolve: {
      alias: {
        "@web": new URL("./src", import.meta.url).pathname,
      },
    },
  },
});
