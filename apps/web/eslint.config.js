import { nextEslintConfig } from "@portfolio/config-eslint/next";

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextEslintConfig,
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
