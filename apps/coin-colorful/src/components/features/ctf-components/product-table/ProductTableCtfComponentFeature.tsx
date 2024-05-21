'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useContentfulInspectorMode } from '@contentful/live-preview/react'
import { Container, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import throttle from 'lodash/throttle'
import { useTranslations } from 'next-intl'
import Image, { ImageLoader } from 'next/image'
import queryString from 'query-string'

import { Div, Span } from '@guy-romelle-magayano/react-components/server'

import {
  FormatCurrencyFeature,
  RichtextCtfComponentFeature,
  SectionHeadlinesFeature,
  type ProductTableFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import {
  LayoutContext,
  layoutContextValues
} from '@guy-romelle-magayano/coin-colorful/contexts'

export type ContentfulLoaderProps = {
  src: string
  width?: number
  quality?: number
}

/**
 * Generates a URL with query parameters for an image using the provided width and quality.
 * @param {ContentfulLoaderProps} props - The properties to generate the URL with.
 * @returns The URL with query parameters for the image.
 */
export const contentfulLoader: ImageLoader = (props: ContentfulLoaderProps) => {
  const { src, width, quality } = props,
    params: Record<string, string | number> = {}

  if (width && width > 0) {
    params.w = width
  }

  if (quality && quality > 0) {
    params.q = quality
  }

  return queryString.stringifyUrl({ url: src, query: params })
}

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    backgroundColor: '#FCFCFC'
  },
  innerContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '126rem',
    padding: theme.spacing(19, 0, 11)
  },
  sectionHeadlines: {
    marginBottom: theme.spacing(12)
  },
  comparisonTable: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    marginLeft: theme.spacing(-10),
    marginTop: theme.spacing(8),
    '@media (max-width: 1059px)': {
      '[data-columns-count="3"] & $comparisonTableColumn:nth-child(3) [data-equal-size]':
        {
          height: 'auto !important'
        }
    },
    '@media (max-width: 819px)': {
      '[data-columns-count] & [data-equal-size]': {
        height: 'auto !important'
      },
      '[data-columns-count] & $comparisonTableColumn:not(:first-child)': {
        marginTop: theme.spacing(8)
      }
    }
  },
  comparisonTableColumn: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    marginBottom: theme.spacing(4),
    maxWidth: '100%',
    paddingLeft: theme.spacing(10),
    width: '40.5rem',
    [theme.breakpoints.up('md')]: {
      width: '35rem'
    },
    '@media (min-width: 1320px)': {
      width: '40.5rem'
    }
  },
  comparisonFeaturesBreak: {
    padding: theme.spacing(6, 0, 6),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(11, 0, 11)
    }
  },
  title: {
    color: '#1B273A',
    fontSize: '2rem',
    fontWeight: 500,
    lineHeight: 1.09
  },
  shortDescription: {
    marginTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    '& p': {
      fontWeight: 400,
      color: '#414D63',
      fontSize: '1.8rem',
      lineHeight: 1.55
    }
  },
  featuredImage: {
    paddingBottom: theme.spacing(7)
  },
  feature: {
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      paddingBottom: theme.spacing(5)
    },
    color: '#414D63'
  },
  featureInner: {
    overflow: 'hidden'
  },
  signUp: {
    marginTop: theme.spacing(6)
  },
  pricingBottom: {
    marginTop: 'auto',
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginTop: 'auto',
      paddingTop: theme.spacing(8)
    }
  },
  priceAddition: {
    fontSize: '1.8rem',
    fontWeight: 400,
    color: '#414D63'
  },
  priceUpper: {
    fontSize: '1.8rem',
    fontWeight: 400,
    color: '#414D63',
    '& $priceAddition': {
      fontSize: '1.8rem',
      fontWeight: 400
    }
  }
}))

export type ProductTableCtfComponentFeatureProps = ProductTableFieldsFragment

/**
 * Renders the product table feature component for the `contentful` API to consume.
 * @param {ProductTableCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const ProductTableCtfComponentFeature = (
  props: ProductTableCtfComponentFeatureProps
) => {
  const {
    headline,
    subline,
    productsCollection,
    sys: { id }
  } = props

  const t = useTranslations(),
    classes = useStyles(),
    inspectorMode = useContentfulInspectorMode()

  const featureNames: string[] | null = useMemo(() => {
    if (
      !productsCollection ||
      (productsCollection && productsCollection?.items?.length === 0)
    ) {
      return null
    }

    const names: string[] = []

    productsCollection.items.forEach(product => {
      if (!product || (product.featuresCollection?.items?.length || 0) === 0) {
        return
      }

      product.featuresCollection!.items?.forEach(feature => {
        if (!feature?.name) {
          return
        }

        if (names.includes(feature.name)) {
          return
        }

        names.push(feature.name)
      })
    })

    return names
  }, [productsCollection])

  const featuresGrid: Record<
    string,
    Record<string, { attributes: Record<string, string>; value: any }>
  > | null = useMemo(() => {
    if (!featureNames || !productsCollection) {
      return null
    }

    const grid: any = {}

    featureNames.forEach(featureName => {
      grid[featureName] = {}

      productsCollection.items.forEach(product => {
        if (
          !product ||
          (product.featuresCollection?.items?.length || 0) === 0
        ) {
          return
        }

        const feature = product.featuresCollection!.items.find(
          featureX => featureX?.name === featureName
        )

        if (!feature) {
          return
        }

        const fieldId: keyof typeof feature = feature.shortDescription
          ? 'shortDescription'
          : 'longDescription'

        grid[featureName][product.sys.id] = {
          attributes: inspectorMode({
            fieldId,
            entryId: feature.sys.id,
            manuallyTagged: undefined
          }),
          value: feature[fieldId]
        }
      })
    })

    return grid
  }, [featureNames, productsCollection, inspectorMode])

  // Keeping the grid items the same size
  const gridElement = useRef<HTMLDivElement>(null),
    gridColumnElements = useRef<(HTMLDivElement | null)[]>([]),
    [gridSizes, setGridSizes] = useState<{ [key: string]: number }>({}),
    resizeGridItems = useCallback(
      () =>
        throttle(() => {
          if (!gridElement.current || gridColumnElements.current.length === 0) {
            return
          }

          gridElement.current.setAttribute(
            'data-columns-count',
            `${gridColumnElements.current.length}`
          )

          const children =
            gridElement.current.querySelectorAll('[data-equal-size]')

          if (children.length === 0) {
            return
          }

          const heightMap: { [key: string]: number } = {}

          for (let i = 0; i < children.length; i += 1) {
            const child = children[i],
              childIndex = child.getAttribute('data-equal-size') || '0',
              childHeight = child.scrollHeight

            if (heightMap[`index-${childIndex}`] === undefined) {
              heightMap[`index-${childIndex}`] = childHeight
            } else if (heightMap[`index-${childIndex}`] < childHeight) {
              heightMap[`index-${childIndex}`] = childHeight
            }
          }

          setGridSizes(heightMap)
        }, 100),
      []
    )

  useEffect(() => {
    if (!gridElement.current) {
      return () => {
        window.removeEventListener('resize', resizeGridItems)
      }
    }

    window.addEventListener('resize', resizeGridItems)
    resizeGridItems()

    return () => {
      window.removeEventListener('resize', resizeGridItems)
    }
  }, [resizeGridItems])

  return (
    <Div ref={gridElement}>
      <Container maxWidth={false} className={classes.section}>
        <Div className={classes.innerContainer}>
          {headline &&
            headline?.length > 0 &&
            subline &&
            subline?.length > 0 && (
              <SectionHeadlinesFeature
                headline={headline}
                headlineLivePreviewProps={inspectorMode({
                  entryId: id,
                  fieldId: 'headline',
                  manuallyTagged: undefined
                })}
                subline={subline}
                sublineLivePreviewProps={inspectorMode({
                  entryId: id,
                  fieldId: 'subline',
                  manuallyTagged: undefined
                })}
                className={classes.sectionHeadlines}
              />
            )}

          {productsCollection?.items &&
            productsCollection?.items?.length > 0 && (
              <Div className={classes.comparisonTable}>
                {productsCollection.items.map(
                  (product, j) =>
                    product &&
                    Object.keys(product)?.length > 0 && (
                      <Div
                        key={product.sys.id}
                        className={classes.comparisonTableColumn}
                        ref={el => {
                          gridColumnElements.current[j] = el
                        }}
                        {...inspectorMode({
                          entryId: product.sys.id,
                          fieldId: 'internalName',
                          manuallyTagged: undefined
                        })}
                      >
                        <Div
                          className={classes.featuredImage}
                          {...inspectorMode({
                            entryId: product.sys.id,
                            fieldId: 'featuredImage',
                            manuallyTagged: undefined
                          })}
                        >
                          <Div
                            data-equal-size="0"
                            style={{
                              height:
                                gridSizes[`index-0`] === undefined
                                  ? undefined
                                  : `${gridSizes[`index-0`]}px`
                            }}
                          >
                            {product.featuredImage &&
                              Object.keys(product.featuredImage)?.length >
                                0 && (
                                <Image
                                  src={product.featuredImage.url as string}
                                  alt={product.featuredImage.description || ''}
                                  width={product.featuredImage.width as number}
                                  height={
                                    product.featuredImage.height as number
                                  }
                                  quality={60}
                                  loader={contentfulLoader}
                                  sizes="(min-width: 355px) 355px, 98vw"
                                />
                              )}
                          </Div>
                        </Div>
                        <Div
                          data-equal-size="1"
                          style={{
                            height:
                              gridSizes[`index-1`] === undefined
                                ? undefined
                                : `${gridSizes[`index-1`]}px`
                          }}
                        >
                          <Typography
                            variant="h2"
                            className={classes.title}
                            {...inspectorMode({
                              entryId: product.sys.id,
                              fieldId: 'name',
                              manuallyTagged: undefined
                            })}
                          >
                            {product.name}
                          </Typography>
                        </Div>
                        <Div
                          data-equal-size="2"
                          style={{
                            height:
                              gridSizes['index-2'] === undefined
                                ? undefined
                                : `${gridSizes['index-2']}px`
                          }}
                          {...inspectorMode({
                            entryId: product.sys.id,
                            fieldId: 'description',
                            manuallyTagged: undefined
                          })}
                        >
                          {product.description &&
                            Object.keys(product.description)?.length > 0 && (
                              <LayoutContext.Provider
                                value={{
                                  ...layoutContextValues,
                                  parent: 'product-description'
                                }}
                              >
                                <RichtextCtfComponentFeature
                                  {...product.description}
                                  className={classes.shortDescription}
                                />
                              </LayoutContext.Provider>
                            )}
                        </Div>
                        <Div
                          data-equal-size="3"
                          style={{
                            height:
                              featureNames === null ||
                              gridSizes['index-3'] === undefined
                                ? undefined
                                : `${gridSizes['index-3']}px`
                          }}
                          {...inspectorMode({
                            entryId: product.sys.id,
                            fieldId: 'price',
                            manuallyTagged: undefined
                          })}
                        >
                          {!product.price || product.price === 0 ? (
                            <Typography
                              variant="h2"
                              component="span"
                              className={classes.priceUpper}
                            >
                              {t('price.free')}
                            </Typography>
                          ) : (
                            <Typography
                              variant="h2"
                              component="span"
                              className={classes.priceUpper}
                            >
                              <FormatCurrencyFeature value={product.price} />
                              <Span className={classes.priceAddition}>
                                /{t('time.month')}
                              </Span>
                            </Typography>
                          )}
                        </Div>

                        {featureNames &&
                          featureNames?.length > 0 &&
                          featuresGrid &&
                          Object.keys(featuresGrid)?.length > 0 && (
                            <LayoutContext.Provider
                              value={{
                                ...layoutContextValues,
                                parent: 'product-table'
                              }}
                            >
                              <Div
                                className={classes.comparisonFeaturesBreak}
                              />
                              <Div
                                {...inspectorMode({
                                  entryId: product.sys.id,
                                  fieldId: 'features',
                                  manuallyTagged: undefined
                                })}
                              >
                                {featureNames.map(
                                  (featureName, i) =>
                                    featuresGrid[featureName][
                                      product.sys.id
                                    ] && (
                                      <Div
                                        key={`${product.sys.id}-${featureName}`}
                                        className={classes.feature}
                                        {...featuresGrid[featureName][
                                          product.sys.id
                                        ].attributes}
                                      >
                                        <Div
                                          data-equal-size={i + 4}
                                          className={classes.featureInner}
                                        >
                                          <RichtextCtfComponentFeature
                                            {...featuresGrid[featureName][
                                              product.sys.id
                                            ].value}
                                          />
                                        </Div>
                                      </Div>
                                    )
                                )}
                              </Div>
                            </LayoutContext.Provider>
                          )}

                        <Div
                          className={classes.pricingBottom}
                          data-equal-size={(featureNames || []).length + 4}
                          style={{
                            height:
                              !featureNames ||
                              !gridSizes[`index-${featureNames.length + 4}`]
                                ? undefined
                                : `${gridSizes[`index-${featureNames.length + 4}`]}px`
                          }}
                        >
                          {!product.price || product.price === 0 ? (
                            <Typography variant="h2" component="span">
                              {t('price.free')}
                            </Typography>
                          ) : (
                            <Typography
                              variant="h2"
                              component="span"
                              className={classes.priceUpper}
                              {...inspectorMode({
                                entryId: product.sys.id,
                                fieldId: 'price',
                                manuallyTagged: undefined
                              })}
                            >
                              <FormatCurrencyFeature value={product.price} />
                              <Span className={classes.priceAddition}>
                                /{t('time.month')}
                              </Span>
                            </Typography>
                          )}
                        </Div>
                      </Div>
                    )
                )}
              </Div>
            )}
        </Div>
      </Container>
    </Div>
  )
}

ProductTableCtfComponentFeature.displayName = 'ProductTableCtfComponentFeature'

export default ProductTableCtfComponentFeature
