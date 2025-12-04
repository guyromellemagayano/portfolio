import { baseEslintConfig } from "@guyromellemagayano/config-eslint";
import globals from "globals";
import vitestPlugin from "@vitest/eslint-plugin";

/** @type {import("eslint").Linter.Config} */
export default [
  ...baseEslintConfig,
  {
    files: [
      "**/__tests__/**/*.{js,ts,jsx,tsx}",
      "**/*.{test,spec}.{js,ts,jsx,tsx}",
    ],
    languageOptions: {
      globals: {
        ...vitestPlugin.environments.env.globals,
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "vitest/expect-expect": "error",
      "vitest/no-disabled-tests": "warn",
      "vitest/no-focused-tests": "error",
      "vitest/no-identical-title": "error",
      "vitest/no-standalone-expect": "error",
      "vitest/prefer-to-be": "error",
      "vitest/prefer-to-contain": "error",
      "vitest/prefer-to-have-length": "error",
    },
  },
];
