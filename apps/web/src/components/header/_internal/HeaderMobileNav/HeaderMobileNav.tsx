import React from "react";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";

import { setDisplayName } from "@guyromellemagayano/utils";

import { Icon } from "@web/components/icon";

import {
  HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS,
  MOBILE_HEADER_NAV_LINKS,
} from "../../_data";
import { HeaderMobileNavItem } from "../HeaderMobileNavItem";
import styles from "./HeaderMobileNav.module.css";

interface HeaderMobileNavProps extends React.ComponentProps<"div"> {
  /** Internal component ID (managed by parent) */
  _internalId?: string;
  /** Internal debug mode (managed by parent) */
  _debugMode?: boolean;
}
type HeaderMobileNavComponent = React.FC<HeaderMobileNavProps>;

/** A mobile navigation component that displays a menu button and a list of links. */
const HeaderMobileNav: HeaderMobileNavComponent = setDisplayName(
  function HeaderMobileNav(props) {
    const { _internalId, _debugMode, ...rest } = props;

    // Use internal props directly - no need for useComponentId in sub-components
    const id = _internalId;
    const isDebugMode = _debugMode;

    const element = (
      <Popover
        {...rest}
        data-mobile-header-nav-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="mobile-header-nav-root"
      >
        <PopoverButton className={styles.HeaderMobileNavButton}>
          {HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS.menu}
          <Icon.ChevronDown className={styles.HeaderMobileNavChevron} />
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

export { HeaderMobileNav };
