const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')
const nxEslintPlugin = require('@nx/eslint-plugin')
const eslintPluginTestingLibrary = require('eslint-plugin-testing-library')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
})

module.exports = [
  {
    plugins: {
      '@nx': nxEslintPlugin,
      'testing-library': eslintPluginTestingLibrary
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
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
    }
  },
  ...compat.config({ extends: ['plugin:@nx/typescript'] }).map(config => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
    rules: {}
  })),
  ...compat.config({ extends: ['plugin:@nx/javascript'] }).map(config => ({
    ...config,
    files: ['**/*.js', '**/*.jsx'],
    rules: {}
  })),
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
    ignores: [
      '!.vscode/extensions.json',
      '!.vscode/launch.json',
      '!.vscode/settings.json',
      '!.vscode/tasks.json',
      '._*',
      '.apdisk',
      '.AppleDB',
      '.AppleDesktop',
      '.AppleDouble',
      '.com.apple.timemachine.donotpresent',
      '.directory',
      '.DocumentRevisions-V100',
      '.fseventsd',
      '.fuse_hidden*',
      '.LSOverride',
      '.Spotlight-V100',
      '.TemporaryItems',
      '.Trash-*',
      '.VolumeIcon.icns',
      '.vscode/*',
      '*.DS_Store',
      '*.paw',
      '*.tmlanguage.cache',
      '**/node_modules/**',
      '*~',
      'contentful.config.secret.json',
      'dist',
      'Icon',
      'Network Trash Folder',
      'Temporary Items',
      'Trashes'
    ]
  }
]
