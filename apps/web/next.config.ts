import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";
import rehypePrism from "@mapbox/rehype-prism";

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@guyromellemagayano/components",
    "@guyromellemagayano/logger",
    "@guyromellemagayano/ui",
  ],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism as any],
  },
});

export default withMDX(nextConfig);
