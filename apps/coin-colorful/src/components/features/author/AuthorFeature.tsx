import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Div, P } from '@guy-romelle-magayano/react-components/server'

import {
  AvatarFeature,
  type PersonFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    display: 'inline-block',
    width: '11.4rem'
  },
  name: {
    fontSize: '2.5rem',
    lineHeight: 1.52,
    marginBottom: 0,
    marginTop: theme.spacing(3)
  }
}))

export type AuthorFeatureProps = PersonFieldsFragment

/**
 * Renders the author feature component.
 * @param {AuthorFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const AuthorFeature = (props: AuthorFeatureProps) => {
  const { name, avatar } = props

  const classes = useStyles()

  return (
    <Div>
      {avatar && Object.keys(avatar)?.length > 0 && (
        <Div className={classes.avatar}>
          <AvatarFeature asset={avatar} />
        </Div>
      )}

      {name && name?.length > 0 && <P className={classes.name}>{name}</P>}
    </Div>
  )
}

AuthorFeature.displayName = 'AuthorFeature'

export default AuthorFeature
