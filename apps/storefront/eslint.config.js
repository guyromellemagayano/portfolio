import { nextEslintConfig } from "@guyromellemagayano/config-eslint/next";

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextEslintConfig,
  {
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
        alias: {
          map: [["@storefront", "./"]],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
];
