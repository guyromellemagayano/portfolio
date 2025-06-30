import sanityStudio from "@sanity/eslint-config-studio";

import { baseEslintConfig } from "@packages/eslint-config";

/** @type {import("eslint").Linter.Config} */
export default [
  // Apply Sanity config first, but disable conflicting import sorting rules
  ...sanityStudio.map((config) => ({
    ...config,
    rules: {
      ...config.rules,
      // Disable any conflicting import sorting rules from Sanity
      "sort-imports": "off",
      "import/order": "off",
    },
  })),
  // Apply our base config which includes import sorting
  ...baseEslintConfig,
  // Studio-specific overrides (this will be applied last, taking precedence)
  {
    settings: {
      "import/resolver": {
        alias: {
          map: [["@studio", "./"]],
          extensions: [".js", ".ts", ".tsx"],
        },
      },
    },
    rules: {
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
      "sort-imports": "off",
      "import/order": "off",
    },
    ignores: [".sanity", "dist", "**/*.mjs", "**/vendor/**"],
  },
];
