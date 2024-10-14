import { ReactNode } from 'react'

import { ApolloLink, HttpLink } from '@apollo/client'
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink
} from '@apollo/experimental-nextjs-app-support'

import { PORTFOLIO_SITE_GRAPHQL_API_URL } from '@portfolio/configs'

export const makeClient = () => {
  const httpLink = new HttpLink({
    uri: PORTFOLIO_SITE_GRAPHQL_API_URL
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true
            }),
            httpLink
          ])
        : httpLink
  })
}

export type ApolloWrapperProviderProps = {
  children: ReactNode
}

/**
 * ApolloWrapperProvider ensures that the Apollo Client is available throughout the React component tree, allowing GraphQL data fetching.
 * @param {ApolloWrapperProviderProps} props - Props containing child components.
 * @returns Returns a component wrapping its children with `ApolloProvider`.
 */
export const ApolloWrapperProvider = ({
  children
}: ApolloWrapperProviderProps) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}

ApolloWrapperProvider.displayName = 'ApolloWrapperProvider'
