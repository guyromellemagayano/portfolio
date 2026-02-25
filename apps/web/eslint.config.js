import { nextEslintConfig } from "@portfolio/config-eslint/next";

const baseNoRestrictedSyntaxRule = nextEslintConfig.find(
  (config) => config?.rules?.["no-restricted-syntax"]
)?.rules?.["no-restricted-syntax"];

const noRestrictedSyntaxEntries = Array.isArray(baseNoRestrictedSyntaxRule)
  ? baseNoRestrictedSyntaxRule.slice(1)
  : [];

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextEslintConfig,
  {
    files: ["src/components/**/*.tsx"],
    ignores: ["src/components/**/__tests__/**"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...noRestrictedSyntaxEntries,
        {
          selector:
            "IfStatement[test.type='UnaryExpression'][test.operator='!'][test.argument.type='Identifier'][test.argument.name='children']",
          message:
            "Do not use `if (!children)` in components. Use an explicit renderability guard so valid values like `0` are not dropped.",
        },
      ],
    },
  },
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
