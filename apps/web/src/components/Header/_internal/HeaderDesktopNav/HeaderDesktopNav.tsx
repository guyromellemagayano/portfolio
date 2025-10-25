import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  filterValidNavigationLinks,
  hasValidNavigationLinks,
  setDisplayName,
} from "@guyromellemagayano/utils";

import {
  DESKTOP_HEADER_NAV_LINKS,
  type HeaderComponentNavLinks,
} from "../../Header.data";
import { HeaderDesktopNavItem } from "../HeaderDesktopNavItem";

// ============================================================================
// HEADER DESKTOP NAV COMPONENT TYPES & INTERFACES
// ============================================================================

export interface HeaderDesktopNavProps
  extends React.ComponentPropsWithRef<"nav">,
    CommonComponentProps {}
export type HeaderDesktopNavComponent = React.FC<HeaderDesktopNavProps>;

// ============================================================================
// BASE HEADER DESKTOP NAV COMPONENT
// ============================================================================

const BaseHeaderDesktopNav: HeaderDesktopNavComponent = setDisplayName(
  function BaseHeaderDesktopNav(props) {
    const { as: Component = "nav", debugId, debugMode, ...rest } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const navLinks: HeaderComponentNavLinks = DESKTOP_HEADER_NAV_LINKS;
    const validLinks = filterValidNavigationLinks(navLinks);
    if (!hasValidNavigationLinks(validLinks)) return null;

    const element = hasValidNavigationLinks(navLinks) ? (
      <Component
        {...rest}
        {...createComponentProps(
          componentId,
          "header-desktop-nav",
          isDebugMode
        )}
      >
        <ul
          className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
          {...createComponentProps(
            componentId,
            "header-desktop-nav-list",
            isDebugMode
          )}
        >
          {navLinks.map(({ label, href }) => (
            <HeaderDesktopNavItem
              key={`${label}:${href}`}
              href={href}
              debugId={componentId}
              debugMode={isDebugMode}
            >
              {label}
            </HeaderDesktopNavItem>
          ))}
        </ul>
      </Component>
    ) : null;

    return element;
  }
);

// ============================================================================
// MEMOIZED HEADER DESKTOP NAV COMPONENT
// ============================================================================

const MemoizedHeaderDesktopNav = React.memo(BaseHeaderDesktopNav);

// ============================================================================
// MAIN HEADER DESKTOP NAV COMPONENT
// ============================================================================

export const HeaderDesktopNav: HeaderDesktopNavComponent = setDisplayName(
  function HeaderDesktopNav(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedHeaderDesktopNav
      : BaseHeaderDesktopNav;
    const element = <Component {...rest} />;
    return element;
  }
);
