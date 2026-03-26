import { join } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

const localDevelopmentDomain = globalThis.process.env.LOCAL_DEV_DOMAIN?.trim();
const defaultLocalDevelopmentDomain = "guyromellemagayano.local";
const effectiveLocalDevelopmentDomain =
  localDevelopmentDomain || defaultLocalDevelopmentDomain;
const isDockerLocalDevelopment = globalThis.process.env.DOCKER_LOCAL_DEV === "1";
const defaultOpsDeskApiProxyTarget = isDockerLocalDevelopment
  ? "http://opsdesk-api:8010"
  : "http://127.0.0.1:8010";
const opsDeskApiProxyTarget =
  globalThis.process.env.OPSDESK_API_PROXY_TARGET?.trim() || defaultOpsDeskApiProxyTarget;
const allowedHosts = Array.from(
  new Set([
    effectiveLocalDevelopmentDomain,
    `opsdesk.${effectiveLocalDevelopmentDomain}`,
  ])
);

export default defineConfig({
  envDir: join(import.meta.dirname, "../../"),
  plugins: [react(), devtoolsJson()],
  server: {
    allowedHosts,
    proxy: {
      "/api-opsdesk": {
        target: opsDeskApiProxyTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-opsdesk/, ""),
      },
    },
  },
});
