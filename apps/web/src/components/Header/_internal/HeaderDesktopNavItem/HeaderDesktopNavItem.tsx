"use client";

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
// BASE HEADER DESKTOP NAV ITEM COMPONENT
// ============================================================================

const BaseHeaderDesktopNavItem: HeaderNavItemComponent = setDisplayName(
  function BaseHeaderDesktopNavItem(props) {
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
          "header-desktop-nav-item",
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
            "relative block px-3 py-2 transition",
            isActive
              ? "text-teal-500 dark:text-teal-400"
              : "hover:text-teal-500 dark:hover:text-teal-400"
          )}
          {...createComponentProps(
            componentId,
            "header-desktop-nav-item-link",
            isDebugMode
          )}
        >
          {children}
          {isActive ? (
            <span
              className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"
              {...createComponentProps(
                componentId,
                "header-desktop-nav-item-link-active-span",
                isDebugMode
              )}
            />
          ) : null}
        </Link>
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED BASE HEADER DESKTOP NAV ITEM COMPONENT
// ============================================================================

const MemoizedHeaderDesktopNavItem = React.memo(BaseHeaderDesktopNavItem);

// ============================================================================
// MAIN HEADER DESKTOP NAV ITEM COMPONENT
// ============================================================================

export const HeaderDesktopNavItem: HeaderNavItemComponent = setDisplayName(
  function HeaderDesktopNavItem(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedHeaderDesktopNavItem
      : BaseHeaderDesktopNavItem;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
