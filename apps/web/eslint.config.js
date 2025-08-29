import { nextEslintConfig } from "@packages/eslint-config/next";

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextEslintConfig,
  {
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
        alias: {
          map: [["@web", "./src/"]],
          extensions: [".ts", ".tsx"],
        },
      },
    },
  },
  // Restrict imports of component internals outside their folders (allow inside component folders/tests)
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            // ============================================================================
            // COMPONENT INTERNAL STRUCTURE PROTECTION
            // ============================================================================

            // Disallow importing any _internal implementation across components
            {
              group: ["@web/components/**/_internal/**"],
              message:
                "Do not import component internals directly. Import from the public barrel instead (e.g., @web/components).",
            },

            // Disallow importing any client implementation folders directly
            {
              group: ["@web/components/**/client/**"],
              message:
                "Do not import client internals directly. Import the public component instead.",
            },

            // Disallow importing component-specific private files (types, CSS modules, etc.)
            {
              group: [
                "@web/components/**/*.types",
                "@web/components/**/*.types.*",
                "@web/components/**/*.module.css",
                "@web/components/**/*.client",
                "@web/components/**/*.client.*",
                "@web/components/**/*.internal",
                "@web/components/**/*.internal.*",
              ],
              message:
                "Component internals are private. Import only the public component from @web/components.",
            },
          ],
        },
      ],
    },
  },
  // Enforce relative imports within component folders
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            // ============================================================================
            // RELATIVE IMPORT ENFORCEMENT WITHIN COMPONENTS
            // ============================================================================

            // Enforce relative imports for files within the same component folder
            {
              group: [
                "@web/components/card/**",
                "@web/components/container/**",
                "@web/components/header/**",
                "@web/components/footer/**",
                "@web/components/prose/**",
                "@web/components/section/**",
                "@web/components/icon/**",
                "@web/components/articles/**",
                "@web/components/layouts/**",
              ],
              message:
                "Use relative imports (./file.ext) for files within the same component folder. Use absolute imports (@web/components) only for cross-component dependencies.",
            },
          ],
        },
      ],
    },
  },
];
