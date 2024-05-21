import { Drawer, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Li, Nav, Ul } from '@guy-romelle-magayano/react-components/server'

import {
  LinkShared,
  type NavigationFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import {
  getLinkDisplayText,
  getLinkHrefPrefix
} from '@guy-romelle-magayano/coin-colorful/utils'

const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    listStyle: 'none',
    margin: 0,
    padding: theme.spacing(4, 8)
  },
  menuItem: {
    cursor: 'default',
    display: 'block',
    fontSize: '2.1rem',
    lineHeight: '1.8',
    position: 'relative',

    a: {
      cursor: 'pointer'
    }
  },
  submenu: {
    borderLeft: '1px solid #eee',
    listStyle: 'none',
    padding: theme.spacing(0, 0, 0, 2)
  }
}))

export type MobileMenuCtfComponentFeatureProps = NavigationFieldsFragment & {
  isOpen?: boolean
  onOpenChange: (isOpen: boolean) => any
}

/**
 * Renders the mobile menu feature component for the `contentful` API to consume.
 * @param {MobileMenuCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const MobileMenuCtfComponentFeature = (
  props: MobileMenuCtfComponentFeatureProps
) => {
  const { isOpen, onOpenChange, items } = props,
    mobileMenuContent = items?.[0] || null

  const classes = useStyles()

  const onCloseClick = (e: any, reason: string): void => {
    if (reason === 'backdropClick') {
      onOpenChange(false)
    }

    return
  }

  const renderMobileMenuLinks = (menuGroup: { items: any[] }) => {
    return (
      menuGroup?.items &&
      menuGroup?.items?.length > 0 &&
      menuGroup.items.map((menuItem: { sys: { id: string } }) => {
        const href = getLinkHrefPrefix(menuItem),
          linkText = getLinkDisplayText(menuItem)

        return (
          href?.length > 0 &&
          linkText?.length > 0 && (
            <Li key={menuItem.sys.id}>
              <LinkShared href={href} className={classes.menuItem}>
                {linkText}
              </LinkShared>
            </Li>
          )
        )
      })
    )
  }

  return (
    <Drawer
      open={isOpen}
      anchor="right"
      onClose={onCloseClick}
      role="dialog"
      id="mobile-menu"
      aria-modal={true}
    >
      {mobileMenuContent?.menuItemsCollection?.items &&
        mobileMenuContent?.menuItemsCollection?.items?.length > 0 && (
          <Nav role="navigation">
            <Ul className={classes.menu}>
              {mobileMenuContent.menuItemsCollection.items.map(
                menuItem =>
                  menuItem &&
                  Object.keys(menuItem)?.length > 0 && (
                    <Li key={menuItem.sys.id} className={classes.menuItem}>
                      {!menuItem.link ? (
                        menuItem.groupName
                      ) : menuItem.link.slug &&
                        menuItem.link.slug?.length > 0 &&
                        menuItem.groupName &&
                        menuItem.groupName?.length > 0 ? (
                        <LinkShared href={`/${menuItem.link.slug}`}>
                          {menuItem.groupName}
                        </LinkShared>
                      ) : undefined}

                      {!menuItem.link &&
                        menuItem.children &&
                        Object.keys(menuItem.children)?.length > 0 && (
                          <Ul className={classes.submenu}>
                            {renderMobileMenuLinks(menuItem.children)}
                          </Ul>
                        )}
                    </Li>
                  )
              )}
            </Ul>
          </Nav>
        )}
    </Drawer>
  )
}

MobileMenuCtfComponentFeature.displayName = 'MobileMenuCtfComponentFeature'

export default MobileMenuCtfComponentFeature
