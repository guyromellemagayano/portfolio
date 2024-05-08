import { ReactElement, useEffect, useState } from 'react'

import { CssBaseline, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'

import { CtfFooterGql } from '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-footer/ctf-footer-gql'
import { CtfMobileMenuGql } from '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-mobile-menu/ctf-mobile-menu-gql'
import { HeaderTemplate } from '@guy-romelle-magayano/coin-colorful/components/templates'

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
 * Renders the layout template for the application.
 * @param preview - Indicates if the component is in preview mode.
 * @param children - The child components to render within the layout.
 * @returns The rendered layout template.
 */
const LayoutTemplate = ({ preview, children }: LayoutTemplateProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false),
    classes = useStyles(),
    router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setMenuOpen(false)
    })

    router.events.on('routeChangeComplete', () => {
      if (document.activeElement === null) {
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
      <div className={classes.content}>{children}</div>
      <CtfFooterGql />
      <CtfMobileMenuGql
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
