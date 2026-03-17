import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/", // ✅ VERY IMPORTANT (fixes blank screen)

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks: (id) => {

          // React core
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "vendor-react";
          }

          // Router
          if (id.includes("node_modules/react-router")) {
            return "vendor-router";
          }

          // Charts
          if (
            id.includes("node_modules/recharts") ||
            id.includes("node_modules/d3") ||
            id.includes("node_modules/victory")
          ) {
            return "vendor-charts";
          }

          // XLSX
          if (id.includes("node_modules/xlsx")) {
            return "vendor-xlsx";
          }

          // Utils
          if (
            id.includes("node_modules/moment") ||
            id.includes("node_modules/lodash")
          ) {
            return "vendor-utils";
          }

          // Radix UI
          if (id.includes("node_modules/@radix-ui")) {
            return "vendor-radix";
          }

          // Aria
          if (
            id.includes("node_modules/react-aria") ||
            id.includes("node_modules/@internationalized")
          ) {
            return "vendor-aria";
          }

          // TanStack
          if (id.includes("node_modules/@tanstack")) {
            return "vendor-table";
          }

          // Misc
          if (id.includes("node_modules/")) {
            return "vendor-misc";
          }
        },
      },
    },
  },
});