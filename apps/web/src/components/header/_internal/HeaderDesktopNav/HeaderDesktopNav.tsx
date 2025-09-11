import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  filterValidNavigationLinks,
  hasValidNavigationLinks,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import {
  DESKTOP_HEADER_NAV_LINKS,
  type HeaderComponentNavLinks,
} from "../../_data";
import { HeaderDesktopNavItem } from "../HeaderDesktopNavItem";
import styles from "./HeaderDesktopNav.module.css";

// ============================================================================
// HEADER DESKTOP NAV COMPONENT TYPES & INTERFACES
// ============================================================================

export interface CommonHeaderNavProps
  extends React.ComponentProps<"nav">,
    CommonComponentProps {
  links?: HeaderComponentNavLinks;
}
export type HeaderDesktopNavComponent = React.FC<CommonHeaderNavProps>;

// ============================================================================
// BASE HEADER DESKTOP NAV COMPONENT
// ============================================================================

/** Renders a desktop navigation component that displays a list of navigation links. */
const BaseHeaderDesktopNav: HeaderDesktopNavComponent = setDisplayName(
  function BaseHeaderDesktopNav(props) {
    const { className, _internalId, _debugMode, links, ...rest } = props;

    const element = (
      <nav
        {...rest}
        className={cn(styles.HeaderDesktopNavList, className)}
        {...createComponentProps(_internalId, "header-desktop-nav", _debugMode)}
      >
        {links?.map(({ label, href }) => (
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
export const HeaderDesktopNav: HeaderDesktopNavComponent = setDisplayName(
  function HeaderDesktopNav(props) {
    const {
      links = DESKTOP_HEADER_NAV_LINKS,
      isMemoized = false,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const validLinks = filterValidNavigationLinks(links);
    if (!hasValidNavigationLinks(validLinks)) return null;

    const updatedProps = {
      ...rest,
      links,
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
