import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import svgr from 'vite-plugin-svgr';
import react from "@astrojs/react";


// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000
  },

  output: "static",

  vite: {
    plugins: [tailwindcss(), svgr()],
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD ? {
        "react-dom/server": "react-dom/server.edge"
      } : undefined
    }
  },

  integrations: [react()]
});
