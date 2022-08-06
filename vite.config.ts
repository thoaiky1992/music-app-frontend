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
        target: "http://localhost:4001",
        ws: true,
      },
      "/images": {
        target: "http://localhost:4001",
        ws: true,
      },
      "/music": {
        target: "http://localhost:4001",
        ws: true,
      },
    },
  },
});
