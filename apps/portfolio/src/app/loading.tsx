import { ApolloQueryResult } from '@apollo/client'

import { Div, P } from '@react-components'

import { CommonDataQuery, getCommonDataQuery } from '@portfolio/graphql'
import { getClient } from '@portfolio/libs'

/**
 * Render the loading page
 * @returns The rendered loading page
 */
const Loading = async () => {
  const { data } = (await getClient().query({
    query: getCommonDataQuery
  })) as ApolloQueryResult<CommonDataQuery>

  if (!data) return null

  return (
    <Div className="flex min-h-full items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
      <Div className="text-center">
        <P className="text-base font-semibold">{data.common.loading}</P>
      </Div>
    </Div>
  )
}

Loading.displayName = 'Loading'

export default Loading
