import type { CodegenConfig } from '@graphql-codegen/cli'

import { ctfConfig } from '@portfolio/configs'

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: [
    {
      [ctfConfig.endpoint]: ctfConfig.params
    }
  ],
  generates: {
    './src/libs/__generated/graphql.schema.json': {
      plugins: ['introspection']
    },
    './src/libs/__generated/graphql.schema.graphql': {
      plugins: ['schema-ast']
    },
    './src/libs/__generated/graphql.types.ts': {
      plugins: ['typescript', 'typescript-operations'],
      documents: ['./src/**/*.graphql']
    },
    './src/': {
      documents: ['./src/**/*.graphql'],
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
        fetcher: './src/libs#ctfFetcher'
      }
    }
  }
}

export default config
