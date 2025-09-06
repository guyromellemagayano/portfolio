"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  getLinkTargetProps,
  hasMeaningfulText,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { isActivePath } from "@web/lib";

import type { CommonNavItemProps } from "../../_data";
import styles from "./HeaderMobileNavItem.module.css";

// ============================================================================
// BASE HEADER MOBILE NAV ITEM COMPONENT
// ============================================================================

type HeaderMobileNavItemComponent = React.FC<CommonNavItemProps>;

/** A mobile navigation item component for the header. */
const BaseHeaderMobileNavItem: HeaderMobileNavItemComponent = setDisplayName(
  function BaseHeaderMobileNavItem(props) {
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
        data-header-mobile-nav-item-li-id={`${_internalId}-header-mobile-nav-item-li`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid={`${_internalId}-header-mobile-nav-item-root`}
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

const MemoizedHeaderMobileNavItem = React.memo(BaseHeaderMobileNavItem);

// ============================================================================
// MAIN HEADER MOBILE NAV ITEM COMPONENT
// ============================================================================

const HeaderMobileNavItem: HeaderMobileNavItemComponent = setDisplayName(
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

export { HeaderMobileNavItem };
