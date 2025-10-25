import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { ContainerInner, ContainerOuter } from "@web/components";
import { cn } from "@web/utils";

import { FooterLegal, FooterNavigation } from "./_internal";
import { type FooterComponentLabels } from "./Footer.data";

// ============================================================================
// FOOTER COMPONENT TYPES & INTERFACES
// ============================================================================

export interface FooterProps
  extends React.ComponentProps<"footer">,
    FooterComponentLabels,
    CommonComponentProps {
  /** Whether to enable memoization */
  isMemoized?: boolean;
}
export type FooterComponent = React.FC<FooterProps>;

// ============================================================================
// BASE FOOTER COMPONENT
// ============================================================================

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
      role="contentinfo"
      className={cn("mt-32 flex-none", className)}
      {...createComponentProps(componentId, "footer", isDebugMode)}
    >
      <ContainerOuter>
        <div
          className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40"
          {...createComponentProps(
            componentId,
            "footer-container-outer",
            isDebugMode
          )}
        >
          <ContainerInner>
            <div
              className="flex flex-col items-center justify-between gap-6 md:flex-row"
              {...createComponentProps(
                componentId,
                "footer-container-inner",
                isDebugMode
              )}
            >
              <FooterNavigation />
              <FooterLegal />
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

const MemoizedFooter = React.memo(BaseFooter);

// ============================================================================
// MAIN FOOTER COMPONENT
// ============================================================================

export const Footer: FooterComponent = setDisplayName(function Footer(props) {
  const { isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedFooter : BaseFooter;
  const element = <Component {...rest} />;
  return element;
});
