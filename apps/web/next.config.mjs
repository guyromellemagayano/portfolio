import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@guyromellemagayano/components",
    "@guyromellemagayano/logger",
    "@guyromellemagayano/ui",
  ],
  logging: {
    fetches: {
      hmrRefreshes: true,
    },
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-prism"],
  },
});

export default withMDX(nextConfig);
