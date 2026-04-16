import path from "node:path";
import { fileURLToPath } from "node:url";

import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@portfolio/api-contracts",
    "@portfolio/components",
    "@portfolio/logger",
    "@portfolio/ui",
    "@portfolio/hooks",
    "@portfolio/utils",
  ],
  turbopack: {
    root: path.join(__dirname, "..", ".."),
  },
  logging: {
    fetches: {
      hmrRefreshes: true,
    },
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(withNextIntl(nextConfig));
