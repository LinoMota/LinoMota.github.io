import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const allowedHosts = [".loca.lt"];

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts,
  },
  preview: {
    allowedHosts,
  },
});
