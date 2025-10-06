import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn, isActivePath } from "@web/utils";

import { type HeaderNavItemComponent } from "../data";

// ============================================================================
// BASE HEADER MOBILE NAV ITEM COMPONENT
// ============================================================================

/** A mobile navigation item component for the header. */
const BaseHeaderMobileNavItem: HeaderNavItemComponent = setDisplayName(
  function BaseHeaderMobileNavItem(props) {
    const {
      as: Component = "li",
      children,
      href,
      target,
      title,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const pathname = usePathname();
    const isActive = isActivePath(pathname, href);

    const linkTargetProps = getLinkTargetProps(href?.toString(), target);

    if (!children) return null;

    const element = (
      <Component
        {...rest}
        id={`${componentId}-header-mobile-nav-item`}
        {...createComponentProps(
          componentId,
          "header-mobile-nav-item",
          isDebugMode
        )}
      >
        <Link
          href={href}
          target={linkTargetProps.target}
          rel={linkTargetProps.rel}
          title={title}
          aria-label={title}
          className={cn(
            "relative block py-2 transition",
            isActive
              ? "text-teal-500 dark:text-teal-400"
              : "hover:text-teal-500 dark:hover:text-teal-400"
          )}
        >
          {children}
          {isActive ? (
            <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
          ) : null}
        </Link>
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED HEADER MOBILE NAV ITEM COMPONENT
// ============================================================================

/** A memoized header mobile nav item component. */
const MemoizedHeaderMobileNavItem = React.memo(BaseHeaderMobileNavItem);

// ============================================================================
// MAIN HEADER MOBILE NAV ITEM COMPONENT
// ============================================================================

/** A header mobile nav item component that supports memoization and internal debug props. */
export const HeaderMobileNavItem: HeaderNavItemComponent = setDisplayName(
  function HeaderMobileNavItem(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedHeaderMobileNavItem
      : BaseHeaderMobileNavItem;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
