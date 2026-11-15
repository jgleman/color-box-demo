import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    // typescript-eslint sets sourceType "module" globally; restore CommonJS for .cjs configs.
    files: ["**/*.cjs"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    // prism.js is a vendored, minified third-party bundle.
    ignores: ["dist/**", "node_modules/**", "public/prism.js"],
  },
];
