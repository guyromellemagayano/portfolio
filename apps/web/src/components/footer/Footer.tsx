import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Container } from "@web/components";
import { cn } from "@web/utils";

import { FooterLegal, FooterNavigation } from "./_internal";
import { type FooterComponentLabels } from "./_types";
import styles from "./Footer.module.css";

// ============================================================================
// FOOTER COMPONENT TYPES & INTERFACES
// ============================================================================

interface FooterProps
  extends Omit<React.ComponentProps<"footer">, "children">,
    FooterComponentLabels,
    Omit<CommonComponentProps, "as"> {}
type FooterComponent = React.FC<FooterProps>;

// ============================================================================
// BASE FOOTER COMPONENT
// ============================================================================

/** A base footer component (client, minimal effects split out). */
const BaseFooter: FooterComponent = setDisplayName(function BaseFooter(props) {
  const { className, internalId, debugMode, ...rest } = props;

  const element = (
    <footer
      {...rest}
      className={cn(styles.footerComponent, className)}
      {...createComponentProps(internalId, "footer", debugMode)}
    >
      <Container.Outer _internalId={internalId} _debugMode={debugMode}>
        <div className={styles.footerContentWrapper}>
          <Container.Inner _internalId={internalId} _debugMode={debugMode}>
            <div className={styles.footerLayout}>
              <FooterNavigation
                _internalId={internalId}
                _debugMode={debugMode}
              />
              <FooterLegal _internalId={internalId} _debugMode={debugMode} />
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
export const Footer: FooterComponent = setDisplayName(function Footer(props) {
  const { isMemoized = false, internalId, debugMode, ...rest } = props;

  const { id, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  const updatedProps = {
    ...rest,
    internalId: id,
    debugMode: isDebugMode,
  };

  const Component = isMemoized ? MemoizedFooter : BaseFooter;
  const element = <Component {...updatedProps} />;
  return element;
});
