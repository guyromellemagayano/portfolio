import React from "react";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Icon } from "@web/components/Icon";

import {
  HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS,
  MOBILE_HEADER_NAV_LINKS,
} from "../../_data";
import { HeaderMobileNavItem } from "../HeaderMobileNavItem";
import styles from "./HeaderMobileNav.module.css";

// ============================================================================
// HEADER MOBILE NAV COMPONENT TYPES & INTERFACES
// ============================================================================

export type HeaderMobileNavProps = React.ComponentProps<typeof Popover> &
  CommonComponentProps;
export type HeaderMobileNavComponent = React.FC<HeaderMobileNavProps>;

// ============================================================================
// BASE HEADER MOBILE NAV COMPONENT
// ============================================================================

/** A mobile navigation component that displays a menu button and a list of links. */
const BaseHeaderMobileNav: HeaderMobileNavComponent = setDisplayName(
  function BaseHeaderMobileNav(props) {
    const { _internalId, _debugMode, ...rest } = props;

    const element = (
      <Popover
        {...rest}
        {...createComponentProps(_internalId, "header-mobile-nav", _debugMode)}
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

    const updatedProps = { ...rest, _internalId: id, _debugMode: isDebugMode };

    const Component = isMemoized
      ? MemoizedHeaderMobileNav
      : BaseHeaderMobileNav;
    const element = <Component {...updatedProps} />;
    return element;
  }
);
