/* eslint-disable simple-import-sort/imports */
import js from "@eslint/js";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import vitestPlugin from "@vitest/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
import onlyWarn from "eslint-plugin-only-warn";
import prettierPlugin from "eslint-plugin-prettier";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import turboPlugin from "eslint-plugin-turbo";
import unusedImports from "eslint-plugin-unused-imports";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

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
  {
    plugins: {
      onlyWarn,
      turbo: turboPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
      "@typescript-eslint": typescriptEslintPlugin,
      vitest: vitestPlugin,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: tsProjects,
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
        },
      },
    },
    rules: {
      "import/no-duplicates": [
        "error",
        { considerQueryString: true, "prefer-inline": true },
      ],
      "import/no-unresolved": "error",
      "no-duplicate-imports": ["error", { includeExports: true }],
      "no-unused-vars": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import/order": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$", "^react-dom$", "^react\\b"],
            [
              "^node:",
              "^@(?!guyromellemagayano|packages/|admin/|api/|storefront/|web/).+",
              "^[a-z]",
            ],
            ["^@guyromellemagayano/"],
            ["^@packages/", "^~"],
            ["^@admin/"],
            ["^@api/"],
            ["^@storefront/"],
            ["^@web/"],
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "turbo/no-undeclared-env-vars": "warn",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@web/components/*/internal",
                "@web/components/*/internal/*",
              ],
              message:
                "Do not import from another component's internal/ folder. Use the component's barrel export or relative imports within the same component.",
            },
            {
              group: ["@web/components/*/data", "@web/components/*/data/*"],
              message:
                "Do not import from another component's data/ folder. Use the component's barrel export or relative imports within the same component.",
            },
            {
              group: ["@web/components/*/types", "@web/components/*/types/*"],
              message:
                "Do not import from another component's types/ folder. Use the component's barrel export or relative imports within the same component.",
            },
            {
              group: [
                "@web/components/*/constants",
                "@web/components/*/constants/*",
              ],
              message:
                "Do not import from another component's constants/ folder. Use the component's barrel export or relative imports within the same component.",
            },
            {
              group: [
                "@web/components/*/queries",
                "@web/components/*/queries/*",
              ],
              message:
                "Do not import from another component's queries/ folder. Use the component's barrel export or relative imports within the same component.",
            },
          ],
        },
      ],
    },
    ignores: ["dist", "**/*.mdx"],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: tsProjects,
        sourceType: "module",
        ecmaVersion: "latest",
        tsconfigRootDir: repoRoot,
      },
    },
    rules: {
      "no-unused-vars": "off",
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
  {
    files: [
      "**/__tests__/**/*.{js,ts,jsx,tsx}",
      "**/*.{test,spec}.{js,ts,jsx,tsx}",
    ],
    ...vitestPlugin.configs.recommended,
    languageOptions: {
      globals: vitestPlugin.environments.env.globals,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      "no-restricted-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "import/no-extraneous-dependencies": "off",
      "vitest/no-focused-tests": "error",
      "vitest/no-disabled-tests": "warn",
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  },
  {
    files: ["**/@types/**/*.{ts,tsx}", "**/models/types.ts"],
    rules: {
      "unused-imports/no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { args: "none", varsIgnorePattern: "^_" },
      ],
    },
  },
];
