import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: {
    https: true,
    hmr: {
      host: "localhost",
    },
  },
  plugins: [
    laravel({
      input: "resources/js/index.jsx",
      refresh: true,
    }),
    react(),
    mkcert(),
  ],
});
