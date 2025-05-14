import pluginNext from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { baseEslintConfig } from '.';

/**
 * Shared `eslint` configuration for apps using `next`.
 * @type {import("eslint").Linter.Config}
 */
export const nextEslintConfig = [
  ...baseEslintConfig,
  {
    ...reactPlugin.configs.flat.recommended,
    plugins: {
      '@next/next': pluginNext,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
