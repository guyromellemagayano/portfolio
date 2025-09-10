import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasMeaningfulText,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import {
  FOOTER_COMPONENT_LABELS,
  type FooterComponentLabels,
} from "../../_data";
import styles from "./FooterLegal.module.css";

// ============================================================================
// FOOTER LEGAL COMPONENT TYPES & INTERFACES
// ============================================================================

export interface FooterLegalProps
  extends Omit<React.ComponentProps<"p">, "children">,
    FooterComponentLabels,
    CommonComponentProps {}
export type FooterLegalComponent = React.FC<FooterLegalProps>;

// ============================================================================
// BASE FOOTER LEGAL COMPONENT
// ============================================================================

/** A base footer legal component (client, minimal effects split out). */
const BaseFooterLegal: FooterLegalComponent = setDisplayName(
  function BaseFooterLegal(props) {
    const { className, legalText, _internalId, _debugMode, ...rest } = props;

    const element = (
      <p
        {...rest}
        className={cn(styles.footerLegal, className)}
        {...createComponentProps(_internalId, "footer-legal", _debugMode)}
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
export const FooterLegal: FooterLegalComponent = setDisplayName(
  function FooterLegal(props) {
    const {
      isMemoized = false,
      legalText = FOOTER_COMPONENT_LABELS.legalText,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    if (!hasMeaningfulText(legalText)) return null;

    const updatedProps = {
      ...rest,
      _internalId: id,
      _debugMode: isDebugMode,
      legalText,
    };

    const Component = isMemoized ? MemoizedFooterLegal : BaseFooterLegal;
    const element = <Component {...updatedProps} />;
    return element;
  }
);
