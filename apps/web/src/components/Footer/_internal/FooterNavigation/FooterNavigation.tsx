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

import { FOOTER_COMPONENT_NAV_LINKS, type FooterLink } from "../../Footer.data";

// ============================================================================
// FOOTER NAVIGATION COMPONENT TYPES & INTERFACES
// ============================================================================

export interface FooterNavigationProps
  extends React.ComponentProps<"nav">,
    CommonComponentProps {
  /** Navigation links */
  links?: ReadonlyArray<FooterLink>;
  /** Whether to enable memoization */
  isMemoized?: boolean;
}
export type FooterNavigationComponent = React.FC<FooterNavigationProps>;

// ============================================================================
// BASE FOOTER NAVIGATION COMPONENT
// ============================================================================

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

    const element = (
      <Component
        {...rest}
        role="navigation"
        className={cn(
          "flex list-none flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200",
          className
        )}
        {...createComponentProps(componentId, "footer-navigation", isDebugMode)}
      >
        {hasValidNavigationLinks(validNavLinks)
          ? validNavLinks.map(({ kind, label, href }) => {
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
                  {...createComponentProps(
                    componentId,
                    "footer-navigation-item",
                    isDebugMode
                  )}
                >
                  <Link
                    {...targetProps}
                    href={hrefString}
                    className="transition hover:text-teal-500 dark:hover:text-teal-400"
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
            })
          : null}
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED FOOTER NAVIGATION COMPONENT
// ============================================================================

const MemoizedFooterNavigation = React.memo(BaseFooterNavigation);

// ============================================================================
// MAIN FOOTER NAVIGATION COMPONENT
// ============================================================================

export const FooterNavigation: FooterNavigationComponent = setDisplayName(
  function FooterNavigation(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedFooterNavigation
      : BaseFooterNavigation;
    const element = <Component {...rest} />;
    return element;
  }
);
