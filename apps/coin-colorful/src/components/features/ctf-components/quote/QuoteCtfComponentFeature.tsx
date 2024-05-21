'use client'

import { useMemo } from 'react'

import { useContentfulInspectorMode } from '@contentful/live-preview/react'
import { Container, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  RichtextCtfComponentFeature,
  type QuoteFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import {
  LayoutContext,
  layoutContextValues
} from '@guy-romelle-magayano/coin-colorful/contexts'
import { getColorConfigFromPalette } from '@guy-romelle-magayano/coin-colorful/theme'

const useStyles = makeStyles((theme: Theme) => ({
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: (props: QuoteFieldsFragment) =>
      !props.image ? '93.4rem' : '126rem',
    padding: theme.spacing(19, 0, 19),
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  },
  innerBody: {
    order: 2,
    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: 'calc(50% - 2.5rem)'
    },

    '& p': {
      fontSize: '1.563rem',
      fontWeight: 400
    },

    '& blockquote': {
      borderLeftWidth: 0,
      fontStyle: 'normal',
      paddingLeft: 0,
      color: (props: QuoteFieldsFragment) => {
        const colorConfig = getColorConfigFromPalette(props.colorPalette || '')

        return colorConfig.headlineColor
      },
      '& .MuiContainer-root': {
        paddingLeft: 0,
        paddingRight: 0
      },
      '& p': {
        fontSize: '2.8rem',
        fontWeight: 300,
        lineHeight: 1.314,
        color: '#414D63'
      }
    },

    '& figure': {
      display: 'inline-block',
      marginBottom: theme.spacing(6),
      maxWidth: '24rem'
    }
  },
  innerBodyFull: {
    flexShrink: 0,
    width: '100%'
  },
  'innerBody-imageLeft': {
    [theme.breakpoints.up('md')]: {
      order: 2
    }
  },
  'innerBody-imageRight': {
    [theme.breakpoints.up('md')]: {
      order: 0
    }
  },
  imageContainer: {
    maxWidth: '60rem',
    order: 1,
    width: '100%',

    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
      width: 'calc(50% - 2.5rem)'
    }
  },
  imageFixed: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    marginBottom: theme.spacing(7),
    borderRadius: '16px',
    boxShadow: `0px 0px 0px 1px rgba(25, 37, 50, 0.1),
    0px -6px 16px -6px rgba(25, 37, 50, 0.03),
    0px 8px 16px -8px rgba(25, 37, 50, 0.2),
    0px 13px 27px -5px rgba(25, 37, 50, 0.15)`,

    [theme.breakpoints.up('md')]: {
      marginBottom: 0
    },

    '&::before': {
      content: '""',
      display: 'block',
      paddingTop: '83.333%'
    }
  }
}))

export type QuoteCtfComponentFeatureProps = QuoteFieldsFragment

/**
 * Renders the quote feature component for the `contentful` API to consume.
 * @param {QuoteCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const QuoteCtfComponentFeature = (props: QuoteCtfComponentFeatureProps) => {
  const {
    imagePosition,
    image,
    quote,
    colorPalette,
    quoteAlignment: quoteAlignmentBoolean,
    sys: { id }
  } = props

  const colorConfig = getColorConfigFromPalette(
    colorPalette && colorPalette?.length > 0 ? colorPalette : ''
  )

  const containerLayout = imagePosition ? 'imageLeft' : 'imageRight',
    quoteAlignment = quoteAlignmentBoolean ? 'center' : 'left'

  const backgroundImage = useMemo(
      () =>
        image?.url && image?.url?.length > 0
          ? `${image.url}?w=${600 * 2}`
          : undefined,
      [image]
    ),
    classes = useStyles(props),
    inspectorMode = useContentfulInspectorMode({ entryId: id })

  return (
    <LayoutContext.Provider value={{ ...layoutContextValues, parent: 'quote' }}>
      <Container
        maxWidth={false}
        style={{
          backgroundColor: colorConfig.backgroundColor
        }}
      >
        <Div className={classes.innerContainer}>
          <Div
            className={clsx(
              classes.innerBody,
              classes[`innerBody-${containerLayout}`],
              backgroundImage ? undefined : classes.innerBodyFull
            )}
          >
            {quote && Object.keys(quote)?.length > 0 && (
              <Div
                {...inspectorMode({
                  fieldId: 'quote',
                  manuallyTagged: undefined
                })}
                style={{
                  color: colorConfig.textColor,
                  textAlign: quoteAlignment
                }}
              >
                <RichtextCtfComponentFeature {...quote} />
              </Div>
            )}
          </Div>
          <Div
            className={classes.imageContainer}
            {...inspectorMode({
              fieldId: 'image',
              manuallyTagged: undefined
            })}
          >
            {backgroundImage && backgroundImage?.length > 0 && (
              <Div
                className={classes.imageFixed}
                style={{
                  backgroundImage: `url('${backgroundImage}')`
                }}
              />
            )}
          </Div>
        </Div>
      </Container>
    </LayoutContext.Provider>
  )
}

QuoteCtfComponentFeature.displayName = 'QuoteCtfComponentFeature'

export default QuoteCtfComponentFeature
