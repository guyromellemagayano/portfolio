import { resolve } from "node:path";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import sortPlugin from "eslint-plugin-simple-import-sort";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

// eslint-disable-next-line no-undef
const project = resolve(process.cwd(), "tsconfig.json");

/**
 * A shared Remix ESLint configuration for the repository.
 * @type {import("eslint").Linter.Config[]}
 * */
export default [
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    plugins: { "react-hooks": reactHooksPlugin },
    rules: { ...reactHooksPlugin.configs.recommended.rules },
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project,
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      import: importPlugin,
      "simple-import-sort": sortPlugin,
      prettier: prettierPlugin,
      turbo: turboPlugin,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": { typescript: { project } },
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$", "^react-dom$", "^react\\b"],
            ["^node:", "^[a-z]"],
            ["^@admin/"],
            ["^@api/"],
            ["^@blog/"],
            ["^@storefront/"],
            ["^@studio/"],
            ["^@guyromellemagayano/", "^~"],
            ["^@(?:[a-z0-9-]+/)"],
            ["^\\."],
          ],
        },
      ],
      "turbo/no-undeclared-env-vars": "warn",
      "import/no-default-export": "off",
    },
    ignores: ["node_modules/**", "dist/**", "**/*.css"],
  },
];
