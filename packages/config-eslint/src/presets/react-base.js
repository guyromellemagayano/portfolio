import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

import { baseEslintConfig } from "../index.js";

/**
 * Shared base `eslint` configuration for React-based apps.
 * @type {import("eslint").Linter.Config}
 */
export const reactBaseEslintConfig = [
  ...baseEslintConfig,
  reactPlugin.configs.flat.recommended,
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
      },
    },
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];
