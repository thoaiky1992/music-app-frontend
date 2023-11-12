import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://159.223.50.115:4001",
      },
      "/images": {
        target: "http://159.223.50.115:4001",
      },
      "/music": {
        target: "http://159.223.50.115:4001",
      },
      "/socket": {
        target: "http://159.223.50.115:4001",
        ws: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
