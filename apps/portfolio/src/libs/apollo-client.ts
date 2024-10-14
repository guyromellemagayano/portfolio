import { HttpLink } from '@apollo/client'
import {
  ApolloClient,
  InMemoryCache
} from '@apollo/experimental-nextjs-app-support'

import { IS_DEV, PORTFOLIO_SITE_GRAPHQL_API_URL } from '@portfolio/configs'

/**
 * Creates an Apollo Client instance for making GraphQL requests.
 * Utilizes `HttpLink` for HTTP requests to the GraphQL API; Configures
 * `InMemoryCache` for caching responses; Enables Apollo DevTools in
 * development mode.
 * @returns The configured Apollo Client instance.
 */
export const getClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: PORTFOLIO_SITE_GRAPHQL_API_URL,
      credentials: 'same-origin'
    }),
    cache: new InMemoryCache({
      addTypename: false
    }),
    connectToDevTools: IS_DEV
  })
}
