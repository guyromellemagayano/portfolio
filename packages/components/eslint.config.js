import { reactEslintConfig } from "@packages/eslint-config/react";

/** @type {import("eslint").Linter.Config} */
export default [
  ...reactEslintConfig,
  {
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
          alwaysTryTypes: true,
        },
      },
    },
  },
];
