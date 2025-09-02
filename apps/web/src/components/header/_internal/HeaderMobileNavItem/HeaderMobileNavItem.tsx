"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  type ComponentProps,
  getLinkTargetProps,
  hasMeaningfulText,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { isActivePath } from "@web/lib";

import styles from "./HeaderMobileNavItem.module.css";

// ============================================================================
// BASE HEADER MOBILE NAV ITEM COMPONENT
// ============================================================================

interface HeaderMobileNavItemProps
  extends React.ComponentProps<"li">,
    Pick<React.ComponentProps<typeof Link>, "target" | "title">,
    ComponentProps {
  /** Link href */
  href?: React.ComponentProps<typeof Link>["href"];
}
type HeaderMobileNavItemComponent = React.FC<HeaderMobileNavItemProps>;

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
        data-header-mobile-nav-item-id={`${_internalId}-header-mobile-nav-item`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid="header-mobile-nav-item-root"
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

    if (!isRenderableContent(children)) return null;

    const updatedProps = { ...rest, _internalId, _debugMode };

    const Component = isMemoized
      ? MemoizedHeaderMobileNavItem
      : BaseHeaderMobileNavItem;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);

export { HeaderMobileNavItem };
