import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svgr from 'vite-plugin-svgr';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport"
  },

  devToolbar: {
    enabled: false
  },

  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "fr"
  },

  output: "static",

  vite: {
    plugins: [tailwindcss(), svgr()],
    server: {
      proxy: {
        '/api': {
          target: process.env.PUBLIC_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  },

  integrations: [react()]
});
