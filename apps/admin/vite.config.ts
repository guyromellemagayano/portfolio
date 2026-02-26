import { join } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

const localDevelopmentDomain = globalThis.process.env.LOCAL_DEV_DOMAIN?.trim();

export default defineConfig({
  envDir: join(import.meta.dirname, "../../"),
  plugins: [react(), devtoolsJson()],
  server: localDevelopmentDomain
    ? {
        allowedHosts: [
          localDevelopmentDomain,
          `admin.${localDevelopmentDomain}`,
        ],
      }
    : undefined,
});
