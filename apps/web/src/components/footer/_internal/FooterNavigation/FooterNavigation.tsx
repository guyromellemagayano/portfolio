import React from "react";

import Link from "next/link";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  filterValidNavigationLinks,
  getLinkTargetProps,
  hasValidNavigationLinks,
  setDisplayName,
} from "@guyromellemagayano/utils";

import {
  FOOTER_COMPONENT_NAV_LINKS,
  FooterLink,
  type FooterNavigationComponent,
} from "@web/components/_shared";
import { cn } from "@web/utils";

import styles from "./FooterNavigation.module.css";

// ============================================================================
// BASE FOOTER NAVIGATION COMPONENT
// ============================================================================

/** A base footer navigation component (client, minimal effects split out). */
const BaseFooterNavigation: FooterNavigationComponent = setDisplayName(
  function FooterNavigation(props) {
    const {
      as: Component = "nav",
      className,
      links = FOOTER_COMPONENT_NAV_LINKS,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const navLinks: ReadonlyArray<FooterLink> = links;
    const validNavLinks = filterValidNavigationLinks(navLinks);
    if (!hasValidNavigationLinks(validNavLinks)) return null;

    const element = (
      <Component
        {...rest}
        id={`${componentId}-footer-navigation`}
        className={cn(styles.footerNavigationList, className)}
        {...createComponentProps(componentId, "footer-navigation", isDebugMode)}
      >
        {validNavLinks.map(({ kind, label, href }) => {
          const isExternal = kind === "external";
          const hrefString = isExternal ? href : href?.toString() || "";
          const hasLabelandLink =
            typeof label === "string" &&
            label.length > 0 &&
            hrefString.length > 0;

          const targetProps = getLinkTargetProps(
            hrefString,
            isExternal ? "_blank" : "_self"
          );

          if (!hasLabelandLink) return null;

          const element = (
            <li
              key={`${componentId}-footer-navigation-item-${label}`}
              id={`${componentId}-footer-navigation-item-${label}`}
              className={styles.footerNavigationItem}
              {...createComponentProps(
                componentId,
                "footer-navigation-item",
                isDebugMode
              )}
            >
              <Link
                {...targetProps}
                href={hrefString}
                className={styles.footerNavigationLink}
                {...createComponentProps(
                  componentId,
                  "footer-navigation-link",
                  isDebugMode
                )}
              >
                {label}
              </Link>
            </li>
          );

          return element;
        })}
      </Component>
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
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedFooterNavigation
      : BaseFooterNavigation;
    const element = <Component {...rest} />;
    return element;
  }
);

export default FooterNavigation;
