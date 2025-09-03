"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getLinkTargetProps,
  hasMeaningfulText,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn, isActivePath } from "@web/lib";

import type { CommonNavItemProps } from "../../_data";
import styles from "./HeaderDesktopNavItem.module.css";

// ============================================================================
// BASE HEADER DESKTOP NAV ITEM COMPONENT
// ============================================================================

type HeaderDesktopNavItemComponent = React.FC<CommonNavItemProps>;

/** A desktop navigation item component for the header. */
const BaseHeaderDesktopNavItem: HeaderDesktopNavItemComponent = setDisplayName(
  function BaseHeaderDesktopNavItem(props) {
    const {
      children,
      href = "#",
      target = "_self",
      title = "",
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const pathname = usePathname();
    const isActive = isActivePath(pathname, href || "");

    if ((!hasMeaningfulText(children) && !hasMeaningfulText(href)) || !isActive)
      return null;

    const linkTargetProps = getLinkTargetProps(href?.toString(), target);

    const element = (
      <li
        {...rest}
        data-header-desktop-nav-item-id={`${_internalId}-header-desktop-nav-item`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid="header-desktop-nav-item-root"
      >
        <Link
          href={href}
          target={linkTargetProps.target}
          rel={linkTargetProps.rel}
          title={title}
          className={cn(
            styles.desktopHeaderNavItemLink,
            isActive
              ? styles.desktopHeaderNavItemLinkActive
              : styles.desktopHeaderNavItemLinkHover
          )}
        >
          {children}
          {isActive && (
            <span className={styles.desktopHeaderNavItemActiveIndicator} />
          )}
        </Link>
      </li>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED HEADER DESKTOP NAV ITEM COMPONENT
// ============================================================================

/** A memoized desktop navigation item component. */
const MemoizedHeaderDesktopNavItem = React.memo(BaseHeaderDesktopNavItem);

// ============================================================================
// MAIN HEADER DESKTOP NAV ITEM COMPONENT
// ============================================================================

/** A desktop navigation item component for the header. */
const HeaderDesktopNavItem: HeaderDesktopNavItemComponent = setDisplayName(
  function HeaderDesktopNavItem(props) {
    const {
      children,
      isMemoized = false,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    if (!isRenderableContent(children)) return null;

    const updatedProps = {
      _internalId,
      _debugMode,
      ...rest,
    };

    const Component = isMemoized
      ? MemoizedHeaderDesktopNavItem
      : BaseHeaderDesktopNavItem;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);

export { HeaderDesktopNavItem };
