import sanityStudio from "@sanity/eslint-config-studio";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginOnlyWarn from "eslint-plugin-only-warn";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

import { default as reactConfig } from "@guyromellemagayano/eslint-config/react";

/** @type {import("eslint").Linter.Config} */
export default [
  ...sanityStudio,
  ...reactConfig,
  {
    plugins: {
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      onlyWarn: eslintPluginOnlyWarn,
      "simple-import-sort": eslintPluginSimpleImportSort,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "off",
    },
    ignores: [".sanity"],
  },
];
