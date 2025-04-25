import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginImport from "eslint-plugin-import";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      "simple-import-sort": eslintPluginSimpleImportSort,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "prettier/prettier": ["error", { trailingComma: "es5" }],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      "turbo/no-undeclared-env-vars": "warn",
      "import/no-default-export": "off",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**", "node_modules"],
  },
];
