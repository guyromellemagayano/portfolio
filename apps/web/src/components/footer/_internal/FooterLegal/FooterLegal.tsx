import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import {
  FOOTER_COMPONENT_LABELS,
  FooterComponentLabels,
  type FooterLegalComponent,
} from "@web/components/_shared";
import { cn } from "@web/utils";

import styles from "./FooterLegal.module.css";

// ============================================================================
// BASE FOOTER LEGAL COMPONENT
// ============================================================================

/** A base footer legal component (client, minimal effects split out). */
const BaseFooterLegal: FooterLegalComponent = setDisplayName(
  function BaseFooterLegal(props) {
    const {
      as: Component = "p",
      className,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const legalText: FooterComponentLabels["legalText"] =
      FOOTER_COMPONENT_LABELS.legalText;
    if (!legalText) return null;

    const element = (
      <Component
        {...rest}
        id={`${componentId}-footer-legal`}
        className={cn(styles.footerLegal, className)}
        {...createComponentProps(componentId, "footer-legal", isDebugMode)}
      >
        {legalText}
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED FOOTER LEGAL COMPONENT
// ============================================================================

/** A memoized footer legal component. */
const MemoizedFooterLegal = React.memo(BaseFooterLegal);

// ============================================================================
// MAIN FOOTER LEGAL COMPONENT
// ============================================================================

/** The main footer legal component for the application. */
export const FooterLegal: FooterLegalComponent = setDisplayName(
  function FooterLegal(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedFooterLegal : BaseFooterLegal;
    const element = <Component {...rest} />;
    return element;
  }
);
