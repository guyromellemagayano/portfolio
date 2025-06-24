import { reactEslintConfig } from "@packages/eslint-config";

/** @type {import("eslint").Linter.Config} */
export default [
  ...reactEslintConfig,
  {
    settings: {
      "import/resolver": {
        alias: {
          map: [["@admin", "./"]],
          extensions: [".js", ".ts", ".tsx"],
        },
      },
    },
  },
];
