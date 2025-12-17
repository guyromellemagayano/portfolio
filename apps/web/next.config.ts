import nextMDX from "@next/mdx";
import type { NextConfig } from "next";

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

const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
