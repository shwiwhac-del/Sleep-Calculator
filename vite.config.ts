import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    plugins: [
      react(),
      tailwindcss(),
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
      target: "esnext",
      minify: "esbuild",
      cssCodeSplit: true,
      sourcemap: false,
      assetsInlineLimit: 4096,
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-core": ["react", "react-dom", "react-router-dom", "react-helmet-async"],
            "vendor-ui": ["lucide-react", "motion/react"],
          },
        },
      },
    },
    esbuild: {
      legalComments: "none",
      drop: ["console", "debugger"],
      keepNames: false,
    },
    server: {
      // Prevent rapid hot-reload cycling if specified in the container run context
      hmr: process.env.DISABLE_HMR !== "true",
    },
  };
});
