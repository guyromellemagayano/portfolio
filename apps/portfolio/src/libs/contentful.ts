import { withFetch } from '@react-libs'

import { ctfConfig } from '@portfolio/configs'

/**
 * Fetches data from the Contentful GraphQL API.
 * @template TData - The expected shape of the returned data.
 * @template TVariables - The expected shape of the query variables. It extends to support an optional `preview` parameter.
 * @param query - The GraphQL query string to send to Contentful.
 * @param variables - Optional variables for the GraphQL query. Includes a `preview` option to determine whether the request should be made to the preview API.
 * @param options - Optional request headers for the fetch request (e.g., authorization).
 * @returns Returns a function that, when invoked, returns a promise resolving to the fetched Contentful data in the shape of `TData`.
 */
export const ctfFetcher = async <
  TData,
  TVariables extends { preview?: boolean | null }
>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers']
): Promise<TData> => {
  const { data } = await withFetch(ctfConfig.endpoint, {
    method: 'POST',
    ...options,
    ...(variables?.preview ? ctfConfig.previewParams : ctfConfig.params),
    body: JSON.stringify({ query, variables })
  })

  return data
}
