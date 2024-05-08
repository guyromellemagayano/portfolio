import { ReactNode } from 'react'

import { Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

import { Div } from '@guy-romelle-magayano/react-components/server'

export type ErrorBoxProps = {
  className?: string
  children?: ReactNode
}

// Styles for the ErrorBox component.
const useStyles = makeStyles((theme: Theme) => ({
  errorBoxRoot: {
    color: theme.palette.error.dark,
    border: `1px solid ${theme.palette.error.dark}`,
    padding: theme.spacing(1),
    margin: theme.spacing(12, 0)
  }
}))

/**
 * Renders an error box component.
 * @param className - The CSS class name for the error box.
 * @param children - The content to be displayed inside the error box.
 * @returns The rendered error box component.
 */
const ErrorBox = ({ className, children }: ErrorBoxProps) => {
  const classes = useStyles()

  return (
    <Div className={clsx(classes.errorBoxRoot, className)}>
      <Typography variant="body1">{children}</Typography>
    </Div>
  )
}

ErrorBox.displayName = 'ErrorBox'

export default ErrorBox
