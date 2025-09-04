import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { hasMeaningfulText, setDisplayName } from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import {
  FOOTER_COMPONENT_LABELS,
  type FooterComponentLabels,
} from "../../_data";
import styles from "./FooterLegal.module.css";

// ============================================================================
// BASE FOOTER LEGAL COMPONENT
// ============================================================================

interface FooterLegalProps
  extends Omit<React.ComponentProps<"p">, "children">,
    FooterComponentLabels,
    CommonComponentProps {}
type FooterLegalComponent = React.FC<FooterLegalProps>;

/** A base footer legal component (client, minimal effects split out). */
const BaseFooterLegal: FooterLegalComponent = setDisplayName(
  function BaseFooterLegal(props) {
    const { className, legalText, _internalId, _debugMode, ...rest } = props;

    if (!hasMeaningfulText(legalText)) return null;

    const element = (
      <p
        {...rest}
        className={cn(styles.footerLegal, className)}
        data-footer-legal-id={`${_internalId}-footer-legal`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid="footer-legal-root"
      >
        {legalText}
      </p>
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
const FooterLegal: FooterLegalComponent = setDisplayName(
  function FooterLegal(props) {
    const {
      isMemoized = false,
      legalText = FOOTER_COMPONENT_LABELS.legalText,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const updatedProps = { ...rest, _internalId, _debugMode, legalText };

    if (!hasMeaningfulText(legalText)) return null;

    const Component = isMemoized ? MemoizedFooterLegal : BaseFooterLegal;
    const element = <Component {...updatedProps} />;
    return element;
  }
);

export { FooterLegal };
