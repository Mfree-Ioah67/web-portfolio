import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    glsl({
      include: ["**/*.glsl", "**/*.vert", "**/*.frag"],
      defaultExtension: "glsl",
      warnDuplicatedImports: false,
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: { port: 3000, strictPort: true, host: true },
  assetsInclude: ["**/*.glb", "**/*.gltf", "**/*.ktx2"],
  build: {
    outDir: "./dist",
    sourcemap: false,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
  },
});
