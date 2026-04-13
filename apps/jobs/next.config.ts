/**
 * @file apps/jobs/next.config.ts
 * @author Guy Romelle Magayano
 * @description Next.js configuration for the jobs app with shared package transpilation and workspace env loading.
 */

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRootDirectory = path.resolve(currentDirectory, "../..");
const workspaceRootEnvLocalFile = path.join(
  workspaceRootDirectory,
  ".env.local"
);

if (existsSync(workspaceRootEnvLocalFile)) {
  process.loadEnvFile?.(workspaceRootEnvLocalFile);
}

const isDockerLocalDevelopment =
  process.env.DOCKER_LOCAL_DEV?.trim() === "1";
const dockerDistDirectory = isDockerLocalDevelopment
  ? process.env.NEXT_JOBS_DOCKER_DIST_DIR?.trim()
  : undefined;
const shouldUseStandaloneOutput =
  process.env.NEXT_JOBS_OUTPUT_STANDALONE?.trim() === "1";

const nextConfig: NextConfig = {
  distDir: dockerDistDirectory || undefined,
  output: shouldUseStandaloneOutput ? "standalone" : undefined,
  outputFileTracingRoot: shouldUseStandaloneOutput
    ? workspaceRootDirectory
    : undefined,
  transpilePackages: [
    "@portfolio/api-contracts",
    "@portfolio/jobs-domain",
    "@portfolio/jobs-connectors",
  ],
  experimental: isDockerLocalDevelopment
    ? {
        turbopackFileSystemCacheForDev: false,
      }
    : undefined,
};

export default nextConfig;
