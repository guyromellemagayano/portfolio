import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { setDisplayName } from "@guyromellemagayano/utils";

import { Container } from "@web/components/Container";
import { cn } from "@web/utils";

import {
  FOOTER_COMPONENT_LABELS,
  FOOTER_COMPONENT_NAV_LINKS,
  FooterComponentLabels,
} from "./_data";
import { FooterLegal, FooterNavigation } from "./_internal";
import styles from "./Footer.module.css";

// ============================================================================
// BASE FOOTER COMPONENT
// ============================================================================

interface FooterProps
  extends Omit<React.ComponentProps<"footer">, "children">,
    FooterComponentLabels,
    CommonComponentProps {}
type FooterComponent = React.FC<FooterProps>;

/** A base footer component (client, minimal effects split out). */
const BaseFooter: FooterComponent = setDisplayName(function BaseFooter(props) {
  const {
    className,
    internalId,
    debugMode,
    navLinks = FOOTER_COMPONENT_NAV_LINKS,
    legalText = FOOTER_COMPONENT_LABELS.legalText,
    ...rest
  } = props;

  const element = (
    <footer
      {...rest}
      className={cn(styles.footerComponent, className)}
      data-footer-id={`${internalId}-footer`}
      data-debug-mode={debugMode ? "true" : undefined}
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
});

// ============================================================================
// MEMOIZED FOOTER COMPONENT
// ============================================================================

/** A memoized footer component. */
const MemoizedFooter = React.memo(BaseFooter);

// ============================================================================
// MAIN FOOTER COMPONENT
// ============================================================================

/** The main footer component for the application. */
const Footer: FooterComponent = setDisplayName(function Footer(props) {
  const {
    isMemoized = false,
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

  const updatedProps = {
    ...rest,
    internalId: id,
    debugMode: isDebugMode,
    navLinks,
    legalText,
  };

  const Component = isMemoized ? MemoizedFooter : BaseFooter;
  const element = <Component {...updatedProps} />;
  return element;
});

export { Footer };
