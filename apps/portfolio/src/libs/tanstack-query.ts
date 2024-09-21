import { isServer, QueryCache, QueryClient } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

export const queryCacheConfig = {
  onError: () => {
    notFound() // Navigate to a "not found" page on query error
  }
}

// Tanstack Query config
export const tqConfig = {
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 // Cache queries for 1 minute
    }
  }
}

/**
 * Creates and returns a new instance of the `QueryClient` with the specified configuration.
 * This `QueryClient` is responsible for managing the lifecycle of Tanstack queries.
 * @returns {QueryClient} A new instance of `QueryClient` configured with `tqConfig`.
 */
export const makeQueryClient = (): QueryClient => {
  return new QueryClient(tqConfig)
}

/**
 * Retrieves the `QueryClient` instance. If the function is executed on the server, a new
 * `QueryClient` instance is created. For the browser, it returns a singleton instance to
 * avoid creating multiple `QueryClient`s.
 * @returns {QueryClient} An instance of `QueryClient`, either new (on server) or singleton (on browser).
 */
export const getQueryClient = (): QueryClient => {
  if (isServer) {
    return makeQueryClient() // Create a new QueryClient on the server.
  } else {
    let browserQueryClient: QueryClient | undefined = undefined

    // If `browserQueryClient` is not already initialized, create a new one.
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient // Return the singleton instance on the browser.
  }
}
