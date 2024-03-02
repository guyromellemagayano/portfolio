const { FlatCompat } = require('@eslint/eslintrc')
const baseConfig = require('../../eslint.config.js')
const js = require('@eslint/js')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
})

module.exports = [
  ...baseConfig,
  ...compat.extends('plugin:@nx/react-typescript'),
  ...compat
    .config({
      extends: ['plugin:testing-library/react'],
      env: { jest: true }
    })
    .map(config => ({
      ...config,
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
    })),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {}
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {}
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {}
  }
]
