'use client'

import { useContentfulInspectorMode } from '@contentful/live-preview/react'
import { Container, Typography } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  ImageCtfComponentFeature,
  PageLinkFeature,
  RichtextCtfComponentFeature,
  type DuplexFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import {
  LayoutContext,
  layoutContextValues
} from '@guy-romelle-magayano/coin-colorful/contexts'
import { optimizeLineBreak } from '@guy-romelle-magayano/coin-colorful/libs'
import { getColorConfigFromPalette } from '@guy-romelle-magayano/coin-colorful/utils'

const useStyles = makeStyles((theme: Theme) => ({
  innerContainer: {
    display: 'grid',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '126rem',
    padding: theme.spacing(8, 0, 8),
    gap: theme.spacing(7),

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: theme.spacing(14),
      padding: theme.spacing(19, 0, 19)
    }
  },
  contentContainer: {
    margin: 'auto 0',
    order: 1,
    [theme.breakpoints.up('md')]: {
      order: 'initial'
    }
  },
  headline: {
    fontSize: '3rem',
    lineHeight: 1.3,
    fontWeight: 700,
    maxWidth: '60.4rem',
    [theme.breakpoints.up('xl')]: {
      fontSize: '3.5rem'
    }
  },
  richText: {
    fontWeight: 400,
    lineHeight: 1.56,
    marginTop: theme.spacing(7),
    '& .MuiTypography-body1': {
      fontSize: '2.5rem',
      [theme.breakpoints.up('xl')]: {
        fontSize: '1.8rem'
      }
    }
  },
  ctaContainer: {
    marginTop: theme.spacing(8),
    '& svg.MuiSvgIcon-root': {
      fontSize: 'inherit'
    }
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    order: 0,
    boxShadow: `0px 0px 0px 1px rgba(25, 37, 50, 0.1),
    0px -6px 16px -6px rgba(25, 37, 50, 0.03),
    0px 8px 16px -8px rgba(25, 37, 50, 0.2),
    0px 13px 27px -5px rgba(25, 37, 50, 0.15)`,
    borderRadius: '16px',
    [theme.breakpoints.up('md')]: {
      order: 'initial'
    }
  },
  image: {
    display: 'block',
    margin: 'auto 0',
    maxWidth: '100%',
    borderRadius: '16px'
  },
  imageFull: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center'
  },
  nextImageContainer: {
    width: '100%',
    height: 'auto'
  }
}))

export type DuplexContentProps = DuplexFieldsFragment

/**
 * Renders the content for the `DuplexCtfComponentFeature`.
 * @param {DuplexContentProps} props - The properties to render the component with.
 * @returns The rendered DuplexContent component.
 */
const DuplexContent = (props: DuplexContentProps) => {
  const { headline, bodyText, targetPage, ctaText, colorPalette } = props

  const colorConfig = getColorConfigFromPalette(
    colorPalette && colorPalette?.length > 0 ? colorPalette : ''
  )

  const classes = useStyles(),
    inspectorMode = useContentfulInspectorMode({ entryId: props.sys.id })

  return (
    <Div className={classes.contentContainer}>
      {headline && headline?.length > 0 && (
        <Typography
          variant="h1"
          component="h2"
          className={classes.headline}
          style={{ color: colorConfig.headlineColor }}
          {...inspectorMode({
            fieldId: 'headline',
            manuallyTagged: undefined
          })}
        >
          {optimizeLineBreak(headline)}
        </Typography>
      )}

      {bodyText && Object.keys(bodyText)?.length > 0 && (
        <LayoutContext.Provider
          value={{ ...layoutContextValues, parent: 'duplex' }}
        >
          <Div
            style={{ color: colorConfig.textColor }}
            {...inspectorMode({
              fieldId: 'bodyText',
              manuallyTagged: undefined
            })}
          >
            <RichtextCtfComponentFeature
              {...bodyText}
              className={classes.richText}
            />
          </Div>
        </LayoutContext.Provider>
      )}

      {targetPage?.slug &&
        targetPage?.slug?.length > 0 &&
        ctaText &&
        ctaText?.length > 0 && (
          <Div
            className={classes.ctaContainer}
            {...inspectorMode({
              fieldId: 'ctaText',
              manuallyTagged: undefined
            })}
          >
            <PageLinkFeature
              page={targetPage}
              variant="contained"
              color={colorConfig.buttonColor}
              isButton
            >
              {ctaText}
            </PageLinkFeature>
          </Div>
        )}
    </Div>
  )
}

export type DuplexImageProps = DuplexFieldsFragment

/**
 * Renders a duplex image component.
 * @param {DuplexImageProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const DuplexImage = (props: DuplexImageProps) => {
  const { image, imageStyle: imageStyleBoolean } = props

  const imageStyle = imageStyleBoolean ? 'fixed' : 'full'

  const classes = useStyles(),
    inspectorMode = useContentfulInspectorMode({ entryId: props.sys.id })

  return (
    <Div className={classes.imageContainer}>
      {image?.url && image?.url?.length > 0 ? (
        <Div
          className={classes.nextImageContainer}
          {...inspectorMode({
            fieldId: 'image',
            manuallyTagged: undefined
          })}
        >
          <ImageCtfComponentFeature
            className={clsx([
              classes.image,
              imageStyle === 'fixed' && classes.imageFull
            ])}
            src={`${image.url}?w=600`}
            alt={image.description || ''}
            width={image.width || undefined}
            height={image.height || undefined}
          />
        </Div>
      ) : null}
    </Div>
  )
}

export type DuplexCtfComponentFeatureProps = DuplexFieldsFragment

/**
 * Renders the duplex feature component for the `contentful` API to consume
 * @param {DuplexCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const DuplexCtfComponentFeature = (props: DuplexCtfComponentFeatureProps) => {
  const { colorPalette, containerLayout: containerLayoutBoolean } = props

  const colorConfig = getColorConfigFromPalette(
    colorPalette && colorPalette?.length > 0 ? colorPalette : ''
  )

  const classes = useStyles()

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: colorConfig.backgroundColor
      }}
    >
      <Div className={classes.innerContainer}>
        {containerLayoutBoolean ? (
          <>
            <DuplexImage {...props} />
            <DuplexContent {...props} />
          </>
        ) : (
          <>
            <DuplexContent {...props} />
            <DuplexImage {...props} />
          </>
        )}
      </Div>
    </Container>
  )
}

DuplexCtfComponentFeature.displayName = 'DuplexCtfComponentFeature'

export default DuplexCtfComponentFeature
