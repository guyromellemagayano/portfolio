import type { CodegenConfig } from '@graphql-codegen/cli'

const PORTFOLIO_SITE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.PORTFOLIO_SITE_URL
    : 'http://localhost:3000'
const PORTFOLIO_SITE_GRAPHQL_API_URL = `${PORTFOLIO_SITE_URL}/api/graphql`

const config: CodegenConfig = {
  config: {
    skipTypename: true
  },
  overwrite: true,
  schema: PORTFOLIO_SITE_GRAPHQL_API_URL,
  documents: 'apps/portfolio/src/graphql/**/*.ts',
  generates: {
    'apps/portfolio/src/graphql/__generated__/': {
      preset: 'client',
      plugins: []
    }
  }
}

export default config
