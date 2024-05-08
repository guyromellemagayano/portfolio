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

import { isArrayType, isEmpty } from '@guy-romelle-magayano/react-utils'

import { tryGet } from '@guy-romelle-magayano/coin-colorful/libs'

// TODO: add other errors than only `NetworkError`

export type GraphqlErrorProps = {
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
 * Renders a component to display GraphQL errors.
 * @param error - The GraphQL error object.
 * @returns The rendered component.
 */
const GraphqlError = ({ error }: GraphqlErrorProps) => {
  console.error({ error })

  const theme = useTheme<Theme>()

  const networkErrors = useMemo(
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

      {!isEmpty(networkErrors) && isArrayType(networkErrors) && (
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

      {!isEmpty(error.graphQLErrors) && isArrayType(error.graphQLErrors) && (
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

GraphqlError.displayName = 'GraphqlError'

export default GraphqlError
