import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this project at https://<user>.github.io/web-portfolio/,
// so production assets must be prefixed with that path. Dev stays at "/".
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/web-portfolio/" : "/",
  plugins: [react()],
  define: {
    // Shown in the footer as "Updated YYYY-MM-DD"; rebuilt on every push by CI.
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: { port: 3000 },
}));
