import { defineConfig } from "vite";
import * as path from "path";
import { readFileSync } from "fs";
import react from "@vitejs/plugin-react";

const projectDir = import.meta.dirname;

const colorBoxVersion: string = JSON.parse(
  readFileSync(
    path.resolve(projectDir, "node_modules/@jgleman/color-box/package.json"),
    "utf-8",
  ),
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
      { find: "@", replacement: path.resolve(projectDir, "src") },
      { find: "@assets", replacement: path.resolve(projectDir, "src/assets") },
      { find: "@util", replacement: path.resolve(projectDir, "src/ts/Util") },
      {
        find: "@components",
        replacement: path.resolve(projectDir, "src/ts/Components"),
      },
    ],
  },
});
