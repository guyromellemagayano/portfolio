import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import { type FooterLink } from "../../_data";
import styles from "./FooterNavigation.module.css";

interface FooterNavigationProps
  extends Omit<React.ComponentProps<"nav">, "children">,
    ComponentProps {
  /** Navigation links to display */
  navLinks?: ReadonlyArray<FooterLink>;
}

/** Footer navigation subcomponent for displaying navigation links. */
const FooterNavigation: React.FC<FooterNavigationProps> = setDisplayName(
  function FooterNavigation(props) {
    const { className, internalId, debugMode, navLinks, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!navLinks) return null;

    const element = (
      <nav
        {...rest}
        className={cn(styles.footerNavigationList, className)}
        data-footer-navigation-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
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
              <a
                {...targetProps}
                href={hrefString}
                className={styles.footerNavigationLink}
              >
                {label}
              </a>
            </li>
          );
        })}
      </nav>
    );

    return element;
  }
);

export { FooterNavigation };
