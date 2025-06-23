import sanityStudio from "@sanity/eslint-config-studio";

import { baseEslintConfig } from "@packages/eslint-config";

/** @type {import("eslint").Linter.Config} */
export default [
  ...sanityStudio,
  ...baseEslintConfig,
  {
    settings: {
      "import/resolver": {
        alias: {
          map: [["@studio", "./"]],
          extensions: [".js", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      "turbo/no-undeclared-env-vars": "off",
    },
    ignores: [".sanity"],
  },
];
