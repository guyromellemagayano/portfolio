import { reactEslintConfig } from "@portfolio/config-eslint/react";

const baseNoRestrictedSyntaxRule = reactEslintConfig.find(
  (config) => config?.rules?.["no-restricted-syntax"]
)?.rules?.["no-restricted-syntax"];

const noRestrictedSyntaxEntries = Array.isArray(baseNoRestrictedSyntaxRule)
  ? baseNoRestrictedSyntaxRule.slice(1)
  : [];

/** @type {import("eslint").Linter.Config} */
export default [
  ...reactEslintConfig,
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
        {
          selector:
            "CallExpression[callee.type='MemberExpression'][callee.object.name='React'][callee.property.name='forwardRef']",
          message:
            "`apps/web` components use React 19 refs through props. Do not add `React.forwardRef` here.",
        },
        {
          selector: "CallExpression[callee.name='forwardRef']",
          message:
            "`apps/web` components use React 19 refs through props. Do not add `forwardRef` here.",
        },
      ],
    },
  },
];
