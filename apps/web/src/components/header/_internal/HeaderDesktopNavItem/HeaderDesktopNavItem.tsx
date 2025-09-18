"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn, isActivePath } from "@web/utils";

import { type HeaderNavItemComponent } from "../_types";
import styles from "./HeaderDesktopNavItem.module.css";

// ============================================================================
// BASE HEADER DESKTOP NAV ITEM COMPONENT
// ============================================================================

/** A desktop navigation item component for the header. */
const BaseHeaderDesktopNavItem: HeaderNavItemComponent = setDisplayName(
  function BaseHeaderDesktopNavItem(props) {
    const {
      children,
      href,
      target,
      title,
      className,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const pathname = usePathname();
    const isActive = isActivePath(pathname, href);

    const linkTargetProps = getLinkTargetProps(href?.toString(), target);

    const element = (
      <li
        {...rest}
        className={cn(styles.desktopHeaderNavItem, className)}
        {...createComponentProps(
          _internalId,
          "header-desktop-nav-item",
          _debugMode
        )}
      >
        <Link
          href={href}
          target={linkTargetProps.target}
          rel={linkTargetProps.rel}
          title={title}
          aria-label={title}
          className={cn(
            styles.desktopHeaderNavItemLink,
            isActive
              ? styles.desktopHeaderNavItemLinkActive
              : styles.desktopHeaderNavItemLinkHover
          )}
        >
          {children}
          {isActive && (
            <span className={styles.desktopHeaderNavActiveIndicator} />
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
export const HeaderDesktopNavItem: HeaderNavItemComponent = setDisplayName(
  function HeaderDesktopNavItem(props) {
    const {
      children,
      href,
      isMemoized = false,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    if (!isRenderableContent(children)) return null;

    const updatedProps = {
      ...rest,
      href,
      _internalId: id,
      _debugMode: isDebugMode,
    };

    const Component = isMemoized
      ? MemoizedHeaderDesktopNavItem
      : BaseHeaderDesktopNavItem;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);
