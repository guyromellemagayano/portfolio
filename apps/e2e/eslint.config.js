import globals from "globals";

import { baseEslintConfig } from "@portfolio/config-eslint";

/** @type {import("eslint").Linter.Config} */
export default [
  ...baseEslintConfig,
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ["playwright-report/**", "test-results/**", "playwright/.auth/**"],
  },
];
