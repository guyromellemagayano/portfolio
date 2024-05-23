import { Container, Grid, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslations } from 'next-intl'
import { File } from 'react-kawaii'

import { Div } from '@guy-romelle-magayano/react-components/server'

import { PageContainerTemplate } from '@guy-romelle-magayano/coin-colorful/components'
import { theme } from '@guy-romelle-magayano/coin-colorful/utils'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    minhHeight: '100%',
    color: 'black'
  },
  container: {
    paddingTop: theme.spacing(16)
  },
  content: {
    '& > *': {
      marginBottom: theme.spacing(6)
    }
  },
  icon: {
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(3)
  },
  headlineWrap: {
    alignItems: 'center',
    display: 'flex'
  }
}))

export type PageErrorFeatureProps = {
  error?: {
    code: number
    message?: string
  }
}

/**
 * Renders the page error feature component.
 * @param {PageErrorFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const PageErrorFeature = (props: PageErrorFeatureProps) => {
  const t = useTranslations(),
    classes = useStyles()

  const error = !props.error
    ? {
        code: 400,
        message: t('error.somethingWentWrong')
      }
    : props.error

  return (
    <Div className={classes.root}>
      <PageContainerTemplate>
        <Container className={classes.container}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={8}>
              <Div className={classes.headlineWrap}>
                <File
                  size={100}
                  mood="ko"
                  color={theme.palette.primary.main}
                  className={classes.icon}
                />
                <Typography variant="h1" gutterBottom>
                  {t('error.code', { code: error.code })}
                </Typography>
              </Div>

              {error && error?.message && error?.message?.length > 0 && (
                <Div className={classes.content}>
                  <Typography variant="h4">{error.message}</Typography>
                </Div>
              )}
            </Grid>
          </Grid>
        </Container>
      </PageContainerTemplate>
    </Div>
  )
}

PageErrorFeature.displayName = 'PageErrorFeature'

export default PageErrorFeature
