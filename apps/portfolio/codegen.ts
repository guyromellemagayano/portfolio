import type { CodegenConfig } from '@graphql-codegen/cli'

import { ctfConfig } from './src/configs'

export const config: CodegenConfig = {
  schema: [
    {
      [ctfConfig.endpoint]: ctfConfig.params
    }
  ],
  overwrite: true,
  ignoreNoDocuments: true,
  require: ['dotenv/config', 'ts-node/register', 'tsconfig-paths/register'],
  generates: {
    'apps/portfolio/src/libs/__generated/graphql.schema.json': {
      plugins: ['introspection']
    },
    'apps/portfolio/src/libs/__generated/graphql.schema.graphql': {
      plugins: ['schema-ast']
    },
    'apps/portfolio/src/libs/__generated/graphql.types.ts': {
      plugins: ['typescript', 'typescript-operations'],
      documents: ['apps/portfolio/src/**/*.graphql']
    },
    'apps/portfolio/src/': {
      documents: ['apps/portfolio/src/**/*.graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'libs/__generated/graphql.types.ts',
        folder: '__generated'
      },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        exposeQueryKeys: true,
        exposeFetcher: true,
        rawRequest: false,
        inlineFragmentTypes: 'combine',
        skipTypename: false,
        exportFragmentSpreadSubTypes: true,
        dedupeFragments: true,
        preResolveTypes: true,
        withHooks: true,
        fetcher: 'apps/portfolio/src/libs/contentful.ts#ctfFetcher'
      }
    }
  }
}

export default config
