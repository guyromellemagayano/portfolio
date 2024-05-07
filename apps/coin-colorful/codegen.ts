import { CodegenConfig } from '@graphql-codegen/cli'

import { CONTENTFUL_FETCH_CONFIG } from './src/configs'

// Configuration object for code generation.
export const config: CodegenConfig = {
  /**
   * Whether to overwrite existing generated files.
   */
  overwrite: true,

  /**
   * Whether to ignore documents that have no operations or fragments.
   */
  ignoreNoDocuments: true,

  /**
   * The schema configuration.
   */
  schema: [
    {
      /**
       * The endpoint for fetching the schema.
       */
      [CONTENTFUL_FETCH_CONFIG.endpoint]: CONTENTFUL_FETCH_CONFIG.params
    }
  ],

  /**
   * The generated files configuration.
   */
  generates: {
    './src/libs/__generated/graphql.schema.json': {
      /**
       * The plugins to use for generating the file.
       */
      plugins: ['introspection']
    },
    './src/libs/__generated/graphql.schema.graphql': {
      /**
       * The plugins to use for generating the file.
       */
      plugins: ['schema-ast']
    },
    './src/libs/__generated/graphql.types.ts': {
      /**
       * The plugins to use for generating the file.
       */
      plugins: ['typescript', 'typescript-operations'],

      /**
       * The GraphQL documents to process.
       */
      documents: ['./src/**/*.graphql']
    },
    './src/': {
      /**
       * The GraphQL documents to process.
       */
      documents: ['./src/**/*.graphql'],

      /**
       * The preset to use for generating the files.
       */
      preset: 'near-operation-file',

      /**
       * The configuration for the preset.
       */
      presetConfig: {
        /**
         * The file extension for the generated files.
         */
        extension: '.generated.ts',

        /**
         * The path to the base types file.
         */
        baseTypesPath: 'libs/__generated/graphql.types.ts',

        /**
         * The folder to place the generated files in.
         */
        folder: '__generated'
      },

      /**
       * The plugins to use for generating the files.
       */
      plugins: ['typescript-operations', 'typescript-react-query'],

      /**
       * Additional configuration options.
       */
      config: {
        /**
         * Whether to expose query keys.
         */
        exposeQueryKeys: true,

        /**
         * Whether to expose the fetcher function.
         */
        exposeFetcher: true,

        /**
         * Whether to use raw request instead of generated hooks.
         */
        rawRequest: false,

        /**
         * How to handle inline fragment types.
         */
        inlineFragmentTypes: 'combine',

        /**
         * Whether to skip adding "__typename" field to generated types.
         */
        skipTypename: false,

        /**
         * Whether to export fragment spread sub-types.
         */
        exportFragmentSpreadSubTypes: true,

        /**
         * Whether to deduplicate fragments.
         */
        dedupeFragments: true,

        /**
         * Whether to pre-resolve types.
         */
        preResolveTypes: true,

        /**
         * Whether to generate React Query hooks.
         */
        withHooks: true,

        /**
         * The path to the fetcher function.
         */
        fetcher: './src/libs/contentful.ts#ctfFetcher'
      }
    }
  }
}

export default config
