import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  hasAnyRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Footer, Header } from "@web/components";
import { cn } from "@web/lib";

import { COMMON_LAYOUT_COMPONENT_LABELS } from "./_data";
import styles from "./Layout.module.css";

// ============================================================================
// BASE LAYOUT COMPONENT
// ============================================================================

interface BaseLayoutProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}
type BaseLayoutComponent = React.FC<BaseLayoutProps>;

/** A layout component that provides the base page structure with header, main content, and footer. */
const BaseLayout: BaseLayoutComponent = setDisplayName(
  function BaseLayout(props) {
    const { children, className, internalId, debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.layoutContainer, className)}
        data-base-layout-id={`${internalId}-base-layout`}
        data-debug-mode={debugMode ? "true" : undefined}
        data-testid="base-layout-root"
      >
        <Link
          href="#main-content"
          className={styles.skipLink}
          aria-label={COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
        >
          {COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
        </Link>
        <div
          className={styles.layoutBackgroundWrapper}
          aria-hidden="true"
          inert
        >
          <div className={styles.layoutBackgroundContent}>
            <div className={styles.layoutBackground} />
          </div>
        </div>
        <div className={styles.layoutContentWrapper}>
          <Header role="banner" data-testid="layout-header">
            <Header />
          </Header>
          <main
            id="main-content"
            role="main"
            className={styles.layoutMain}
            data-testid="layout-main"
          >
            {children}
          </main>
          <Footer role="contentinfo" data-testid="layout-footer">
            <Footer />
          </Footer>
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
const MemoizedLayout = React.memo(BaseLayout);

// ============================================================================
// MAIN LAYOUT COMPONENT
// ============================================================================

/** A layout component that provides the base page structure with header, main, and footer sections. */
const Layout: BaseLayoutComponent = setDisplayName(function Layout(props) {
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

  const Component = isMemoized ? MemoizedLayout : Layout;
  const element = <Component {...updatedProps}>{children}</Component>;
  return element;
});

export { Layout };
