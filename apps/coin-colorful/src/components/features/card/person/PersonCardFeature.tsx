'use client'

import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  AvatarFeature,
  RichtextCtfComponentFeature,
  type PersonFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import {
  LayoutContext,
  layoutContextValues
} from '@guy-romelle-magayano/coin-colorful/contexts'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  avatar: {
    flexShrink: 0,
    marginRight: theme.spacing(13),
    width: '10rem'
  },
  name: {
    fontSize: '1.8rem',
    lineHeight: 1.333,
    marginBottom: theme.spacing(2),
    marginTop: 0
  },
  bio: {
    color: '#797979',
    '& p': {
      fontSize: '1.8rem',
      lineHeight: 1.333
    }
  }
}))

export type PersonCardFeatureProps = PersonFieldsFragment

/**
 * Renders the person card feature component.
 * @param {PersonCardFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const PersonCardFeature = (props: PersonCardFeatureProps) => {
  const { name, bio, avatar } = props

  const classes = useStyles()

  return (
    <Div className={classes.root}>
      {avatar && Object.keys(avatar)?.length > 0 && (
        <Div className={classes.avatar}>
          <AvatarFeature asset={avatar} />
        </Div>
      )}

      <Div>
        {name && name?.length > 0 && <p className={classes.name}>{name}</p>}

        {bio && Object.keys(bio)?.length > 0 && (
          <LayoutContext.Provider
            value={{ ...layoutContextValues, parent: 'card-person' }}
          >
            <Div>
              <RichtextCtfComponentFeature {...bio} className={classes.bio} />
            </Div>
          </LayoutContext.Provider>
        )}
      </Div>
    </Div>
  )
}

PersonCardFeature.displayName = 'PersonCardFeature'

export default PersonCardFeature
