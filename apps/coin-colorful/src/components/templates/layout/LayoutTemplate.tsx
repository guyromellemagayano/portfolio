'use client'

import { ReactElement, useEffect, useState } from 'react'

import { CssBaseline, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  FooterGqlCtfComponentFeature,
  HeaderTemplate,
  MobileMenuGqlCtfComponentFeature
} from '@guy-romelle-magayano/coin-colorful/components'
import { isNotNullOrUndefined } from '@guy-romelle-magayano/react-utils'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    ...theme.typography.body1,
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

export type LayoutTemplateProps = {
  preview: boolean
  children: ReactElement[]
}

/**
 * Renders the layout template component.
 * @param {LayoutTemplateProps} props - The properties to render the component with.
 * @returns The rendered component.
 */
const LayoutTemplate = (props: LayoutTemplateProps) => {
  const { children } = props

  const [isMenuOpen, setMenuOpen] = useState(false),
    classes = useStyles(),
    router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setMenuOpen(false)
    })

    router.events.on('routeChangeComplete', () => {
      if (!isNotNullOrUndefined(document.activeElement)) {
        return
      }

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    })
  }, [router.events])

  return (
    <>
      <CssBaseline />
      <HeaderTemplate
        isMenuOpen={isMenuOpen}
        onMenuClick={() => setMenuOpen(true)}
      />
      <Div className={classes.content}>{children}</Div>
      <FooterGqlCtfComponentFeature />
      <MobileMenuGqlCtfComponentFeature
        isOpen={isMenuOpen}
        onOpenChange={(newOpen: boolean) => {
          setMenuOpen(newOpen)
        }}
      />
    </>
  )
}

LayoutTemplate.displayName = 'LayoutTemplate'

export default LayoutTemplate
