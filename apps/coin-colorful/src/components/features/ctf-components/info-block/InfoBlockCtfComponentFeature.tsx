import { useContentfulInspectorMode } from '@contentful/live-preview/react'
import { Container, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  AssetCtfComponentFeature,
  RichtextCtfComponentFeature,
  SectionHeadlinesFeature,
  type InfoBlockFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import {
  LayoutContext,
  layoutContextValues
} from '@guy-romelle-magayano/coin-colorful/contexts'
import { getColorConfigFromPalette } from '@guy-romelle-magayano/coin-colorful/utils'

const useStyles = makeStyles((theme: Theme) => ({
  innerContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '126rem',
    padding: theme.spacing(19, 0, 19)
  },
  innerContainerAfterInfoBlock: {
    marginTop: theme.spacing(-19),
    paddingTop: 0
  },
  sectionHeadlines: {
    marginBottom: theme.spacing(12)
  },
  blocksGrid: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginLeft: '-5rem',
    marginTop: '-5rem'
  },
  block: {
    marginLeft: '5rem',
    marginTop: '5rem',
    maxWidth: '39rem',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'calc((100% - 15rem) / 3)',
      '@supports not (width: calc((100% - 15rem) / 3))': {
        width: '29%'
      }
    }
  },
  itemIcon: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 0,
    height: '11.3rem',
    justifyContent: 'center',
    width: '11.3rem'
  },
  itemText: {
    '& .MuiContainer-root:last-child .MuiTypography-body1': {
      marginBottom: 0
    },
    '& .MuiContainer-root:first-child': {
      marginTop: '3rem'
    },
    '& h3': {
      fontSize: '1.8rem',
      marginBottom: '2rem',
      marginTop: '3rem'
    },
    '& p': {
      color: '#6f6f6f',
      fontSize: '1.8rem',
      lineHeight: 1.52
    }
  }
}))

export type InfoBlockCtfComponentFeatureProps = InfoBlockFieldsFragment & {
  previousComponent?: string | null
}

/**
 * Renders an info block feature component for the `contentful` API to consume.
 * @param {InfoBlockCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const InfoBlockCtfComponentFeature = (
  props: InfoBlockCtfComponentFeatureProps
) => {
  const {
    headline,
    subline,
    block1Image,
    block1Body,
    block2Image,
    block2Body,
    block3Image,
    block3Body,
    previousComponent,
    colorPalette,
    sys: { id }
  } = props

  const colorConfig = getColorConfigFromPalette(
    colorPalette && colorPalette?.length > 0 ? colorPalette : ''
  )

  const classes = useStyles(),
    inspectorMode = useContentfulInspectorMode({ entryId: id })

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: colorConfig.backgroundColor
      }}
    >
      <Div
        className={clsx(
          classes.innerContainer,
          previousComponent === 'ComponentInfoBlock' && !headline && !subline
            ? classes.innerContainerAfterInfoBlock
            : null
        )}
      >
        {headline && headline?.length > 0 && subline && subline?.length > 0 && (
          <SectionHeadlinesFeature
            headline={headline}
            headlineProps={{
              style: { color: colorConfig.headlineColor },
              ...inspectorMode({
                fieldId: 'headline',
                manuallyTagged: undefined
              })
            }}
            subline={subline}
            sublineProps={{
              style: { color: colorConfig.textColor },
              ...inspectorMode({
                fieldId: 'subline',
                manuallyTagged: undefined
              })
            }}
            className={classes.sectionHeadlines}
          />
        )}

        <LayoutContext.Provider
          value={{ ...layoutContextValues, parent: 'info-block' }}
        >
          <Div className={classes.blocksGrid}>
            {block1Body && Object.keys(block1Body)?.length > 0 && (
              <Div className={classes.block}>
                {block1Image && Object.keys(block1Image)?.length > 0 && (
                  <Div
                    className={classes.itemIcon}
                    {...inspectorMode({
                      fieldId: 'block1Image',
                      manuallyTagged: undefined
                    })}
                  >
                    <AssetCtfComponentFeature
                      {...block1Image}
                      showDescription={false}
                    />
                  </Div>
                )}

                <Div
                  style={{ color: colorConfig.textColor }}
                  {...inspectorMode({
                    fieldId: 'block1Body',
                    manuallyTagged: undefined
                  })}
                >
                  <RichtextCtfComponentFeature
                    {...block1Body}
                    className={classes.itemText}
                  />
                </Div>
              </Div>
            )}

            {block2Body && Object.keys(block2Body)?.length > 0 && (
              <Div className={classes.block}>
                {block2Image && Object.keys(block2Image)?.length > 0 && (
                  <Div
                    className={classes.itemIcon}
                    {...inspectorMode({
                      fieldId: 'block2Image',
                      manuallyTagged: undefined
                    })}
                  >
                    <AssetCtfComponentFeature
                      {...block2Image}
                      showDescription={false}
                    />
                  </Div>
                )}

                <Div
                  style={{ color: colorConfig.textColor }}
                  {...inspectorMode({
                    fieldId: 'block2Body',
                    manuallyTagged: undefined
                  })}
                >
                  <RichtextCtfComponentFeature
                    {...block2Body}
                    className={classes.itemText}
                  />
                </Div>
              </Div>
            )}

            {block3Body && Object.keys(block3Body)?.length > 0 && (
              <Div className={classes.block}>
                {block3Image && Object.keys(block3Image)?.length > 0 && (
                  <Div
                    className={classes.itemIcon}
                    {...inspectorMode({
                      fieldId: 'block3Image',
                      manuallyTagged: undefined
                    })}
                  >
                    <AssetCtfComponentFeature
                      {...block3Image}
                      showDescription={false}
                    />
                  </Div>
                )}

                <Div
                  style={{ color: colorConfig.textColor }}
                  {...inspectorMode({
                    fieldId: 'block3Body',
                    manuallyTagged: undefined
                  })}
                >
                  <RichtextCtfComponentFeature
                    {...block3Body}
                    className={classes.itemText}
                  />
                </Div>
              </Div>
            )}
          </Div>
        </LayoutContext.Provider>
      </Div>
    </Container>
  )
}

InfoBlockCtfComponentFeature.displayName = 'InfoBlockCtfComponentFeature'

export default InfoBlockCtfComponentFeature
