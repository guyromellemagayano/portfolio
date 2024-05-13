import type { InspectorModeTags } from '@contentful/live-preview/dist/inspectorMode/types'
import { Theme, Typography, TypographyProps } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

import { Div } from '@guy-romelle-magayano/react-components/server'

import { MarkdownFeature } from '@guy-romelle-magayano/coin-colorful/components'

const useStyles = makeStyles((theme: Theme) => ({
  containerCentered: {
    textAlign: 'center'
  },
  headline: {
    fontSize: '2.25rem',
    fontWeight: 600,
    lineHeight: 1.083
  },
  subline: {
    fontWeight: 400,
    lineHeight: 1.56,
    marginTop: theme.spacing(6),
    fontSize: '1.8rem',
    color: '#414D63'
  },

  text: {
    '& p': {
      fontSize: '2.5rem',
      lineHeight: 1.52
    }
  }
}))

export type SectionHeadlinesFeatureProps = {
  headline?: string | null
  headlineProps?: TypographyProps
  headlineLivePreviewProps?: InspectorModeTags
  subline?: string | null
  sublineProps?: TypographyProps
  sublineLivePreviewProps?: InspectorModeTags
  body?: string | null
  align?: 'center' | 'left'
  className?: string
}

/**
 * Renders a section headlines feature component.
 * @param {SectionHeadlinesFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const SectionHeadlinesFeature = (props: SectionHeadlinesFeatureProps) => {
  const {
    headline,
    headlineProps = {},
    headlineLivePreviewProps = {},
    subline,
    sublineProps = {},
    sublineLivePreviewProps = {},
    body,
    align = 'center',
    className = ''
  } = props

  const classes = useStyles()

  const computedHeadlineProps: TypographyProps = {
      variant: 'h1',
      component: 'h2',
      ...headlineProps,
      ...headlineLivePreviewProps,
      className: clsx(headlineProps.className, classes.headline)
    },
    computedSublineProps: TypographyProps = {
      variant: 'h3',
      ...sublineProps,
      ...sublineLivePreviewProps,
      className: clsx(sublineProps.className, classes.subline)
    }

  if (!headline && !subline && !body) {
    return null
  }

  return (
    <Div
      className={clsx(
        align === 'center' ? classes.containerCentered : null,
        className
      )}
    >
      {headline && headline?.length > 0 && (
        <Typography {...computedHeadlineProps}>{headline}</Typography>
      )}

      {subline && subline?.length > 0 && (
        <Typography {...computedSublineProps}>{subline}</Typography>
      )}

      {body && body?.length > 0 && (
        <MarkdownFeature text={body} className={classes.text} />
      )}
    </Div>
  )
}

SectionHeadlinesFeature.displayName = 'SectionHeadlinesFeature'

export default SectionHeadlinesFeature
