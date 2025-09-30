import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { ContainerInner, ContainerOuter } from "@web/components";
import { cn } from "@web/utils";

import { FooterComponentLabels } from "./data";
import { FooterLegal, FooterNavigation } from "./internal";

// ============================================================================
// FOOTER COMPONENT TYPES & INTERFACES
// ============================================================================

/** `Footer` component props. */
export interface FooterProps
  extends React.ComponentProps<"footer">,
    FooterComponentLabels,
    CommonComponentProps {}

/** `Footer` component type. */
export type FooterComponent = React.FC<FooterProps>;

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
      className={cn("mt-32 flex-none", className)}
      {...createComponentProps(componentId, "footer", isDebugMode)}
    >
      <ContainerOuter debugId={componentId} debugMode={isDebugMode}>
        <div
          id={`${componentId}-footer-content-wrapper`}
          className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40"
          {...createComponentProps(
            componentId,
            "footer-content-wrapper",
            isDebugMode
          )}
        >
          <ContainerInner debugId={componentId} debugMode={isDebugMode}>
            <div
              id={`${componentId}-footer-layout`}
              className="flex flex-col items-center justify-between gap-6 md:flex-row"
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
export const Footer: FooterComponent = setDisplayName(function Footer(props) {
  const { isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedFooter : BaseFooter;
  const element = <Component {...rest} />;
  return element;
});
