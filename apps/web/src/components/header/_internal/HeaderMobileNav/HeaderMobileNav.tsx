import React from "react";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { setDisplayName } from "@guyromellemagayano/utils";

import { Icon } from "@web/components/icon";

import {
  HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS,
  MOBILE_HEADER_NAV_LINKS,
} from "../../_data";
import { HeaderMobileNavItem } from "../HeaderMobileNavItem";
import styles from "./HeaderMobileNav.module.css";

// ============================================================================
// BASE HEADER MOBILE NAV COMPONENT
// ============================================================================

type HeaderMobileNavProps = React.ComponentProps<typeof Popover> &
  CommonComponentProps;
type HeaderMobileNavComponent = React.FC<HeaderMobileNavProps>;

/** A mobile navigation component that displays a menu button and a list of links. */
const BaseHeaderMobileNav: HeaderMobileNavComponent = setDisplayName(
  function BaseHeaderMobileNav(props) {
    const { _internalId, _debugMode, ...rest } = props;

    const element = (
      <Popover
        {...rest}
        data-mobile-header-nav-id={`${_internalId}-mobile-header-nav`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid="mobile-header-nav-root"
      >
        <PopoverButton className={styles.HeaderMobileNavButton}>
          {HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS.menu}
          <Icon.ChevronDown
            className={styles.HeaderMobileNavChevron}
            _internalId={_internalId}
            _debugMode={_debugMode}
          />
        </PopoverButton>
        <PopoverBackdrop
          transition
          className={styles.HeaderMobileNavBackdrop}
        />
        <PopoverPanel focus transition className={styles.HeaderMobileNavPanel}>
          <div className={styles.HeaderMobileNavHeader}>
            <PopoverButton
              aria-label={HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS.closeMenu}
              className={styles.HeaderMobileNavCloseButton}
            >
              <Icon.Close className={styles.HeaderMobileNavCloseIcon} />
            </PopoverButton>
            <h2 className={styles.HeaderMobileNavTitle}>
              {HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS.navigation}
            </h2>
          </div>
          {MOBILE_HEADER_NAV_LINKS && (
            <nav className={styles.HeaderMobileNavContent}>
              <ul className={styles.HeaderMobileNavList}>
                {MOBILE_HEADER_NAV_LINKS.map((link) => (
                  <HeaderMobileNavItem
                    key={`${link.label}:${link.href}`}
                    href={link.href}
                    _internalId={_internalId}
                    _debugMode={_debugMode}
                  >
                    {link.label}
                  </HeaderMobileNavItem>
                ))}
              </ul>
            </nav>
          )}
        </PopoverPanel>
      </Popover>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED HEADER MOBILE NAV COMPONENT
// ============================================================================

const MemoizedHeaderMobileNav = React.memo(BaseHeaderMobileNav);

// ============================================================================
// MAIN HEADER MOBILE NAV COMPONENT
// ============================================================================

const HeaderMobileNav: HeaderMobileNavComponent = setDisplayName(
  function HeaderMobileNav(props) {
    const { isMemoized = false, _internalId, _debugMode, ...rest } = props;

    const updatedProps = { ...rest, _internalId, _debugMode };

    const Component = isMemoized
      ? MemoizedHeaderMobileNav
      : BaseHeaderMobileNav;
    const element = <Component {...updatedProps} />;
    return element;
  }
);

export { HeaderMobileNav };
