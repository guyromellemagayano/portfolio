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
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-head-element": "off",
    },
  },
];
