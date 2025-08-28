import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  getLinkTargetProps,
  hasMeaningfulText,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn, isActivePath } from "@web/lib";

import { type CommonNavItemProps } from "../../_data";
import styles from "./HeaderDesktopNavItem.module.css";

interface HeaderDesktopNavItemProps extends CommonNavItemProps {}
type HeaderDesktopNavItemComponent = React.FC<HeaderDesktopNavItemProps>;

/** A desktop navigation item component for the header. */
const HeaderDesktopNavItem: HeaderDesktopNavItemComponent = setDisplayName(
  function HeaderDesktopNavItem(props) {
    const {
      children,
      href,
      target = "_self",
      title = "",
      internalId,
      debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    const pathname = usePathname();
    const isActive = isActivePath(pathname, href);

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

export { HeaderDesktopNavItem };
