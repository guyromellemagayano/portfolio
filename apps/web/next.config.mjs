<<<<<<< HEAD:apps/web/next.config.mjs
import createMDX from "@next/mdx";
=======
import nextMDX from "@next/mdx";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
>>>>>>> 549e3e1ad (feat(monorepo): :sparkles: integrate `next-intl` for internationalization support):apps/web/next.config.ts

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@guyromellemagayano/components",
    "@guyromellemagayano/logger",
    "@guyromellemagayano/ui",
    "@guyromellemagayano/hooks",
    "@guyromellemagayano/utils",
  ],
  logging: {
    fetches: {
      hmrRefreshes: true,
    },
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

<<<<<<< HEAD:apps/web/next.config.mjs
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-prism"],
  },
=======
const withNextIntl = createNextIntlPlugin();

const withMDX = nextMDX({
  extension: /\.mdx?$/,
>>>>>>> 549e3e1ad (feat(monorepo): :sparkles: integrate `next-intl` for internationalization support):apps/web/next.config.ts
});

export default withMDX(withNextIntl(nextConfig));
