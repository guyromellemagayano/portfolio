import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { ContainerInner, ContainerOuter } from "@web/components";
import { type FooterComponent } from "@web/components/_shared";
import { cn } from "@web/utils";

import { FooterLegal, FooterNavigation } from "./_internal";
import styles from "./Footer.module.css";

// ============================================================================
// BASE FOOTER COMPONENT
// ============================================================================

/** A base footer component (client, minimal effects split out). */
const BaseFooter: FooterComponent = setDisplayName(function BaseFooter(props) {
  const {
    as: Component = "footer",
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  const element = (
    <Component
      {...rest}
      id={rest.id || `${componentId}-footer`}
      className={cn(styles.footerComponent, className)}
      {...createComponentProps(componentId, "footer", isDebugMode)}
    >
      <ContainerOuter debugId={componentId} debugMode={isDebugMode}>
        <div
          id={`${componentId}-footer-content-wrapper`}
          className={styles.footerContentWrapper}
          {...createComponentProps(
            componentId,
            "footer-content-wrapper",
            isDebugMode
          )}
        >
          <ContainerInner debugId={componentId} debugMode={isDebugMode}>
            <div
              id={`${componentId}-footer-layout`}
              className={styles.footerLayout}
              {...createComponentProps(
                componentId,
                "footer-layout",
                isDebugMode
              )}
            >
              <FooterNavigation debugId={componentId} debugMode={isDebugMode} />
              <FooterLegal debugId={componentId} debugMode={isDebugMode} />
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </Component>
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
  const { isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedFooter : BaseFooter;
  const element = <Component {...rest} />;
  return element;
});

export default Footer;
