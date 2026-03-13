import { defineConfig } from "vite";
import * as path from "path";
import { readFileSync } from "fs";
import react from "@vitejs/plugin-react";

const colorBoxVersion: string = JSON.parse(
  readFileSync(
    path.resolve(__dirname, "node_modules/@jgleman/color-box/package.json"),
    "utf-8"
  )
).version;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "html-inject-color-box-version",
      transformIndexHtml: (html) =>
        html.replace("%COLOR_BOX_VERSION%", colorBoxVersion),
    },
  ],
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
