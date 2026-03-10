import { reactEslintConfig } from "@portfolio/config-eslint/react";

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
      "no-console": "off",
      "no-process-exit": "off",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        process: "readonly",
      },
    },
  },
  {
    files: [
      "**/__tests__/**/*.{js,ts,jsx,tsx}",
      "**/*.{test,spec}.{js,ts,jsx,tsx}",
    ],
    rules: {
      "no-undef": "off",
    },
  },
];
