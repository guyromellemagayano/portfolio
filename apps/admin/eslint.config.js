import { reactEslintConfig } from "@portfolio/config-eslint/react";

/** @type {import("eslint").Linter.Config} */
export default [
  ...reactEslintConfig,
  {
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
        alias: {
          map: [["@admin", "./"]],
          extensions: [".js", ".ts", ".tsx"],
        },
      },
    },
  },
];
