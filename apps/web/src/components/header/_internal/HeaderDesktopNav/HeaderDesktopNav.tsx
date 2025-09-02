import React from "react";

import {
  filterValidNavigationLinks,
  hasValidNavigationLinks,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import { DESKTOP_HEADER_NAV_LINKS } from "../../_data";
import { HeaderDesktopNavItem } from "../HeaderDesktopNavItem";
import styles from "./HeaderDesktopNav.module.css";

// ============================================================================
// BASE HEADER DESKTOP NAV COMPONENT
// ============================================================================

interface HeaderDesktopNavProps extends React.ComponentProps<"nav"> {
  /** Whether the component is memoized */
  isMemoized?: boolean;
  /** Internal component ID (managed by parent) */
  _internalId?: string;
  /** Internal debug mode (managed by parent) */
  _debugMode?: boolean;
}
type HeaderDesktopNavComponent = React.FC<HeaderDesktopNavProps>;

/** Renders a desktop navigation component that displays a list of navigation links. */
const BaseHeaderDesktopNav: HeaderDesktopNavComponent = setDisplayName(
  function BaseHeaderDesktopNav(props) {
    const { className, _internalId, _debugMode, ...rest } = props;

    // Use shared utility for robust navigation links validation
    // Function now automatically handles readonly arrays
    const validLinks = filterValidNavigationLinks(DESKTOP_HEADER_NAV_LINKS);

    if (!hasValidNavigationLinks(validLinks)) return null;

    const element = (
      <nav
        {...rest}
        className={cn(styles.HeaderDesktopNavList, className)}
        data-desktop-header-nav-id={_internalId}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid="desktop-header-nav-root"
      >
        {validLinks.map(({ label, href }) => (
          <HeaderDesktopNavItem key={`${label}:${href}`} href={href}>
            {label}
          </HeaderDesktopNavItem>
        ))}
      </nav>
    );

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
const HeaderDesktopNav: HeaderDesktopNavComponent = setDisplayName(
  function HeaderDesktopNav(props) {
    const { isMemoized = false, _internalId, _debugMode, ...rest } = props;

    // Pass internal props directly - no transformation needed
    const updatedProps = {
      ...rest,
      _internalId,
      _debugMode,
    };

    const Component = isMemoized
      ? MemoizedHeaderDesktopNav
      : BaseHeaderDesktopNav;
    const element = <Component {...updatedProps} />;
    return element;
  }
);

export { HeaderDesktopNav };
