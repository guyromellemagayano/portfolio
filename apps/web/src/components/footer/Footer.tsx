import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import { ComponentProps, setDisplayName } from "@guyromellemagayano/utils";

import { Container } from "@web/components/container";
import { cn } from "@web/lib";

import {
  FOOTER_COMPONENT_LABELS,
  FOOTER_COMPONENT_NAV_LINKS,
  FooterLink,
} from "./_data";
import { FooterLegal, FooterNavigation } from "./_internal";
import styles from "./Footer.module.css";

// ============================================================================
// MAIN FOOTER COMPONENT
// ============================================================================

interface FooterProps
  extends Omit<React.ComponentProps<"footer">, "children">,
    ComponentProps {
  /** Optional custom legal text override */
  legalText?: string;
  /** Optional navigation links override */
  navLinks?: ReadonlyArray<FooterLink>;
}

type FooterCompoundComponent = React.ComponentType<FooterProps> & {
  /** A footer legal component that provides the legal text */
  Legal: typeof FooterLegal;
  /** A footer navigation component that provides navigation links */
  Navigation: typeof FooterNavigation;
};

/** Footer component with all props */
const Footer = setDisplayName(function Footer(props) {
  const {
    className,
    internalId,
    debugMode,
    navLinks = FOOTER_COMPONENT_NAV_LINKS,
    legalText = FOOTER_COMPONENT_LABELS.legalText,
    ...rest
  } = props;

  const { id, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  const element = (
    <footer
      {...rest}
      className={cn(styles.footerComponent, className)}
      data-footer-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
      data-testid="footer-root"
    >
      <Container.Outer>
        <div className={styles.footerContentWrapper}>
          <Container.Inner>
            <div className={styles.footerLayout}>
              <FooterNavigation navLinks={navLinks} />
              <FooterLegal legalText={legalText} />
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );

  return element;
} as FooterCompoundComponent);

// ============================================================================
// FOOTER COMPOUND COMPONENTS
// ============================================================================

Footer.Navigation = FooterNavigation;
Footer.Legal = FooterLegal;

export { Footer };
