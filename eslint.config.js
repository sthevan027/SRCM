import js from "@eslint/js";
import tseslint from "typescript-eslint";
import solid from "eslint-plugin-solid";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { solid },
    rules: { ...solid.configs.recommended.rules },
  },
  { ignores: ["node_modules/", "dist/", ".vinxi/", "coverage/", "docs/"] },
];
