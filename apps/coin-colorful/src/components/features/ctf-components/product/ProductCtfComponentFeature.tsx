'use client'

import { Fragment } from 'react'

import { useContentfulInspectorMode } from '@contentful/live-preview/react'
import { Box, Container, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Div, Section } from '@guy-romelle-magayano/react-components/server'

import {
  AssetCtfComponentFeature,
  RichtextCtfComponentFeature,
  type ProductFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import {
  LayoutContext,
  layoutContextValues
} from '@guy-romelle-magayano/coin-colorful/contexts'

const useStyles = makeStyles((theme: Theme) => ({
  innerIntroContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '126rem',
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
    }
  },
  headline: {
    fontSize: '3.2rem',
    maxWidth: '60.4rem',
    fontWeight: 600,
    lineHeight: 1.39,
    [theme.breakpoints.up('xl')]: {
      fontSize: '2.375rem'
    }
  },
  body: {
    fontWeight: 400,
    lineHeight: 1.52,
    marginTop: theme.spacing(7),
    maxWidth: '51rem',

    '& p': {
      fontSize: '2rem',
      [theme.breakpoints.up('xl')]: {
        fontSize: '2.5rem',
        fontWeight: 400,
        lineHeight: 1.56
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
    marginBottom: theme.spacing(10),
    order: 1,
    width: '100%',

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: 0,
      order: 3,
      width: 'calc(50% - 2.5rem)'
    }
  },
  imageInner: {
    maxWidth: '47rem'
  },
  innerContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '77rem'
  },
  featuresSection: {
    backgroundColor: '#FCFCFC',
    padding: theme.spacing(19, 0, 12)
  },
  featureSeparator: {
    backgroundColor: '#707070',
    height: '2px',
    '&:first-child': {
      display: 'none'
    }
  },
  featureRow: {
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
    '&:not(:nth-child(2))': {
      marginTop: theme.spacing(10)
    }
  },
  featureName: {
    marginBottom: theme.spacing(4),
    marginTop: 0,
    color: '#414D63',
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      flexShrink: 0,
      marginBottom: theme.spacing(10),
      marginRight: theme.spacing(10),
      width: 'auto'
    }
  },
  featureValue: {
    [theme.breakpoints.up('md')]: {
      flexGrow: 0,
      flexShrink: 0,
      width: '50rem'
    },
    '& .MuiTypography-body1': {
      fontSize: '1.8rem',
      fontWeight: 400,
      color: '#414D63'
    },
    '& > div:last-child': {
      marginBottom: theme.spacing(10)
    }
  }
}))

export type ProductCtfComponentFeatureProps = ProductFieldsFragment

/**
 * Renders the product feature component for the `contentful` API to consume.
 * @param {ProductCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const ProductCtfComponentFeature = (props: ProductCtfComponentFeatureProps) => {
  const {
    name,
    featuredImage,
    description,
    featuresCollection,
    sys: { id }
  } = props

  const inspectorMode = useContentfulInspectorMode(),
    classes = useStyles()

  return (
    <>
      <Container maxWidth={false}>
        <Div className={classes.innerIntroContainer}>
          <Div className={classes.innerBody}>
            {name && name?.length > 0 && (
              <Typography
                variant="h1"
                component="h2"
                className={classes.headline}
                {...inspectorMode({
                  entryId: id,
                  fieldId: 'name',
                  manuallyTagged: undefined
                })}
              >
                {name}
              </Typography>
            )}

            {description && Object.keys(description)?.length > 0 && (
              <LayoutContext.Provider
                value={{
                  ...layoutContextValues,
                  parent: 'product-description'
                }}
              >
                <Div
                  {...inspectorMode({
                    entryId: id,
                    fieldId: 'description',
                    manuallyTagged: undefined
                  })}
                >
                  <RichtextCtfComponentFeature
                    {...description}
                    className={classes.body}
                  />
                </Div>
              </LayoutContext.Provider>
            )}
          </Div>

          {featuredImage && Object.keys(featuredImage)?.length > 0 && (
            <Div
              className={classes.imageContainer}
              {...inspectorMode({
                entryId: id,
                fieldId: 'featuredImage',
                manuallyTagged: undefined
              })}
            >
              <AssetCtfComponentFeature
                {...featuredImage}
                showDescription={false}
                className={classes.imageInner}
              />
            </Div>
          )}
        </Div>
      </Container>

      {featuresCollection?.items && featuresCollection?.items?.length > 0 && (
        <LayoutContext.Provider
          value={{ ...layoutContextValues, parent: 'product-table' }}
        >
          <Section className={classes.featuresSection}>
            <Container maxWidth={false}>
              <Div className={classes.innerContainer}>
                <Box component="dl">
                  {featuresCollection.items.map(
                    item =>
                      item &&
                      Object.keys(item)?.length > 0 && (
                        <Fragment key={item.sys.id}>
                          <Div className={classes.featureSeparator} />
                          <Div className={classes.featureRow}>
                            {item.name && item.name?.length > 0 && (
                              <Typography
                                variant="h3"
                                component="dt"
                                className={classes.featureName}
                                {...inspectorMode({
                                  entryId: item.sys.id,
                                  fieldId: 'name',
                                  manuallyTagged: undefined
                                })}
                              >
                                {item.name}
                              </Typography>
                            )}

                            {item.longDescription &&
                              Object.keys(item.longDescription)?.length > 0 && (
                                <Box
                                  component="dd"
                                  margin={0}
                                  className={classes.featureValue}
                                >
                                  <Div
                                    {...inspectorMode({
                                      entryId: item.sys.id,
                                      fieldId: 'longDescription',
                                      manuallyTagged: undefined
                                    })}
                                  >
                                    <RichtextCtfComponentFeature
                                      {...item.longDescription}
                                    />
                                  </Div>
                                </Box>
                              )}
                          </Div>
                        </Fragment>
                      )
                  )}
                </Box>
              </Div>
            </Container>
          </Section>
        </LayoutContext.Provider>
      )}
    </>
  )
}

ProductCtfComponentFeature.displayName = 'ProductCtfComponentFeature'

export default ProductCtfComponentFeature
