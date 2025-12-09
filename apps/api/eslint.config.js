import globals from "globals";

import { baseEslintConfig } from "@guyromellemagayano/config-eslint";

/** @type {import("eslint").Linter.Config} */
export default [
  ...baseEslintConfig,
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
        alias: {
          map: [["@api", "./"]],
          extensions: [".js", ".ts", ".tsx"],
        },
      },
    },
  },
];
