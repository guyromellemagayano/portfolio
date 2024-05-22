'use client'

import { useContentfulInspectorMode } from '@contentful/live-preview/react'
import { Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  AssetCtfComponentFeature,
  RichtextCtfComponentFeature,
  type PersonFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import {
  LayoutContext,
  layoutContextValues
} from '@guy-romelle-magayano/coin-colorful/contexts'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '93.4rem',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  },
  rootIncreasedSpacing: {
    marginTop: theme.spacing(7),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(10)
    }
  },
  avatar: {
    borderRadius: '50%',
    flexShrink: 0,
    marginBottom: theme.spacing(5),
    marginRight: theme.spacing(10),
    maxWidth: '9.8rem',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      marginBottom: 0
    }
  },
  name: {
    fontSize: '2.1rem',
    fontWeight: 500,
    lineHeight: 1.333,
    marginBottom: theme.spacing(1)
  },
  role: {
    fontSize: '1.8rem'
  },
  bio: {
    color: '#6E6E6E',
    marginTop: theme.spacing(5),
    '& p': {
      fontSize: '1.8rem',
      lineHeight: 1.333
    },
    '& .MuiContainer-root:last-child p:last-child': {
      marginBottom: 0
    }
  }
}))

export type LeadershipCardFeatureProps = PersonFieldsFragment & {
  previousComponent: string | null
}

/**
 * Renders the leadership card feature component.
 * @param {LeadershipCardFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const LeadershipCardFeature = (props: LeadershipCardFeatureProps) => {
  const {
    name,
    bio,
    avatar,
    previousComponent,
    sys: { id: entryId }
  } = props

  const nameSplit = name && name?.length > 0 && name?.split(', '),
    classes = useStyles(),
    inspectorMode = useContentfulInspectorMode({ entryId })

  return (
    <Div
      className={clsx(
        classes.root,
        previousComponent === 'TopicPerson'
          ? classes.rootIncreasedSpacing
          : undefined
      )}
    >
      {avatar && Object.keys(avatar)?.length > 0 && (
        <Div
          {...inspectorMode({
            fieldId: 'avatar',
            manuallyTagged: undefined
          })}
          className={classes.avatar}
        >
          <AssetCtfComponentFeature {...avatar} showDescription={false} />
        </Div>
      )}

      <Div>
        <Div
          {...inspectorMode({
            fieldId: 'name',
            manuallyTagged: undefined
          })}
        >
          {nameSplit && nameSplit?.length > 0 && (
            <Typography className={classes.name}>{nameSplit[0]}</Typography>
          )}

          {nameSplit && nameSplit?.length === 2 && (
            <Typography className={classes.role}>{nameSplit[1]}</Typography>
          )}
        </Div>

        {bio && Object.keys(bio)?.length > 0 && (
          <LayoutContext.Provider
            value={{ ...layoutContextValues, parent: 'card-person' }}
          >
            <Div
              {...inspectorMode({
                fieldId: 'bio',
                manuallyTagged: undefined
              })}
            >
              <RichtextCtfComponentFeature {...bio} className={classes.bio} />
            </Div>
          </LayoutContext.Provider>
        )}
      </Div>
    </Div>
  )
}

LeadershipCardFeature.displayName = 'LeadershipCardFeature'

export default LeadershipCardFeature
