import { join } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const localDevelopmentDomain = process.env.LOCAL_DEV_DOMAIN?.trim();
const defaultLocalDevelopmentDomain = "guyromellemagayano.local";
const effectiveLocalDevelopmentDomain =
  localDevelopmentDomain || defaultLocalDevelopmentDomain;
const isDockerLocalDevelopment = process.env.DOCKER_LOCAL_DEV === "1";
const defaultJobsApiProxyTarget = isDockerLocalDevelopment
  ? "http://jobs-api:5002"
  : "http://127.0.0.1:5002";
const jobsApiProxyTarget =
  process.env.JOBS_API_URL?.trim() || defaultJobsApiProxyTarget;
const allowedHosts = Array.from(
  new Set([
    effectiveLocalDevelopmentDomain,
    `jobs.${effectiveLocalDevelopmentDomain}`,
    ...(isDockerLocalDevelopment ? ["localhost"] : []),
  ])
);

export default defineConfig({
  envDir: join(import.meta.dirname, "../../"),
  plugins: [react()],
  server: {
    allowedHosts,
    proxy: {
      "/api-jobs": {
        target: jobsApiProxyTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-jobs/, ""),
      },
    },
  },
});
