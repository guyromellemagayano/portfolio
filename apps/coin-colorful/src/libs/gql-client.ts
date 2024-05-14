import { QueryCache } from '@tanstack/query-core'
import Router from 'next/router'

/**
 * Configuration object for the GraphQL client.
 */
export const queryConfig = {
  // The query cache instance.
  queryCache: new QueryCache({
    // Callback function to handle errors.
    // Redirects to the '/404' page when an error occurs.
    onError: () => {
      Router.push({ pathname: '/404' })
    }
  }),

  // Default options for queries.
  defaultOptions: {
    queries: {
      //  Determines whether to retry failed queries.
      retry: false,

      // Determines whether to refetch queries on component mount.
      refetchOnMount: false,

      // Determines whether to refetch queries in the background.
      refetchIntervalInBackground: false,

      // Determines whether to refetch queries when the window regains focus.
      refetchOnWindowFocus: false
    }
  }
}
