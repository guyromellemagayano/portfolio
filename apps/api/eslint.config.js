import { baseEslintConfig } from "@packages/eslint-config";

/** @type {import("eslint").Linter.Config} */
export default [
  ...baseEslintConfig,
  {
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
