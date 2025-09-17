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
    ignores: ["src/components/**/__tests__/**", "src/components/**/test/**"],
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
              group: [
                "@web/components/**/_internal/**",
                "../components/**/_internal/**",
                "../../components/**/_internal/**",
                "../../../components/**/_internal/**",
              ],
              message:
                "🚫 COMPONENT INTERNAL VIOLATION: Do not import component internals directly. Import from the public barrel instead (e.g., @web/components).",
            },

            // Disallow importing any client implementation folders directly
            {
              group: [
                "@web/components/**/client/**",
                "../components/**/client/**",
                "../../components/**/client/**",
                "../../../components/**/client/**",
              ],
              message:
                "🚫 CLIENT INTERNAL VIOLATION: Do not import client internals directly. Import the public component instead.",
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
                "@web/components/**/_types/**",
                "@web/components/**/_data/**",
                "../components/**/*.types",
                "../components/**/*.types.*",
                "../components/**/*.module.css",
                "../components/**/*.client",
                "../components/**/*.client.*",
                "../components/**/*.internal",
                "../components/**/*.internal.*",
                "../components/**/_types/**",
                "../components/**/_data/**",
                "../../components/**/*.types",
                "../../components/**/*.types.*",
                "../../components/**/*.module.css",
                "../../components/**/*.client",
                "../../components/**/*.client.*",
                "../../components/**/*.internal",
                "../../components/**/*.internal.*",
                "../../components/**/_types/**",
                "../../components/**/_data/**",
                "../../../components/**/*.types",
                "../../../components/**/*.types.*",
                "../../../components/**/*.module.css",
                "../../../components/**/*.client",
                "../../../components/**/*.client.*",
                "../../../components/**/*.internal",
                "../../../components/**/*.internal.*",
                "../../../components/**/_types/**",
                "../../../components/**/_data/**",
              ],
              message:
                "🚫 PRIVATE FILE VIOLATION: Component internals are private. Import only the public component from @web/components.",
            },

            // Disallow importing from _types folders across components
            {
              group: [
                "@web/components/**/_types/**",
                "../components/**/_types/**",
                "../../components/**/_types/**",
                "../../../components/**/_types/**",
              ],
              message:
                "🚫 PRIVATE TYPES VIOLATION: Component types are private. Use React.ComponentProps<typeof Component> for external type access.",
            },

            // Disallow importing from specific component sub-folders
            {
              group: [
                "@web/components/card/_internal/**",
                "@web/components/container/_internal/**",
                "@web/components/header/_internal/**",
                "@web/components/footer/_internal/**",
                "@web/components/prose/_internal/**",
                "@web/components/section/_internal/**",
                "@web/components/icon/_internal/**",
                "@web/components/articles/_internal/**",
                "@web/components/layouts/_internal/**",
              ],
              message:
                "🚫 CROSS-COMPONENT INTERNAL VIOLATION: Never import from another component's _internal folder. Use the public component API instead.",
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
  // Strict export boundary enforcement within components
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            // ============================================================================
            // STRICT EXPORT BOUNDARY ENFORCEMENT
            // ============================================================================

            // Prevent importing from other component's _internal folders
            {
              group: [
                "@web/components/card/_internal/**",
                "@web/components/container/_internal/**",
                "@web/components/header/_internal/**",
                "@web/components/footer/_internal/**",
                "@web/components/prose/_internal/**",
                "@web/components/section/_internal/**",
                "@web/components/icon/_internal/**",
                "@web/components/articles/_internal/**",
                "@web/components/layouts/_internal/**",
              ],
              message:
                "🚫 CROSS-COMPONENT INTERNAL ACCESS: Components cannot access other components' internal implementations. Use the public component API instead.",
            },

            // Prevent importing from other component's _data folders
            {
              group: [
                "@web/components/card/_data/**",
                "@web/components/container/_data/**",
                "@web/components/header/_data/**",
                "@web/components/footer/_data/**",
                "@web/components/prose/_data/**",
                "@web/components/section/_data/**",
                "@web/components/icon/_data/**",
                "@web/components/articles/_data/**",
                "@web/components/layouts/_data/**",
              ],
              message:
                "🚫 CROSS-COMPONENT DATA ACCESS: Components cannot access other components' private data. Use the public component API instead.",
            },

            // Prevent importing from other component's _types folders
            {
              group: [
                "@web/components/card/_types/**",
                "@web/components/container/_types/**",
                "@web/components/header/_types/**",
                "@web/components/footer/_types/**",
                "@web/components/prose/_types/**",
                "@web/components/section/_types/**",
                "@web/components/icon/_types/**",
                "@web/components/articles/_types/**",
                "@web/components/layouts/_types/**",
              ],
              message:
                "🚫 CROSS-COMPONENT TYPES ACCESS: Components cannot access other components' private types. Use React.ComponentProps<typeof Component> for external type access.",
            },

            // Prevent importing from other component's client folders
            {
              group: [
                "@web/components/card/client/**",
                "@web/components/container/client/**",
                "@web/components/header/client/**",
                "@web/components/footer/client/**",
                "@web/components/prose/client/**",
                "@web/components/section/client/**",
                "@web/components/icon/client/**",
                "@web/components/articles/client/**",
                "@web/components/layouts/client/**",
              ],
              message:
                "🚫 CROSS-COMPONENT CLIENT ACCESS: Components cannot access other components' client implementations. Use the public component API instead.",
            },
          ],
        },
      ],
    },
  },
  // Enforce proper export patterns in index files
  {
    files: ["src/components/**/index.ts", "src/components/index.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            // ============================================================================
            // INDEX FILE EXPORT ENFORCEMENT
            // ============================================================================

            // Prevent index files from re-exporting _internal components
            {
              group: [
                "./_internal/**",
                "../_internal/**",
                "../../_internal/**",
                "../../../_internal/**",
              ],
              message:
                "🚫 INDEX EXPORT VIOLATION: Index files should not re-export _internal components. Only export the main public component.",
            },

            // Prevent index files from re-exporting _data components
            {
              group: [
                "./_data/**",
                "../_data/**",
                "../../_data/**",
                "../../../_data/**",
              ],
              message:
                "🚫 INDEX DATA EXPORT VIOLATION: Index files should not re-export _data components. Keep data exports separate from component exports.",
            },

            // Prevent index files from re-exporting _types components
            {
              group: [
                "./_types/**",
                "../_types/**",
                "../../_types/**",
                "../../../_types/**",
              ],
              message:
                "🚫 INDEX TYPES EXPORT VIOLATION: Index files should not re-export _types components. Keep type exports separate from component exports.",
            },
          ],
        },
      ],
    },
  },
];
