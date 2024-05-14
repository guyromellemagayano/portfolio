import { CONTENTFUL_FETCH_CONFIG } from '../configs'

/**
 * Fetches data from Contentful API using GraphQL.
 * @template TData - The type of the data returned from the API.
 * @template TVariables - The type of the variables used in the query.
 * @param query - The GraphQL query string.
 * @param [variables] - The variables used in the query.
 * @param [options] - Additional options for the fetch request.
 * @returns A promise that resolves to the fetched data.
 */
export const ctfFetcher =
  <TData, TVariables extends { preview?: boolean | null }>(
    query: string,
    variables?: TVariables,
    options?: RequestInit['headers']
  ) =>
  async (): Promise<TData> => {
    const res = await fetch(CONTENTFUL_FETCH_CONFIG.endpoint as string, {
      method: 'POST',
      ...options,
      ...(variables?.preview
        ? CONTENTFUL_FETCH_CONFIG.previewParams
        : CONTENTFUL_FETCH_CONFIG.params),
      body: JSON.stringify({ query, variables })
    })

    const json = await res.json()

    if (json.errors) {
      const { message } = json.errors[0]

      throw new Error(message)
    }

    return json.data
  }
