import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  server: {
    host: true,
    port: 3000,
    allowedHosts: [
      "3970d72b-b2f0-4493-94db-8825e3a5facb-00-1usgrmzi7an3v.pike.replit.dev",
    ],
  },
});
