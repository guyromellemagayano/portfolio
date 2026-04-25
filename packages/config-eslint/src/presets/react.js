import reactHooks from "eslint-plugin-react-hooks";
import reactXPlugin from "eslint-plugin-react-x";
import globals from "globals";

import { baseEslintConfig } from "../index.js";

/**
 * Shared `eslint` configuration for apps using `react`.
 * @type {import("eslint").Linter.Config}
 */
export const reactEslintConfig = [
  ...baseEslintConfig,
  reactXPlugin.configs.recommended,
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    languageOptions: {
      ...(reactXPlugin.configs.recommended.languageOptions ?? {}),
      globals: {
        ...(reactXPlugin.configs.recommended.languageOptions?.globals ?? {}),
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-x/no-forward-ref": "off",
    },
  },
  {
    files: [
      "**/__tests__/**/*.{js,ts,jsx,tsx}",
      "**/*.{test,spec}.{js,ts,jsx,tsx}",
    ],
    rules: {
      "react-x/no-create-ref": "off",
    },
  },
];
