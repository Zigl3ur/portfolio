import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svgr from 'vite-plugin-svgr';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://eden.douru.fr",

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
  },

  integrations: [react(), sitemap()]
});