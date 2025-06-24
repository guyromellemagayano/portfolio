import react from "@vitejs/plugin-react";
import { join } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  envDir: join(__dirname, "../../"),
  plugins: [react()],
});
