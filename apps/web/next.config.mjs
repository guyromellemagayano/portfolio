import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(withNextIntl(nextConfig));
