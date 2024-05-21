import { useContentfulInspectorMode } from '@contentful/live-preview/react'
import { Theme } from '@mui/material'
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
    alignItems: 'center',
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  menuItem: {
    alignItems: 'center',
    cursor: 'default',
    display: 'inline-flex',
    fontSize: '1.7rem',
    fontWeight: 400,
    height: '8rem',
    lineHeight: 1.9,
    marginRight: theme.spacing(8),
    position: 'relative',

    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(10)
    },

    '& a': {
      cursor: 'pointer',
      display: 'inline-block',
      transition: 'transform 0.2s ease-in-out'
    },

    '&:hover, &:focus, &:focus-within': {
      '& > a': {
        transform: 'translateY(-4px)'
      },
      '& $submenu': {
        opacity: 1,
        pointerEvents: 'all',
        transform: 'translateY(0)'
      }
    }
  },
  submenu: {
    backgroundColor: '#fff',
    boxShadow: '0 3px 6px #00000029',
    borderRadius: '14px',
    left: theme.spacing(10 * -1),
    listStyle: 'none',
    opacity: 0,
    padding: theme.spacing(4, 10),
    pointerEvents: 'none',
    position: 'absolute',
    top: 'calc(100% - 2rem)',
    transform: 'translateY(20%)',
    transition: 'all 0.3s ease-in-out'
  },
  submenuItem: {
    '&:hover, &:focus, &:focus-within': {
      '& > a': {
        transform: 'translateY(-4px)'
      }
    }
  }
}))

/**
 * Renders the navigation feature component for the `contentful` API to consume.
 * @param {NavigationFieldsFragment} props - The navigation fields.
 * @returns The rendered feature component.
 */
const NavigationCtfComponentFeature = (props: NavigationFieldsFragment) => {
  const { items } = props

  const classes = useStyles(),
    inspectorMode = useContentfulInspectorMode()

  const navigationContent = items?.[0] || undefined

  const renderNavigationLinks = (
    menuGroup: { items: Array<any> },
    listClassName?: string
  ) =>
    menuGroup?.items && menuGroup?.items?.length > 0
      ? menuGroup.items.map((menuItem: any) => {
          const href = getLinkHrefPrefix(menuItem),
            linkText = getLinkDisplayText(menuItem)

          return (
            href?.length > 0 &&
            linkText?.length > 0 && (
              <Li
                key={menuItem.sys.id}
                className={listClassName}
                {...inspectorMode({
                  entryId: menuItem.sys.id,
                  fieldId: 'pageName',
                  manuallyTagged: undefined
                })}
              >
                <LinkShared href={href}>{linkText}</LinkShared>
              </Li>
            )
          )
        })
      : undefined

  return (
    <>
      {navigationContent?.menuItemsCollection?.items &&
        navigationContent?.menuItemsCollection?.items?.length > 0 && (
          <Nav role="navigation">
            <Ul className={classes.menu}>
              {navigationContent.menuItemsCollection.items.map(
                menuItem =>
                  menuItem &&
                  Object.keys(menuItem)?.length > 0 && (
                    <Li
                      key={menuItem.sys.id}
                      className={classes.menuItem}
                      {...inspectorMode({
                        entryId: menuItem.sys.id,
                        fieldId: 'groupName',
                        manuallyTagged: undefined
                      })}
                    >
                      {!menuItem.link &&
                      menuItem.groupName &&
                      menuItem.groupName?.length > 0
                        ? menuItem.groupName
                        : menuItem.link?.slug &&
                          menuItem.link?.slug?.length > 0 && (
                            <LinkShared href={`/${menuItem.link.slug}`}>
                              {menuItem.groupName}
                            </LinkShared>
                          )}

                      {!menuItem.link && menuItem.children && (
                        <Ul className={classes.submenu}>
                          {renderNavigationLinks(
                            menuItem.children,
                            classes.submenuItem
                          )}
                        </Ul>
                      )}
                    </Li>
                  )
              )}
            </Ul>
          </Nav>
        )}
    </>
  )
}

NavigationCtfComponentFeature.displayName = 'NavigationCtfComponentFeature'

export default NavigationCtfComponentFeature
