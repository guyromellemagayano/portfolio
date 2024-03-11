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
      ],
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true
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
  {
    ignores: [
      'contentful.config.secret.json',
      'dist',
      '*.paw',
      '*~',
      '.fuse_hidden*',
      '.directory',
      '.Trash-*',
      '*.DS_Store',
      '.AppleDouble',
      '.LSOverride',
      'Icon',
      '._*',
      '.DocumentRevisions-V100',
      '.fseventsd',
      '.Spotlight-V100',
      '.TemporaryItems',
      '.Trashes',
      '.VolumeIcon.icns',
      '.com.apple.timemachine.donotpresent',
      '.AppleDB',
      '.AppleDesktop',
      'Network Trash Folder',
      'Temporary Items',
      '.apdisk',
      '.vscode/*',
      '!.vscode/settings.json',
      '!.vscode/tasks.json',
      '!.vscode/launch.json',
      '!.vscode/extensions.json',
      '*.tmlanguage.cache',
      '*.tmPreferences.cache',
      '*.stTheme.cache',
      '*.sublime-workspace',
      'sftp-config.json',
      'Package Control.last-run',
      'Package Control.ca-list',
      'Package Control.ca-bundle',
      'Package Control.system-ca-bundle',
      'Package Control.cache/',
      'Package Control.ca-certs/',
      'bh_unicode_properties.cache',
      'GitHub.sublime-settings',
      '.idea/',
      '.idea/workspace.xml',
      '.idea/tasks.xml',
      '.idea/dictionaries',
      '.idea/vcs.xml',
      '.idea/jsLibraryMappings.xml',
      '.idea/dataSources.ids',
      '.idea/dataSources.xml',
      '.idea/dataSources.local.xml',
      '.idea/sqlDataSources.xml',
      '.idea/dynamic.xml',
      '.idea/uiDesigner.xml',
      '.idea/gradle.xml',
      '.idea/libraries',
      '.idea/mongoSettings.xml',
      '*.iws',
      'out/',
      '.idea_modules/',
      'atlassian-ide-plugin.xml',
      'com_crashlytics_export_strings.xml',
      'crashlytics.properties',
      'crashlytics-build.properties',
      'fabric.properties',
      'logs',
      '*.log',
      'npm-debug.log*',
      'pids',
      '*.pid',
      '*.seed',
      '*.pid.lock',
      'lib-cov',
      'coverage',
      '.nyc_output',
      '.grunt',
      '.lock-wscript',
      'build/Release',
      'node_modules',
      'jspm_packages',
      '.npm',
      '.node_repl_history',
      'bower_components',
      '.bower-cache',
      '.bower-registry',
      '.bower-tmp',
      'public/data/mind.json',
      'coverage/',
      '.next/',
      'build/',
      '.DS_Store',
      '*.pem',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.env*',
      '!.env.*.sample',
      '.vercel/',
      '*.tsbuildinfo',
      'next-env.d.ts',
      '.vscode/',
      'pb_data/',
      '.yarn/*',
      '!.yarn/cache/',
      '!.yarn/patches/',
      '!.yarn/plugins/',
      '!.yarn/releases/',
      '!.yarn/sdks/',
      '!.yarn/versions/',
      'analyze/',
      'public/sw.js',
      'public/sw.js.map',
      'public/workbox-*.js',
      'public/workbox-*.js.map',
      '*.bak',
      'tmp',
      'out-tsc/',
      '.project',
      '.classpath',
      '.c9/',
      '*.launch',
      '.settings/',
      '.sass-cache',
      'connect.lock',
      'libpeerconnection.log',
      'testem.log',
      'typings/',
      'Thumbs.db',
      '.nx/cache',
      'apps/*-server-*/',
      '.next',
      '.sentryclirc'
    ]
  }
]
