/**
 * @file apps/web/next.config.ts
 * @author Guy Romelle Magayano
 * @description Next.js configuration for the web app, including shared package transpilation and external image hosts.
 */

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRootDirectory = path.resolve(currentDirectory, "../..");

const workspaceRootEnvLocalFile = path.join(workspaceRootDirectory, ".env");

// Load workspace-level env so apps/web can consume root .env in the monorepo.
if (existsSync(workspaceRootEnvLocalFile)) {
  globalThis.process.loadEnvFile(workspaceRootEnvLocalFile);
}

const shouldUseStandaloneOutput =
  globalThis.process.env.NEXT_WEB_OUTPUT_STANDALONE?.trim() === "1";
const portfolioPublicApiProxyTarget =
  globalThis.process.env.PORTFOLIO_PUBLIC_API_PROXY_TARGET?.trim()?.replace(
    /\/+$/,
    ""
  ) || "";

const allowedDevOrigins = ["127.0.0.1", "localhost"];

type ExperimentalNextConfig = NonNullable<NextConfig["experimental"]> & {
  isolatedDevBuild?: boolean;
};

const experimentalNextConfig: ExperimentalNextConfig = {};

const nextConfig: NextConfig = {
  allowedDevOrigins,
  output: shouldUseStandaloneOutput ? "standalone" : undefined,
  outputFileTracingRoot: shouldUseStandaloneOutput
    ? workspaceRootDirectory
    : undefined,
  transpilePackages: [
    "@portfolio/api-contracts",
    "@portfolio/components",
    "@portfolio/content-data",
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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.example.com",
        port: "",
        pathname: "/images/**",
        search: "",
      },
    ],
  },
  experimental:
    Object.keys(experimentalNextConfig).length > 0
      ? experimentalNextConfig
      : undefined,
  async rewrites() {
    if (!portfolioPublicApiProxyTarget) {
      return [];
    }

    return [
      {
        source: "/api/public/:path*",
        destination: `${portfolioPublicApiProxyTarget}/:path*`,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
