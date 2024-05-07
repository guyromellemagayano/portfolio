'use client'

import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

/**
 * Custom hook that returns the styles object for a component.
 * @returns The styles object.
 */
export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    ...theme.typography.body1,
    ...theme.typography.body2,
    ...theme.typography.h2,
    ...theme.typography.h3,
    ...theme.typography.h4,
    ...theme.typography.h5,
    ...theme.typography.h6,
    '& p': {
      ...theme.typography.body1
    },
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none'
    },
    '& li': {
      ...theme.typography.body1,
      marginBottom: theme.spacing(3)
    },
    '& strong, b': {
      fontWeight: 600
    }
  }
}))
