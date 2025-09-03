import React from "react";

import Link from "next/link";

import {
  type ComponentProps,
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import { type FooterLink } from "../../_data";
import styles from "./FooterNavigation.module.css";

// ============================================================================
// BASE FOOTER NAVIGATION COMPONENT
// ============================================================================

interface FooterNavigationProps
  extends Omit<React.ComponentProps<"nav">, "children">,
    ComponentProps {
  /** Navigation links to display */
  navLinks?: ReadonlyArray<FooterLink>;
}
type FooterNavigationComponent = React.FC<FooterNavigationProps>;

/** A base footer navigation component (client, minimal effects split out). */
const BaseFooterNavigation: FooterNavigationComponent = setDisplayName(
  function FooterNavigation(props) {
    const { className, navLinks, _internalId, _debugMode, ...rest } = props;

    if (!navLinks) return null;

    const element = (
      <nav
        {...rest}
        className={cn(styles.footerNavigationList, className)}
        data-footer-navigation-id={`${_internalId}-footer-navigation`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid="footer-navigation-root"
      >
        {navLinks.map(({ kind, label, href }) => {
          const isExternal = kind === "external";
          const hrefString = isExternal ? href : href?.toString() || "";

          if (!isValidLink(hrefString)) {
            return (
              <li key={label} className={styles.footerNavigationItem}>
                {label}
              </li>
            );
          }

          const targetProps = getLinkTargetProps(
            hrefString,
            isExternal ? "_blank" : "_self"
          );

          return (
            <li key={label} className={styles.footerNavigationItem}>
              <Link
                {...targetProps}
                href={hrefString}
                className={styles.footerNavigationLink}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </nav>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED FOOTER NAVIGATION COMPONENT
// ============================================================================

/** A memoized footer navigation component. */
const MemoizedFooterNavigation = React.memo(BaseFooterNavigation);

// ============================================================================
// MAIN FOOTER NAVIGATION COMPONENT
// ============================================================================

/** The main footer navigation component for the application. */
const FooterNavigation: FooterNavigationComponent = setDisplayName(
  function FooterNavigation(props) {
    const {
      isMemoized = false,
      navLinks,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const updatedProps = { ...rest, _internalId, _debugMode, navLinks };

    const Component = isMemoized
      ? MemoizedFooterNavigation
      : BaseFooterNavigation;
    const element = <Component {...updatedProps} />;
    return element;
  }
);

export { FooterNavigation };
