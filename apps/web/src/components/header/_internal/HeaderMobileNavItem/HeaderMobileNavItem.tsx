"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  hasMeaningfulText,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { isActivePath } from "@web/utils";

import type { HeaderNavItemComponent } from "../../_data";
import styles from "./HeaderMobileNavItem.module.css";

// ============================================================================
// BASE HEADER MOBILE NAV ITEM COMPONENT
// ============================================================================

/** A mobile navigation item component for the header. */
const BaseHeaderMobileNavItem: HeaderNavItemComponent = setDisplayName(
  function BaseHeaderMobileNavItem(props) {
    const { children, href, target, title, _internalId, _debugMode, ...rest } =
      props;

    const pathname = usePathname();
    const isActive = isActivePath(pathname, href || "");

    if ((!hasMeaningfulText(children) && !hasMeaningfulText(href)) || !isActive)
      return null;

    const linkTargetProps = getLinkTargetProps(href?.toString(), target);

    const element = (
      <li
        {...rest}
        {...createComponentProps(
          _internalId,
          "header-mobile-nav-item",
          _debugMode
        )}
      >
        <Link
          href={href}
          target={linkTargetProps.target}
          rel={linkTargetProps.rel}
          title={title}
          className={styles.mobileHeaderNavItemLink}
        >
          {children}
        </Link>
      </li>
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
    const {
      children,
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

    const updatedProps = { ...rest, _internalId: id, _debugMode: isDebugMode };

    const Component = isMemoized
      ? MemoizedHeaderMobileNavItem
      : BaseHeaderMobileNavItem;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);
