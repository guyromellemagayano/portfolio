import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getLinkTargetProps,
  hasMeaningfulText,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn, isActivePath } from "@web/lib";

import styles from "./HeaderDesktopNavItem.module.css";

interface HeaderDesktopNavItemProps extends React.ComponentProps<"li"> {
  /** Link href */
  href?: React.ComponentProps<typeof Link>["href"];
  /** Link target */
  target?: string;
  /** Link title */
  title?: string;
  /** Internal component ID (managed by parent) */
  _internalId?: string;
  /** Internal debug mode (managed by parent) */
  _debugMode?: boolean;
}
type HeaderDesktopNavItemComponent = React.FC<HeaderDesktopNavItemProps>;

/** A desktop navigation item component for the header. */
const HeaderDesktopNavItem: HeaderDesktopNavItemComponent = setDisplayName(
  function HeaderDesktopNavItem(props) {
    const {
      children,
      href,
      target = "_self",
      title = "",
      _internalId,
      _debugMode,
      ...rest
    } = props;

    // Use internal props directly - no need for useComponentId in sub-components
    const id = _internalId;
    const isDebugMode = _debugMode;

    const pathname = usePathname();
    const isActive = isActivePath(pathname, href || "");

    if ((!hasMeaningfulText(children) && !hasMeaningfulText(href)) || !isActive)
      return null;

    const linkTargetProps = getLinkTargetProps(href?.toString(), target);

    const element = (
      <li
        {...rest}
        data-header-desktop-nav-item-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="header-desktop-nav-item-root"
      >
        <Link
          href={href || "#"}
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

export { HeaderDesktopNavItem };
