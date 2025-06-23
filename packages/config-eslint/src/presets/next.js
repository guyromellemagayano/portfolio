import pluginNext from "@next/eslint-plugin-next";

import { reactBaseEslintConfig } from "./react-base.js";

/**
 * Shared `eslint` configuration for apps using `next`.
 * @type {import("eslint").Linter.Config}
 */
export const nextEslintConfig = [
  ...reactBaseEslintConfig,
  {
    plugins: {
      "@next/next": pluginNext,
    },
    languageOptions: {
      globals: {
        ...reactBaseEslintConfig[2].languageOptions.globals,
      },
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
];
