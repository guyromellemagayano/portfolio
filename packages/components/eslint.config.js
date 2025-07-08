import { FlatCompat } from "@eslint/js";
import { reactEslintConfig } from "@packages/eslint-config/react";

const compat = new FlatCompat();

/** @type {import("eslint").Linter.Config} */
export default [
  ...reactEslintConfig,
  {
    files: ["scripts/**/*.{js,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // Node.js specific rules for scripts
      "no-console": "off", // Scripts often need console output
      "no-process-exit": "off", // Scripts may need to exit
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  {
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
          alwaysTryTypes: true,
        },
      },
    },
  },
];
