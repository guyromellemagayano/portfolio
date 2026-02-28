/**
 * @file apps/web/next.config.ts
 * @author Guy Romelle Magayano
 * @description Next.js configuration for the web app, including shared package transpilation and Sanity image hosts.
 */

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRootDirectory = path.resolve(currentDirectory, "../..");

const workspaceRootEnvLocalFile = path.join(
  workspaceRootDirectory,
  ".env.local"
);

// Load workspace-level env so apps/web can consume root .env.local in the monorepo.
if (existsSync(workspaceRootEnvLocalFile)) {
  globalThis.process.loadEnvFile(workspaceRootEnvLocalFile);
}

const isDockerLocalDevelopment =
  globalThis.process.env.DOCKER_LOCAL_DEV?.trim() === "1";
const dockerWebDistDirectory = isDockerLocalDevelopment
  ? globalThis.process.env.NEXT_WEB_DOCKER_DIST_DIR?.trim()
  : undefined;
const localDevelopmentDomain =
  globalThis.process.env.LOCAL_DEV_DOMAIN?.trim() || "guyromellemagayano.local";
const shouldUseStandaloneOutput =
  globalThis.process.env.NEXT_WEB_OUTPUT_STANDALONE?.trim() === "1";

const allowedDevOrigins = [
  localDevelopmentDomain,
  `*.${localDevelopmentDomain}`,
];

const experimentalNextConfig: NonNullable<NextConfig["experimental"]> = {};

if (isDockerLocalDevelopment) {
  experimentalNextConfig.isolatedDevBuild = true;
}

if (isDockerLocalDevelopment) {
  experimentalNextConfig.turbopackFileSystemCacheForDev = false;
}

const nextConfig: NextConfig = {
  distDir: dockerWebDistDirectory || undefined,
  allowedDevOrigins,
  output: shouldUseStandaloneOutput ? "standalone" : undefined,
  outputFileTracingRoot: shouldUseStandaloneOutput
    ? workspaceRootDirectory
    : undefined,
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
  experimental:
    Object.keys(experimentalNextConfig).length > 0
      ? experimentalNextConfig
      : undefined,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
