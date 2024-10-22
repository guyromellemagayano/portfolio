const { FlatCompat } = require('@eslint/eslintrc')
const baseConfig = require('../../../eslint.config.js')
const js = require('@eslint/js')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
})

module.exports = [
  ...baseConfig,
  ...compat
    .config({ extends: ['plugin:@nx/react-typescript'] })
    .map(config => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
      rules: {}
    })),
  ...compat
    .config({
      extends: ['plugin:testing-library/react'],
      env: { jest: true }
    })
    .map(config => ({
      ...config,
      files: [
        '**/__tests__/*.ts',
        '**/__tests__/*.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/*.test.ts',
        '**/*.test.tsx'
      ]
    }))
]
