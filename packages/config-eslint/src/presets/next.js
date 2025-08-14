import pluginNext from "@next/eslint-plugin-next";

import { reactBaseEslintConfig } from "./react-base.js";

/**
 * Shared `eslint` configuration for apps using `next`.
 * @type {import("eslint").Linter.Config}
 */
export const nextEslintConfig = [
  ...reactBaseEslintConfig,
  {
    plugins: {
      "@next/next": pluginNext,
    },
    languageOptions: {
      globals: {
        ...reactBaseEslintConfig[reactBaseEslintConfig.length - 1]
          .languageOptions.globals,
      },
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-head-element": "off",
    },
  },
  {
    files: [
      "**/src/components/**/**.client.{ts,tsx}",
      "**/src/components/**/_internal/client/**/*.{ts,tsx}",
    ],
    rules: {
      // Clients can import whatever; app-level config may still restrict internals by alias
      "no-restricted-imports": "off",
    },
  },
  {
    files: [
      "**/src/components/**/[A-Z]*.tsx",
      "**/src/components/**/_internal/server/**/*.{ts,tsx}",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/navigation",
              message:
                "Client-only API in a server component. Move code to _internal/client/* or mark the file 'use client'.",
            },
            {
              name: "next-themes",
              message:
                "Client-only API in a server component. Move code to _internal/client/* or mark the file 'use client'.",
            },
            {
              name: "@headlessui/react",
              message:
                "Client-only UI in a server component. Move code to _internal/client/* or mark the file 'use client'.",
            },
          ],
          patterns: [
            {
              group: ["**/_internal/client/*", "**/*.client.{ts,tsx}"],
              message:
                "Do not import client internals into server modules. Render a client leaf instead.",
            },
          ],
        },
      ],
    },
  },
];
