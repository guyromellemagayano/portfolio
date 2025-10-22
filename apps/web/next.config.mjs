import rehypePrism from "@mapbox/rehype-prism";
import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

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
  outputFileTracingIncludes: {
    "/articles/*": ["./src/app/articles/**/*.mdx"],
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
});

export default withMDX(nextConfig);
