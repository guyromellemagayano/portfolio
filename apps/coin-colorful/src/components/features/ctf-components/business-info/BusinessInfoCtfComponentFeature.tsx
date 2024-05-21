'use client'

import { useMemo } from 'react'

import { useContentfulInspectorMode } from '@contentful/live-preview/react'
import { Container, Theme } from '@mui/material'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  RichtextCtfComponentFeature,
  type BusinessInfoFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(18),
    paddingTop: (props: BusinessInfoFieldsFragment) =>
      props.name || props.shortDescription ? 0 : theme.spacing(18),
    '& .MuiContainer-root + .ComponentInfoBlock': {
      marginTop: theme.spacing(18)
    },
    '& .ComponentInfoBlock + .MuiContainer-root': {
      marginTop: theme.spacing(18)
    }
  },
  container: {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '126.2rem'
  },
  containerNarrow: {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '77rem'
  },
  hero: {
    marginBottom: theme.spacing(18),
    position: 'relative'
  },
  heroBg: {
    backgroundColor: '#000',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    '&::before': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      bottom: 0,
      content: '""',
      display: 'block',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1
    }
  },
  heroInner: {
    alignItems: 'center',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '55rem',
    paddingBottom: theme.spacing(8),
    paddingTop: theme.spacing(8),
    position: 'relative',
    textAlign: 'center',
    zIndex: 1,
    [theme.breakpoints.up('md')]: {
      paddingBottom: theme.spacing(16),
      paddingTop: theme.spacing(16)
    },
    '@media (min-height: 600px)': {
      minHeight: '59rem'
    }
  },
  title: {
    [theme.breakpoints.up('md')]: {
      fontSize: '4.5rem'
    }
  },
  subtitle: {
    fontSize: '2.5rem',
    marginTop: theme.spacing(3)
  }
}))

export type BusinessInfoCtfComponentFeatureProps = BusinessInfoFieldsFragment

/**
 * Renders the business info feature component for the `contentful` API to consume.
 * @param {BusinessInfoCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const BusinessInfoCtfComponentFeature = (
  props: BusinessInfoCtfComponentFeatureProps
) => {
  const {
    body,
    name,
    shortDescription,
    featuredImage,
    sys: { id }
  } = props

  const backgroundImage = useMemo(
      () =>
        featuredImage?.url && featuredImage?.url?.length > 0
          ? `${featuredImage.url}?w=1920`
          : undefined,
      [featuredImage]
    ),
    classes = useStyles(props),
    inspectorMode = useContentfulInspectorMode({ entryId: id })

  return (
    <Div className={classes.root}>
      {((name && name?.length > 0) ||
        (shortDescription && shortDescription?.length > 0)) && (
        <Div className={classes.hero}>
          <Div
            className={classes.heroBg}
            style={{
              backgroundImage: `url(${backgroundImage})`
            }}
            {...inspectorMode({
              fieldId: 'featuredImage',
              manuallyTagged: undefined
            })}
          />

          <Container maxWidth={false}>
            <Div className={clsx(classes.containerNarrow, classes.heroInner)}>
              {name && name?.length > 0 && (
                <Typography
                  variant="h1"
                  className={classes.title}
                  {...inspectorMode({
                    fieldId: 'name',
                    manuallyTagged: undefined
                  })}
                >
                  {name}
                </Typography>
              )}

              {shortDescription && shortDescription?.length > 0 && (
                <Typography
                  className={classes.subtitle}
                  {...inspectorMode({
                    fieldId: 'shortDescription',
                    manuallyTagged: undefined
                  })}
                >
                  {shortDescription}
                </Typography>
              )}
            </Div>
          </Container>
        </Div>
      )}

      {body && Object.keys(body)?.length > 0 && (
        <Div
          {...inspectorMode({
            fieldId: 'body',
            manuallyTagged: undefined
          })}
        >
          <RichtextCtfComponentFeature
            {...body}
            containerClassName={classes.container}
            gridClassName={classes.containerNarrow}
          />
        </Div>
      )}
    </Div>
  )
}

BusinessInfoCtfComponentFeature.displayName = 'BusinessInfoCtfComponentFeature'

export default BusinessInfoCtfComponentFeature
