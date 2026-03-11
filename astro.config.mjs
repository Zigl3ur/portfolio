import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svgr from 'vite-plugin-svgr';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000
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

  integrations: [react()]
});
