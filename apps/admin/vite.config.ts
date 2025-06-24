import react from "@vitejs/plugin-react";
import { join } from "node:path";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  envDir: join(__dirname, "../../"),
  plugins: [react(), devtoolsJson()],
});
