import { ReactNode } from 'react'

import { Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

import { Div } from '@guy-romelle-magayano/react-components/server'

export type ErrorBoxSharedProps = {
  className?: string
  children?: ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
  errorBoxRoot: {
    color: theme.palette.error.dark,
    border: `1px solid ${theme.palette.error.dark}`,
    padding: theme.spacing(1),
    margin: theme.spacing(12, 0)
  }
}))

/**
 * Renders the shared error box component for the `contentful` API to consume.
 * @param {ErrorBoxSharedProps} props - The properties to render the component with.
 * @returns The rendered component.
 */
const ErrorBoxShared = (props: ErrorBoxSharedProps) => {
  const { className, children } = props

  const classes = useStyles()

  return (
    children && (
      <Div className={clsx(classes.errorBoxRoot, className)}>
        <Typography variant="body1">{children}</Typography>
      </Div>
    )
  )
}

ErrorBoxShared.displayName = 'ErrorBoxShared'

export default ErrorBoxShared
