import nextMDX from "@next/mdx";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@portfolio/components",
    "@portfolio/logger",
    "@portfolio/ui",
    "@portfolio/hooks",
    "@portfolio/utils",
  ],
  logging: {
    fetches: {
      hmrRefreshes: true,
    },
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  outputFileTracingIncludes: {
    "/": [
      "./src/app/(blog)/articles/**/*.mdx",
      "./src/app/(blog)/articles/**/*.{png,jpg,jpeg,gif,webp,avif,svg}",
    ],
    "/articles": [
      "./src/app/(blog)/articles/**/*.mdx",
      "./src/app/(blog)/articles/**/*.{png,jpg,jpeg,gif,webp,avif,svg}",
    ],
    "/articles/*": [
      "./src/app/(blog)/articles/**/*.mdx",
      "./src/app/(blog)/articles/**/*.{png,jpg,jpeg,gif,webp,avif,svg}",
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

export default withMDX(withNextIntl(nextConfig));
