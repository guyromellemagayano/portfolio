import nextMDX from "@next/mdx";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
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
  outputFileTracingIncludes: {
    "/articles/*": ["./src/app/articles/**/*.mdx"],
  },
};

const withNextIntl = createNextIntlPlugin();

const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

export default withMDX(withNextIntl(nextConfig));
