import vitestPlugin from "@vitest/eslint-plugin";
import globals from "globals";

import { baseEslintConfig } from "@portfolio/config-eslint";

/** @type {import("eslint").Linter.Config} */
export default [
  ...baseEslintConfig,
  {
    files: [
      "**/__tests__/**/*.{js,ts,jsx,tsx}",
      "**/*.{test,spec}.{js,ts,jsx,tsx}",
      "shared/test-setup.ts",
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
