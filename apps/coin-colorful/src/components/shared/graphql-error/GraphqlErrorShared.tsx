import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useMemo
} from 'react'

import { Box, Theme, Typography } from '@mui/material'
import { useTheme } from '@mui/styles'

import { tryGet } from '@guy-romelle-magayano/coin-colorful/libs'

// TODO: add other errors than only `NetworkError`

export type GraphqlErrorSharedProps = {
  error: {
    message: string
    graphQLErrors: {
      message: string
      path: any[]
    }[]
    networkError: {
      result: {
        errors: {
          message: string
        }[]
      }
    }
  }
}

/**
 * Renders the shared GraphQL error component for the `contentful` API to consume.
 * @param {GraphqlErrorSharedProps} props - The properties to render the component with.
 * @returns The rendered component.
 */
const SharedGraphqlError = (props: GraphqlErrorSharedProps) => {
  const { error } = props

  console.error({ error })

  const theme = useTheme<Theme>(),
    networkErrors = useMemo(
      () => tryGet(() => error.networkError.result.errors),
      [error]
    )

  return (
    <Box
      p={4}
      color={theme.palette.error.main}
      border={1}
      borderColor={theme.palette.error.main}
    >
      <Typography variant="h3">{error.message}</Typography>

      {networkErrors && networkErrors?.length > 0 && (
        <Box my={4}>
          <Typography variant="h4">Network Errors</Typography>

          {networkErrors.map(
            (
              err: {
                message:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined
              },
              i: Key | null | undefined
            ) => (
              <Typography variant="body1" key={i}>
                {err.message}
              </Typography>
            )
          )}
        </Box>
      )}

      {error?.graphQLErrors && error?.graphQLErrors?.length > 0 && (
        <Box my={4}>
          <Typography variant="h4">GraphQl Errors</Typography>

          {error.graphQLErrors.map(
            (
              err: {
                message:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined
                path: any[]
              },
              i: Key | null | undefined
            ) => (
              <Box my={4} key={i}>
                <Typography>{err.message}</Typography>
                <Typography>{`path: ${err.path.join('/')}`}</Typography>
              </Box>
            )
          )}
        </Box>
      )}
    </Box>
  )
}

SharedGraphqlError.displayName = 'SharedGraphqlError'

export default SharedGraphqlError
