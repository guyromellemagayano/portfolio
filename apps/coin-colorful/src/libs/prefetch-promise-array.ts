import { prefetchMap } from '../libs/prefetch-mappings'

export type PrefetchPromiseArrProps = {
  inputArr: any[]
  queryClient: any
  locale: string
}

/**
 * Create an array of prefetchQuery functions that can be awaited in our pages to prefetch React Query calls
 * @param inputArr - An array of Contentful items
 * @param queryClient - The React Query queryClient
 * @param locale - The current locale
 * @returns An array of prefetchQuery functions
 */
export const prefetchPromiseArr = ({
  inputArr,
  queryClient,
  locale
}: PrefetchPromiseArrProps) =>
  inputArr?.map(item => {
    if (!item) return

    const { __typename, sys } = item

    if (!__typename) return

    const query = prefetchMap?.[__typename]

    if (!query) return

    return queryClient.prefetchQuery(
      query.getKey({ id: sys.id, locale, preview: false }),
      query.fetcher({ id: sys.id, locale, preview: false })
    )
  }) || []
