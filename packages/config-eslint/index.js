import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginOnlyWarn from "eslint-plugin-only-warn";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

/**
 * A shared ESLint configuration for the repository.
 * @type {import("eslint").Linter.Config[]}
 * */
export default [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
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
      "@typescript-eslint/no-redeclare": "error",
      "prettier/prettier": "error",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$", "^react-dom$", "^react\\b"],
            [
              "^node:",
              "^@(?!admin/|api/|blog/|storefront/|studio/|guyromellemagayano/).+",
              "^[a-z]",
            ],
            ["^@guyromellemagayano/", "^~"],
            ["^@admin/"],
            ["^@api/"],
            ["^@blog/"],
            ["^@storefront/"],
            ["^@studio/"],
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/no-default-export": "off",
    },
    ignores: ["dist/**", "node_modules"],
  },
];
