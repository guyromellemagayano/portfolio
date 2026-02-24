import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@portfolio/api-contracts",
    "@portfolio/components",
    "@portfolio/logger",
    "@portfolio/sanity-studio",
    "@portfolio/ui",
    "@portfolio/hooks",
    "@portfolio/utils",
  ],
  logging: {
    fetches: {
      hmrRefreshes: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
        search: "",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
