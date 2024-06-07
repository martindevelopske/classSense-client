import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // server: {
  //   https: {
  //     key: "./myapp-privateKey.key",
  //     cert: "./myapp.crt",
  //   },
  // },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
