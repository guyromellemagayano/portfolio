import { reactEslintConfig } from "@packages/eslint-config/react";

/** @type {import("eslint").Linter.Config} */
export default [
  ...reactEslintConfig,
  {
    settings: {
      "import/resolver": {
        alias: {
          map: [["@components", "./"]],
          extensions: [".js", ".ts", ".tsx"],
        },
      },
    },
  },
];
