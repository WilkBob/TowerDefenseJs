import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    base: "./",
    //@images are at '@images', js and css are at /assets. I set root here for the js and css, but images need a diffrent root
    
resolve: {
    alias: {
      '@images': path.resolve(__dirname, '/images')
    },
    },
});