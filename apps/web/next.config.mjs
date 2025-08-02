import remarkGfm from "remark-gfm";
import nextMDX from "@next/mdx";
import rehypePrism from "@mapbox/rehype-prism";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@guyromellemagayano/components",
    "@guyromellemagayano/logger",
    "@guyromellemagayano/ui",
  ],
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
});

export default withMDX(nextConfig);
