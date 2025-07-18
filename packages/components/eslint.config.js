import { reactEslintConfig } from "@packages/eslint-config/react";

/** @type {import("eslint").Linter.Config} */
export default [
  ...reactEslintConfig,
  {
    files: ["scripts/**/*.{js,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-console": "off",
      "no-process-exit": "off",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  {
    files: ["**/*.test.{js,ts,jsx,tsx}", "**/*.spec.{js,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        vi: "readonly",
        screen: "readonly",
        render: "readonly",
        fireEvent: "readonly",
        waitFor: "readonly",
        act: "readonly",
      },
    },
    rules: {
      "no-undef": "off",
    },
  },
  {
    settings: {
      "import/resolver": {
        alias: {
          map: [["@components", "./src", "./scripts"]],
          extensions: [".js", ".ts", ".tsx"],
        },
      },
    },
  },
];
