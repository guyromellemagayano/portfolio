import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  filterValidNavigationLinks,
  hasValidNavigationLinks,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import {
  CommonHeaderNavProps,
  DESKTOP_HEADER_NAV_LINKS,
  HeaderComponentNavLinks,
} from "../../_data";
import { HeaderDesktopNavItem } from "../HeaderDesktopNavItem";
import styles from "./HeaderDesktopNav.module.css";

// ============================================================================
// HEADER DESKTOP NAV COMPONENT TYPES & INTERFACES
// ============================================================================

export interface HeaderDesktopNavProps
  extends React.ComponentProps<"nav">,
    CommonHeaderNavProps {}
export type HeaderDesktopNavComponent = React.FC<HeaderDesktopNavProps>;

// ============================================================================
// BASE HEADER DESKTOP NAV COMPONENT
// ============================================================================

/** Renders a desktop navigation component that displays a list of navigation links. */
const BaseHeaderDesktopNav: HeaderDesktopNavComponent = setDisplayName(
  function BaseHeaderDesktopNav(props) {
    const { className, links, _internalId, _debugMode, ...rest } = props;

    const element = links ? (
      <nav
        {...rest}
        className={cn(styles.HeaderDesktopNavList, className)}
        {...createComponentProps(_internalId, "header-desktop-nav", _debugMode)}
      >
        {links.map(({ label, href }) => (
          <HeaderDesktopNavItem
            key={`${label}:${href}`}
            href={href}
            _internalId={_internalId}
            _debugMode={_debugMode}
          >
            {label}
          </HeaderDesktopNavItem>
        ))}
      </nav>
    ) : null;

    return element;
  }
);

// ============================================================================
// MEMOIZED HEADER DESKTOP NAV COMPONENT
// ============================================================================

/** A memoized desktop navigation component that displays a list of navigation links. */
const MemoizedHeaderDesktopNav = React.memo(BaseHeaderDesktopNav);

// ============================================================================
// MAIN HEADER DESKTOP NAV COMPONENT
// ============================================================================

/** Renders the desktop navigation component that displays a list of navigation links. */
export const HeaderDesktopNav: HeaderDesktopNavComponent = setDisplayName(
  function HeaderDesktopNav(props) {
    const { isMemoized = false, _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const navLinks: HeaderComponentNavLinks = DESKTOP_HEADER_NAV_LINKS;
    const validLinks = filterValidNavigationLinks(navLinks);
    if (!hasValidNavigationLinks(validLinks)) return null;

    const updatedProps = {
      ...rest,
      links: validLinks,
      _internalId: id,
      _debugMode: isDebugMode,
    };

    const Component = isMemoized
      ? MemoizedHeaderDesktopNav
      : BaseHeaderDesktopNav;
    const element = <Component {...updatedProps} />;
    return element;
  }
);
