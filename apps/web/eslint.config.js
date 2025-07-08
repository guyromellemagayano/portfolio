import { nextEslintConfig } from "@packages/eslint-config/next";

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextEslintConfig,
  {
    settings: {
      "import/resolver": {
        alias: {
          map: [["@web", "./"]],
          extensions: [".js", ".ts", ".tsx"],
        },
      },
    },
  },
];
