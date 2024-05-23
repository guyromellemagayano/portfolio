import { Container, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  RichtextCtfComponentFeature,
  SectionHeadlinesFeature,
  type TextBlockFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import { getColorConfigFromPalette } from '@guy-romelle-magayano/coin-colorful/utils'

const useStyles = makeStyles((theme: Theme) => ({
  innerContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '126rem',
    padding: theme.spacing(19, 0, 19)
  },
  sectionHeadlines: {
    marginBottom: theme.spacing(12)
  }
}))

export type TextBlockCtfComponentFeatureProps = TextBlockFieldsFragment

/**
 * Renders the text block feature component for the `contentful` API to consume.
 * @param {TextBlockCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const TextBlockCtfComponentFeature = (
  props: TextBlockCtfComponentFeatureProps
) => {
  const { headline, subline, body, colorPalette } = props

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
        {(headline && headline?.length > 0) ||
          (subline && subline?.length > 0 && (
            <SectionHeadlinesFeature
              headline={headline}
              headlineProps={{
                style: { color: colorConfig.headlineColor }
              }}
              subline={subline}
              sublineProps={{
                style: { color: colorConfig.textColor }
              }}
              className={classes.sectionHeadlines}
            />
          ))}

        {body && Object.keys(body)?.length > 0 && (
          <Div
            style={{
              color: colorConfig.textColor
            }}
          >
            <RichtextCtfComponentFeature {...body} />
          </Div>
        )}
      </Div>
    </Container>
  )
}

TextBlockCtfComponentFeature.displayName = 'TextBlockCtfComponentFeature'

export default TextBlockCtfComponentFeature
