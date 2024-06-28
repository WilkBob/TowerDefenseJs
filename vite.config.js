import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    base: "./",
    server: {
      base: "./",
    },
    
resolve: {
    alias: {
      '@images': path.resolve(__dirname, '/images')
    },
    },
});