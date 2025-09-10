import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  filterValidNavigationLinks,
  hasValidNavigationLinks,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { DESKTOP_HEADER_NAV_LINKS } from "../../_data";
import { HeaderDesktopNavItem } from "../HeaderDesktopNavItem";
import styles from "./HeaderDesktopNav.module.css";

// ============================================================================
// BASE HEADER DESKTOP NAV COMPONENT
// ============================================================================

interface CommonHeaderNavProps
  extends React.ComponentProps<"nav">,
    CommonComponentProps {}
type HeaderDesktopNavComponent = React.FC<CommonHeaderNavProps>;

/** Renders a desktop navigation component that displays a list of navigation links. */
const BaseHeaderDesktopNav: HeaderDesktopNavComponent = setDisplayName(
  function BaseHeaderDesktopNav(props) {
    const { className, _internalId, _debugMode, ...rest } = props;

    const validLinks = filterValidNavigationLinks(DESKTOP_HEADER_NAV_LINKS);
    if (!hasValidNavigationLinks(validLinks)) return null;

    const element = (
      <nav
        {...rest}
        className={cn(styles.HeaderDesktopNavList, className)}
        data-header-desktop-nav-id={`header-${_internalId}-desktop-nav`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid={`header-${_internalId}-desktop-nav-root`}
      >
        {validLinks.map(({ label, href }) => (
          <HeaderDesktopNavItem
            key={`${label}:${href}`}
            href={href}
            internalId={_internalId}
            debugMode={_debugMode}
          >
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

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const updatedProps = {
      ...rest,
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

export { HeaderDesktopNav };
