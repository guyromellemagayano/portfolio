import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import vitestPlugin from "@vitest/eslint-plugin";
import astroParser from "astro-eslint-parser";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import astroPlugin from "eslint-plugin-astro";
import nPlugin from "eslint-plugin-n";
import prettierPlugin from "eslint-plugin-prettier";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import testingLibrary from "eslint-plugin-testing-library";
import turboPlugin from "eslint-plugin-turbo";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const repoRoot = resolve(dirName, "..", "..", "..");
const tsProjects = [
  resolve(repoRoot, "tsconfig.json"),
  resolve(repoRoot, "apps", "e2e", "tsconfig.json"),
  resolve(repoRoot, "apps", "web", "tsconfig.json"),
  resolve(repoRoot, "packages", "components", "tsconfig.json"),
  resolve(repoRoot, "packages", "hooks", "tsconfig.json"),
  resolve(repoRoot, "packages", "logger", "tsconfig.json"),
  resolve(repoRoot, "packages", "ui", "tsconfig.json"),
  resolve(repoRoot, "packages", "utils", "tsconfig.json"),
  resolve(repoRoot, "packages", "vitest-presets", "tsconfig.json"),
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
      turbo: turboPlugin,
      prettier: prettierPlugin,
      n: nPlugin,
      astro: astroPlugin,
      "@typescript-eslint": typescriptEslintPlugin,
      vitest: vitestPlugin,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      "testing-library": testingLibrary,
    },
    rules: {
      "no-duplicate-imports": ["error", { allowSeparateTypeImports: true }],
      "no-console": "error",
      "no-unused-vars": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$", "^react-dom$", "^react\\b"],
            ["^node:", "^@(?!portfolio|packages/|web/).+", "^[a-z]"],
            ["^@portfolio/", "^~"],
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
            {
              group: [
                "morgan",
                "winston",
                "pino",
                "bunyan",
                "log4js",
                "npmlog",
                "consola",
                "signale",
                "debug",
              ],
              message:
                "Use @portfolio/logger for application logging. Third-party logger packages are restricted in this monorepo.",
            },
          ],
        },
      ],
    },
    ignores: [
      "dist/**",
      "**/dist/**",
      "**/coverage/**",
      "**/.turbo/**",
      "**/.pnpm-store/**",
      "**/.npm-cache/**",
      "**/*.mdx",
    ],
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: astroParser,
      parserOptions: {
        parser: typescriptParser,
        project: tsProjects,
        sourceType: "module",
        ecmaVersion: "latest",
        extraFileExtensions: [".astro"],
        tsconfigRootDir: repoRoot,
      },
    },
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportDeclaration[importKind='type']",
          message:
            'Use inline type import specifiers instead: `import { type Foo } from "module"`.',
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
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
      "no-undef": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportDeclaration[importKind='type']",
          message:
            'Use inline type import specifiers instead: `import { type Foo } from "module"`.',
        },
      ],
    },
  },
  {
    files: ["packages/logger/src/**/*.{js,cjs,mjs,ts,cts,mts,tsx,jsx}"],
    rules: {
      "no-console": "off",
    },
  },
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    rules: {
      "n/no-missing-import": [
        "error",
        {
          tryExtensions: [
            ".js",
            ".cjs",
            ".mjs",
            ".ts",
            ".tsx",
            ".d.ts",
            ".json",
          ],
        },
      ],
    },
  },
  {
    files: [
      "**/*.config.{js,cjs,mjs,ts,cts,mts}",
      "**/eslint.config.{js,cjs,mjs}",
      "**/astro.config.{js,cjs,mjs,ts}",
      "commitlint.config.{js,cjs,mjs}",
      "prettier.config.{js,cjs,mjs}",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["**/src/bin/**/*.{js,cjs,mjs,ts,cts,mts}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
  {
    files: [
      "**/__tests__/**/*.{js,ts,jsx,tsx}",
      "**/*.{test,spec}.{js,ts,jsx,tsx}",
    ],
    ...vitestPlugin.configs.recommended,
  },
  {
    files: [
      "**/__tests__/**/*.{js,ts,jsx,tsx}",
      "**/*.{test,spec}.{js,ts,jsx,tsx}",
    ],
    languageOptions: {
      globals: {
        ...vitestPlugin.environments.env.globals,
        performance: "readonly",
        process: "readonly",
      },
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      "no-console": "off",
      "no-restricted-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "vitest/no-focused-tests": "error",
      "vitest/no-disabled-tests": "warn",
      "testing-library/await-async-queries": "error",
      "testing-library/no-await-sync-queries": "error",
      "testing-library/no-debugging-utils": "warn",
      "testing-library/no-dom-import": ["error", "react"],
      "testing-library/no-unnecessary-act": "warn",
      "testing-library/prefer-find-by": "warn",
      "testing-library/prefer-screen-queries": "warn",
      "testing-library/render-result-naming-convention": "warn",
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  },
  {
    files: ["**/test-setup.{js,cjs,mjs,ts,cts,mts,tsx,jsx}"],
    languageOptions: {
      globals: {
        global: "readonly",
      },
    },
    rules: {
      "no-console": "off",
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
