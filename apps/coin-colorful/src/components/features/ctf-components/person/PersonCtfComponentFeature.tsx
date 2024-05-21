'use client'

import { Container, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  AuthorFeature,
  LeadershipCardFeature,
  PersonCardFeature,
  type PersonFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import { useLayoutContext } from '@guy-romelle-magayano/coin-colorful/hooks'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}))

export type PersonCtfComponentFeatureProps = PersonFieldsFragment & {
  previousComponent: string | null
}

/**
 * Renders the person feature component for the `contentful` API to consume.
 * @param {PersonCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const PersonCtfComponentFeature = (props: PersonCtfComponentFeatureProps) => {
  const { cardStyle } = props

  const layout = useLayoutContext(),
    classes = useStyles()

  const isLeadership = !cardStyle

  return layout.parent === 'quote' ? (
    <Div className={classes.root} style={{ maxWidth: layout.containerWidth }}>
      <AuthorFeature {...props} />
    </Div>
  ) : (
    <Container maxWidth={false}>
      <Div className={classes.root} style={{ maxWidth: layout.containerWidth }}>
        {isLeadership ? (
          <LeadershipCardFeature {...props} />
        ) : (
          <PersonCardFeature {...props} />
        )}
      </Div>
    </Container>
  )
}

PersonCtfComponentFeature.displayName = 'PersonCtfComponentFeature'

export default PersonCtfComponentFeature
