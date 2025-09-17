import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  filterValidNavigationLinks,
  getLinkTargetProps,
  hasValidNavigationLinks,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { FOOTER_COMPONENT_NAV_LINKS } from "../_data";
import { type FooterLink } from "../_types";
import styles from "./FooterNavigation.module.css";

// ============================================================================
// FOOTER NAVIGATION COMPONENT TYPES & INTERFACES
// ============================================================================

export interface FooterNavigationProps
  extends Omit<React.ComponentProps<"nav">, "children">,
    Omit<CommonComponentProps, "as"> {
  links?: ReadonlyArray<FooterLink>;
}
export type FooterNavigationComponent = React.FC<FooterNavigationProps>;

// ============================================================================
// BASE FOOTER NAVIGATION COMPONENT
// ============================================================================

/** A base footer navigation component (client, minimal effects split out). */
const BaseFooterNavigation: FooterNavigationComponent = setDisplayName(
  function FooterNavigation(props) {
    const { className, links, _internalId, _debugMode, ...rest } = props;

    const element = links ? (
      <nav
        {...rest}
        className={cn(styles.footerNavigationList, className)}
        {...createComponentProps(_internalId, "footer-navigation", _debugMode)}
      >
        {links.map(({ kind, label, href }) => {
          const isExternal = kind === "external";
          const hrefString = isExternal ? href : href?.toString() || "";

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
    ) : null;

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
    const { isMemoized = false, _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const navLinks: ReadonlyArray<FooterLink> = FOOTER_COMPONENT_NAV_LINKS;
    const validNavLinks = filterValidNavigationLinks(navLinks);
    if (!hasValidNavigationLinks(validNavLinks)) return null;

    const updatedProps = {
      ...rest,
      links: validNavLinks,
      _internalId: id,
      _debugMode: isDebugMode,
    };

    const Component = isMemoized
      ? MemoizedFooterNavigation
      : BaseFooterNavigation;
    const element = <Component {...updatedProps} />;
    return element;
  }
);
