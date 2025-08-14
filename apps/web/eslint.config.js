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
          map: [["@web", "./src/"]],
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
              group: ["@web/components/**/_internal/**"],
              message:
                "Do not import component internals directly. Import from the package barrel instead.",
            },
          ],
        },
      ],
    },
  },
];
