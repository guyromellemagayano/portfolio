import { join } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const localDevelopmentDomain = process.env.LOCAL_DEV_DOMAIN?.trim();
const defaultLocalDevelopmentDomain = "guyromellemagayano.local";
const effectiveLocalDevelopmentDomain =
  localDevelopmentDomain || defaultLocalDevelopmentDomain;
const isDockerLocalDevelopment = process.env.DOCKER_LOCAL_DEV === "1";
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
  },
});
