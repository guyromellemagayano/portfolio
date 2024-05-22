'use client'

import { useMemo } from 'react'

import { Avatar as MuiAvatar } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Div } from '@guy-romelle-magayano/react-components/server'

import { type AssetFieldsFragment } from '@guy-romelle-magayano/coin-colorful/components'

const useStyles = makeStyles(() => ({
  avatarRoot: {
    width: `100%`,
    height: 0,
    padding: `50%`,
    position: `relative`
  },
  avatar: {
    width: '100%',
    height: '100%',
    position: `absolute`,
    top: 0,
    left: 0
  }
}))

export type AvatarFeatureProps = {
  asset: AssetFieldsFragment
  widthPx?: number
}

/**
 * Renders the avatar feature component.
 * @param {AvatarFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const AvatarFeature = (props: AvatarFeatureProps) => {
  const { asset, widthPx = 250 } = props

  const url = useMemo(() => `${asset.url}?w=${widthPx}`, [asset.url, widthPx]),
    classes = useStyles()

  return (
    url &&
    url?.length > 0 && (
      <Div className={classes.avatarRoot}>
        <MuiAvatar className={classes.avatar} src={url} />
      </Div>
    )
  )
}

AvatarFeature.displayName = 'AvatarFeature'

export default AvatarFeature
