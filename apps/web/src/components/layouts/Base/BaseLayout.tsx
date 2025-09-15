import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasAnyRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Footer, Header } from "@web/components";
import { cn } from "@web/utils";

import { COMMON_LAYOUT_COMPONENT_LABELS } from "../_data";
import styles from "./BaseLayout.module.css";

// ============================================================================
// LAYOUT COMPONENT TYPES & INTERFACES
// ============================================================================

interface BaseLayoutProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}
type BaseLayoutComponent = React.FC<BaseLayoutProps>;

// ============================================================================
// BASE LAYOUT COMPONENT
// ============================================================================

/** A layout component that provides the base page structure with header, main content, and footer. */
const MainBaseLayout: BaseLayoutComponent = setDisplayName(
  function MainBaseLayout(props) {
    const { children, className, internalId, debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.baseLayoutContainer, className)}
        {...createComponentProps(internalId, "layout", debugMode)}
      >
        <Link
          href="#main-content"
          className={styles.skipLink}
          aria-label={COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
        >
          {COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
        </Link>
        <div
          className={styles.baseLayoutBackgroundWrapper}
          aria-hidden="true"
          inert
        >
          <div className={styles.baseLayoutBackgroundContent}>
            <div className={styles.baseLayoutBackground} />
          </div>
        </div>
        <div className={styles.baseLayoutContentWrapper}>
          <Header role="banner" internalId={internalId} debugMode={debugMode} />
          <main id="main-content" role="main" className={styles.baseLayoutMain}>
            {children}
          </main>
          <Footer
            role="contentinfo"
            internalId={internalId}
            debugMode={debugMode}
          />
        </div>
      </div>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED LAYOUT COMPONENT
// ============================================================================

/** A memoized base layout component. */
const MemoizedBaseLayout = React.memo(MainBaseLayout);

// ============================================================================
// MAIN LAYOUT COMPONENT
// ============================================================================

/** A layout component that provides the base page structure with header, main, and footer sections. */
export const BaseLayout: BaseLayoutComponent = setDisplayName(
  function BaseLayout(props) {
    const {
      children,
      isMemoized = false,
      internalId,
      debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!hasAnyRenderableContent(children)) return null;

    const updatedProps = {
      ...rest,
      internalId: id,
      debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedBaseLayout : MainBaseLayout;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);
