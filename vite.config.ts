import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  base: "/color-box",
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      { find: "@util", replacement: path.resolve(__dirname, "src/ts/Util") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/ts/Components"),
      },
    ],
  },
});
