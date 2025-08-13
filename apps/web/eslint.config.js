import { nextEslintConfig } from "@packages/eslint-config/next";

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
          map: [["@web", "./"]],
          extensions: [".ts", ".tsx"],
        },
      },
    },
  },
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@web/components/header/internal/*",
                "@web/components/footer/internal/*",
              ],
              message:
                "Do not import component internals directly. Import from the package barrel instead.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/@types/**/*.{ts,tsx}", "**/models/types.ts"],
    rules: {
      "unused-imports/no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { args: "none", varsIgnorePattern: "^_" },
      ],
    },
  },
];
