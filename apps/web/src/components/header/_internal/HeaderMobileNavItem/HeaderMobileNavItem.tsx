import React from "react";

import Link from "next/link";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  getLinkTargetProps,
  hasMeaningfulText,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { CommonNavItemProps } from "../../_data";
import styles from "./HeaderMobileNavItem.module.css";

interface HeaderMobileNavItemProps extends CommonNavItemProps {}
type HeaderMobileNavItemComponent = React.FC<HeaderMobileNavItemProps>;

/** A mobile navigation item component for the header. */
const HeaderMobileNavItem: HeaderMobileNavItemComponent = setDisplayName(
  function HeaderMobileNavItem(props) {
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

export { HeaderMobileNavItem };
