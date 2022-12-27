import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
const path = require("path");

export default defineConfig({
  server: {
    https: true,
    hmr: {
      host: "localhost",
    },
  },
  plugins: [
    laravel({
      input: "resources/js/index.tsx",
      refresh: true,
    }),
    react(),
    mkcert(),
  ],
  resolve: {
    alias: {
      "@": path.join(__dirname, "./resources/js"),
    },
  },
});
