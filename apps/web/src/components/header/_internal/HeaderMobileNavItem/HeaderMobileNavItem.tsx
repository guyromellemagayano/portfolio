import React from "react";

import Link from "next/link";

import {
  getLinkTargetProps,
  hasMeaningfulText,
  setDisplayName,
} from "@guyromellemagayano/utils";

import styles from "./HeaderMobileNavItem.module.css";

interface HeaderMobileNavItemProps extends React.ComponentProps<"li"> {
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
type HeaderMobileNavItemComponent = React.FC<HeaderMobileNavItemProps>;

/** A mobile navigation item component for the header. */
const HeaderMobileNavItem: HeaderMobileNavItemComponent = setDisplayName(
  function HeaderMobileNavItem(props) {
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

    if (!hasMeaningfulText(children) && !hasMeaningfulText(href)) return null;

    const linkTargetProps = getLinkTargetProps(href, target);

    const element = (
      <li
        {...rest}
        data-mobile-header-nav-item-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="mobile-header-nav-item-root"
      >
        <Link
          href={href || "#"}
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

export { HeaderMobileNavItem };
