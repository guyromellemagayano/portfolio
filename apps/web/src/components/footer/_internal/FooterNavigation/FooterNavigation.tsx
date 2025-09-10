import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  hasValidContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { type FooterLink } from "../../_data";
import styles from "./FooterNavigation.module.css";

// ============================================================================
// FOOTER NAVIGATION COMPONENT TYPES & INTERFACES
// ============================================================================

export interface FooterNavigationProps
  extends Omit<React.ComponentProps<"nav">, "children">,
    CommonComponentProps {
  /** Navigation links to display */
  navLinks?: ReadonlyArray<FooterLink>;
}
export type FooterNavigationComponent = React.FC<FooterNavigationProps>;

// ============================================================================
// BASE FOOTER NAVIGATION COMPONENT
// ============================================================================

/** A base footer navigation component (client, minimal effects split out). */
const BaseFooterNavigation: FooterNavigationComponent = setDisplayName(
  function FooterNavigation(props) {
    const { className, navLinks, _internalId, _debugMode, ...rest } = props;

    const element = (
      <nav
        {...rest}
        className={cn(styles.footerNavigationList, className)}
        {...createComponentProps(_internalId, "footer-navigation", _debugMode)}
      >
        {navLinks?.map(({ kind, label, href }) => {
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
export const FooterNavigation: FooterNavigationComponent = setDisplayName(
  function FooterNavigation(props) {
    const {
      isMemoized = false,
      navLinks,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    if (!hasValidContent(navLinks)) return null;

    const updatedProps = {
      ...rest,
      internalId: id,
      debugMode: isDebugMode,
      navLinks,
    };

    const Component = isMemoized
      ? MemoizedFooterNavigation
      : BaseFooterNavigation;
    const element = <Component {...updatedProps} />;
    return element;
  }
);
