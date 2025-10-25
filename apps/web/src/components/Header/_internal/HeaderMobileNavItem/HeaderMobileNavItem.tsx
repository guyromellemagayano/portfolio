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

import { type HeaderNavItemComponent } from "../../Header.types";

// ============================================================================
// BASE HEADER MOBILE NAV ITEM COMPONENT
// ============================================================================

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
          {...createComponentProps(
            componentId,
            "header-mobile-nav-item-link",
            isDebugMode
          )}
        >
          {children}
        </Link>
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED HEADER MOBILE NAV ITEM COMPONENT
// ============================================================================

const MemoizedHeaderMobileNavItem = React.memo(BaseHeaderMobileNavItem);

// ============================================================================
// MAIN HEADER MOBILE NAV ITEM COMPONENT
// ============================================================================

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
