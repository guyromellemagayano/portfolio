import { Container, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  PageLinkFeature,
  RichtextCtfComponentFeature,
  type CtaFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import {
  LayoutContext,
  layoutContextValues
} from '@guy-romelle-magayano/coin-colorful/contexts'
import { optimizeLineBreak } from '@guy-romelle-magayano/coin-colorful/libs'
import { getColorConfigFromPalette } from '@guy-romelle-magayano/coin-colorful/utils'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: 'center'
  },
  innerContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '93.4rem',
    padding: theme.spacing(19, 0, 19)
  },
  headline: {
    fontWeight: 'bold'
  },
  subline: {
    fontWeight: 400,
    lineHeight: 1.52,
    marginTop: theme.spacing(8)
  },
  ctaContainer: {
    marginTop: theme.spacing(8)
  }
}))

export type CtaCtfComponentFeatureProps = CtaFieldsFragment

/**
 * Renders the CTA feature component for the `contentful` API to consume.
 * @param {CtaCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const CtaCtfComponentFeature = (props: CtaCtfComponentFeatureProps) => {
  const {
    headline,
    subline,
    targetPage,
    ctaText,
    colorPalette,
    urlParameters
  } = props

  const colorConfig = getColorConfigFromPalette(
    colorPalette && colorPalette?.length > 0 ? colorPalette : ''
  )

  const classes = useStyles()

  return (
    <Container
      maxWidth={false}
      className={classes.root}
      style={{
        backgroundColor: colorConfig.backgroundColor
      }}
    >
      <Div className={classes.innerContainer}>
        {headline && headline?.length > 0 && (
          <Typography
            variant="h1"
            component="h2"
            className={classes.headline}
            style={{ color: colorConfig.headlineColor }}
          >
            {optimizeLineBreak(headline)}
          </Typography>
        )}

        {subline && Object.keys(subline)?.length > 0 && (
          <LayoutContext.Provider
            value={{ ...layoutContextValues, parent: 'cta-subline' }}
          >
            <Div style={{ color: colorConfig.textColor }}>
              <RichtextCtfComponentFeature
                {...subline}
                className={classes.subline}
              />
            </Div>
          </LayoutContext.Provider>
        )}

        {targetPage?.slug &&
          targetPage?.slug?.length > 0 &&
          ctaText &&
          ctaText?.length > 0 && (
            <Div className={classes.ctaContainer}>
              <PageLinkFeature
                page={targetPage}
                variant="contained"
                color={colorConfig.buttonColor}
                isButton
                urlParams={urlParameters ?? ''}
              >
                {ctaText}
              </PageLinkFeature>
            </Div>
          )}
      </Div>
    </Container>
  )
}

CtaCtfComponentFeature.displayName = 'CtaCtfComponentFeature'

export default CtaCtfComponentFeature
