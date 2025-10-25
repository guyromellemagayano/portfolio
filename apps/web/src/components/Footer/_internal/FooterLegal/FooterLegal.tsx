import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import {
  FOOTER_COMPONENT_LABELS,
  type FooterComponentLabels,
} from "../../Footer.data";

// ============================================================================
// FOOTER LEGAL COMPONENT TYPES & INTERFACES
// ============================================================================

export interface FooterLegalProps
  extends React.ComponentProps<"p">,
    FooterComponentLabels,
    CommonComponentProps {
  /** Whether to enable memoization */
  isMemoized?: boolean;
}
export type FooterLegalComponent = React.FC<FooterLegalProps>;

// ============================================================================
// BASE FOOTER LEGAL COMPONENT
// ============================================================================

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
        aria-label={legalText}
        className={cn("text-sm text-zinc-400 dark:text-zinc-500", className)}
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

const MemoizedFooterLegal = React.memo(BaseFooterLegal);

// ============================================================================
// MAIN FOOTER LEGAL COMPONENT
// ============================================================================

export const FooterLegal: FooterLegalComponent = setDisplayName(
  function FooterLegal(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedFooterLegal : BaseFooterLegal;
    const element = <Component {...rest} />;
    return element;
  }
);
