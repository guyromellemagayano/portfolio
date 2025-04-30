import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginOnlyWarn from "eslint-plugin-only-warn";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

import js from "@eslint/js";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      onlyWarn: eslintPluginOnlyWarn,
      "simple-import-sort": eslintPluginSimpleImportSort,
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "prettier/prettier": "error",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
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
            ["^@(?:[a-z0-9-]+/)", "^~"],
            ["^src/"],
            ["^\\."],
          ],
        },
      ],
      "turbo/no-undeclared-env-vars": "warn",
      "import/no-default-export": "off",
    },
    ignores: ["dist/**", "node_modules"],
  },
];

export default config;
