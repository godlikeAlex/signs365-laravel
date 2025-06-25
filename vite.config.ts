import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
const path = require("path");
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
  server: {
    https: true,
    hmr: {
      host: "localhost",
    },
  },
  css: {
    devSourcemap: true,
  },
  plugins: [
    laravel({
      input: [
        "resources/js/index.tsx",
        "resources/js/fillament-app.js",
        "resources/css/app.css",
        "resources/css/style.css",
      ],
      ssr: "resources/js/ssr.tsx",
      refresh: true,
    }),
    react(),
    mkcert(),
    {
      name: "singleHMR",
      handleHotUpdate({ modules }) {
        modules.map((m) => {
          m.importedModules = new Set();
          m.importers = new Set();
        });

        return modules;
      },
    },
    commonjs(),
  ],
  build: {
    commonjsOptions: {
      include: [/.js$/],
    },
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "./resources/js"),
    },
  },
  ssr: {
    noExternal: [
      "@inertiajs/server",
      "@reduxjs/toolkit",
      "react-dropzone",
      "react-spinners",
    ],
  },
});
