import React from "react";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  filterValidNavigationLinks,
  hasMeaningfulText,
  hasValidNavigationLinks,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Icon } from "@web/components/Icon";

import {
  HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS,
  type HeaderComponentNavLinks,
  MOBILE_HEADER_NAV_LINKS,
} from "../../_data";
import { HeaderMobileNavItem } from "../../_internal";
import { type CommonHeaderNavProps } from "../_types";
import styles from "./HeaderMobileNav.module.css";

// ============================================================================
// HEADER MOBILE NAV COMPONENT TYPES & INTERFACES
// ============================================================================

interface HeaderMobileNavProps
  extends React.ComponentPropsWithRef<typeof Popover>,
    CommonHeaderNavProps {}
type HeaderMobileNavComponent = React.FC<HeaderMobileNavProps>;

// ============================================================================
// BASE HEADER MOBILE NAV COMPONENT
// ============================================================================

/** A mobile navigation component that displays a menu button and a list of links. */
const BaseHeaderMobileNav: HeaderMobileNavComponent = setDisplayName(
  function BaseHeaderMobileNav(props) {
    const { links, _internalId, _debugMode, ...rest } = props;

    const element = (
      <Popover
        {...rest}
        {...createComponentProps(_internalId, "header-mobile-nav", _debugMode)}
      >
        <PopoverButton className={styles.mobileHeaderNavButton}>
          {HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS?.menu ?? null}
          <Icon.ChevronDown
            className={styles.mobileHeaderNavChevron}
            _internalId={_internalId}
            _debugMode={_debugMode}
          />
        </PopoverButton>
        <PopoverBackdrop
          transition
          className={styles.mobileHeaderNavBackdrop}
        />
        <PopoverPanel focus transition className={styles.mobileHeaderNavPanel}>
          <div className={styles.mobileHeaderNavHeader}>
            <PopoverButton
              aria-label={
                hasMeaningfulText(
                  HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS?.closeMenu
                )
                  ? HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS.closeMenu
                  : undefined
              }
              className={styles.mobileHeaderNavCloseButton}
            >
              <Icon.Close className={styles.mobileHeaderNavCloseIcon} />
            </PopoverButton>
            {hasMeaningfulText(
              HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS?.navigation
            ) ? (
              <h2 className={styles.mobileHeaderNavTitle}>
                {HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS.navigation}
              </h2>
            ) : null}
          </div>
          {hasValidNavigationLinks(links) ? (
            <nav className={styles.mobileHeaderNavContent}>
              <ul className={styles.mobileHeaderNavList}>
                {links.map(({ label, href }) => (
                  <HeaderMobileNavItem
                    key={`${label}:${href}`}
                    href={href}
                    _internalId={_internalId}
                    _debugMode={_debugMode}
                  >
                    {label}
                  </HeaderMobileNavItem>
                ))}
              </ul>
            </nav>
          ) : null}
        </PopoverPanel>
      </Popover>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED HEADER MOBILE NAV COMPONENT
// ============================================================================

/** A memoized header mobile nav component. */
const MemoizedHeaderMobileNav = React.memo(BaseHeaderMobileNav);

// ============================================================================
// MAIN HEADER MOBILE NAV COMPONENT
// ============================================================================

/** A header mobile nav component that supports memoization and internal debug props. */
export const HeaderMobileNav: HeaderMobileNavComponent = setDisplayName(
  function HeaderMobileNav(props) {
    const { isMemoized = false, _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const navLinks: HeaderComponentNavLinks = MOBILE_HEADER_NAV_LINKS;
    const validLinks = filterValidNavigationLinks(navLinks);
    if (!hasValidNavigationLinks(validLinks)) return null;

    const updatedProps = {
      ...rest,
      links: validLinks,
      _internalId: id,
      _debugMode: isDebugMode,
    };

    const Component = isMemoized
      ? MemoizedHeaderMobileNav
      : BaseHeaderMobileNav;
    const element = <Component {...updatedProps} />;
    return element;
  }
);
