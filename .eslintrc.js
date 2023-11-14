module.exports = {
  root: true,
  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['**/*.ts?(x)']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
    requireConfigFile: true,
    warnOnUnsupportedTypeScriptVersion: true
  },
  plugins: [
    '@nx',
    'react',
    'jsx-a11y',
    'prettier',
    'testing-library',
    'jest',
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:jest/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:testing-library/react',
    'prettier'
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_|req|res|next|err|ctx|args|context|info'
      }
    ],
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'prettier/prettier': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/default': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after'
          },
          {
            pattern: 'types/**',
            group: 'external',
            position: 'after'
          }
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false
        }
      }
    ],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'warn',
    '@nx/enforce-module-boundaries': [
      'error',
      {
        enforceBuildableLibDependency: true,
        allow: [],
        depConstraints: [
          {
            sourceTag: '*',
            onlyDependOnLibsWithTags: ['*']
          }
        ]
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.ts?(x)', '*.js', '*.jsx'],
      parser: '@typescript-eslint/parser'
    },
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react']
    }
  ]
}
