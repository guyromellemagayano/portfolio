import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
import onlyWarn from "eslint-plugin-only-warn";
import prettierPlugin from "eslint-plugin-prettier";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import turboPlugin from "eslint-plugin-turbo";
import unusedImports from "eslint-plugin-unused-imports";
import { createRequire } from "module";
import { dirname, resolve } from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const nodeRequire = createRequire(import.meta.url);
const prettierConfig = nodeRequire("../../../prettier.config.cjs");

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const repoRoot = resolve(dirName, "..", "..", "..");
const tsProjects = [
  resolve(repoRoot, "tsconfig.json"),
  resolve(repoRoot, "apps", "admin", "tsconfig.json"),
  resolve(repoRoot, "apps", "api", "tsconfig.json"),
  resolve(repoRoot, "apps", "web", "tsconfig.json"),
  resolve(repoRoot, "apps", "storefront", "tsconfig.json"),
  resolve(repoRoot, "packages", "ui", "tsconfig.json"),
  resolve(repoRoot, "packages", "logger", "tsconfig.json"),
  resolve(repoRoot, "packages", "components", "tsconfig.json"),
];

/**
 * Shared base `eslint` configuration for the entire monorepo.
 * @type {import("eslint").Linter.Config}
 */
export const baseEslintConfig = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      onlyWarn,
      turbo: turboPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: tsProjects,
          noWarnOnMultipleProjects: true,
        },
      },
    },
    rules: {
      "import/no-duplicates": [
        "error",
        { considerQueryString: true, "prefer-inline": true },
      ],
      "no-duplicate-imports": ["error", { includeExports: true }],
      "no-unused-vars": "off",
      "prettier/prettier": [
        "warn",
        {
          resolveConfigFile: prettierConfig,
          singleQuote: false,
          quoteProps: "as-needed",
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$", "^react-dom$", "^react\\b"],
            [
              "^node:",
              "^@(?!guyromellemagayano|packages/|admin/|api/|blog/|storefront/|studio/|web/).+",
              "^[a-z]",
            ],
            ["^@guyromellemagayano/"],
            ["^@packages/", "^~"],
            ["^@admin/"],
            ["^@api/"],
            ["^@blog/"],
            ["^@storefront/"],
            ["^@studio/"],
            ["^@web/"],
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "turbo/no-undeclared-env-vars": "warn",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
    ignores: ["dist"],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: tsProjects,
        tsconfigRootDir: repoRoot,
        warnOnMultipleProjects: false,
        sourceType: "module",
        ecmaVersion: "latest",
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
  },
];
