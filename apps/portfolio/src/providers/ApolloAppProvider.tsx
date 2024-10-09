'use client'

import { PropsWithChildren } from 'react'

import { ApolloLink, HttpLink } from '@apollo/client'
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink
} from '@apollo/experimental-nextjs-app-support'

import { PORTFOLIO_SITE_URL } from '@portfolio/configs'

/**
 * `makeClient` function creates an Apollo Client instance.
 *
 * - For server-side rendering (SSR), it uses the `SSRMultipartLink` to handle multipart GraphQL responses, which helps with streaming GraphQL responses during server-side rendering.
 *
 * - For client-side rendering (CSR), it uses a simple `HttpLink` for connecting to the GraphQL server.
 * @returns {ApolloClient} The configured Apollo Client instance, with support for both SSR and CSR.
 */
const makeClient = () => {
  const httpLink = new HttpLink({
    uri: PORTFOLIO_SITE_URL
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

/**
 * `ApolloWrapper` component that provides Apollo Client configuration for the Next.js app. This component wraps its children with
 * `ApolloNextAppProvider`, allowing access to Apollo Client for both
 * SSR and CSR requests. It automatically configures the Apollo Client
 * based on the environment (server or client).
 * @param {PropsWithChildren} props - The `ApolloWrapper` provider props
 * @returns The rendered `ApolloWrapper` component
 */
export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
