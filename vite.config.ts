import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.png", "robots.txt", "sitemap.xml"],
        manifest: {
          id: "/",
          name: "Free Sleep Calculator",
          short_name: "Sleep Calc",
          description:
            "Free sleep cycle calculator to wake up refreshed based on your natural 90-minute REM cycles.",
          theme_color: "#111827",
          background_color: "#ffffff",
          display: "standalone",
          display_override: ["minimal-ui", "standalone"],
          // @ts-expect-error capture_links is experimental
          capture_links: "none",
          icons: [
            {
              src: "/favicon.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/favicon.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
        workbox: {
          navigateFallbackDenylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/, /^\/api/],
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
    define: {
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-react": ["react", "react-dom", "react-router-dom", "react-helmet-async"],
            "vendor-lucide": ["lucide-react"],
            "vendor-motion": ["motion/react"],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== "true",
    },
  };
});
