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

import { COMMON_LAYOUT_COMPONENT_LABELS } from "./_data";
import { SimpleLayout } from "./_internal";
import styles from "./Layout.module.css";

// ============================================================================
// LAYOUT COMPONENT TYPES & INTERFACES
// ============================================================================

interface LayoutProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}
type LayoutComponent = React.FC<LayoutProps>;

// ============================================================================
// BASE LAYOUT COMPONENT
// ============================================================================

/** A layout component that provides the base page structure with header, main content, and footer. */
const BaseLayout: LayoutComponent = setDisplayName(function BaseLayout(props) {
  const { children, className, internalId, debugMode, ...rest } = props;

  const element = (
    <div
      {...rest}
      id={`${internalId}-layout-root`}
      className={cn(styles.layoutContainer, className)}
      {...createComponentProps(internalId, "layout", debugMode)}
    >
      <Link
        href={`#${internalId}-layout-main`}
        id={`${internalId}-layout-link`}
        className={styles.skipLink}
        aria-label={COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
        {...createComponentProps(internalId, "link", debugMode)}
      >
        {COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
      </Link>
      <div
        id={`${internalId}-layout-background-wrapper`}
        className={styles.layoutBackgroundWrapper}
        aria-hidden="true"
        inert
        {...createComponentProps(
          internalId,
          "layout-background-wrapper",
          debugMode
        )}
      >
        <div
          id={`${internalId}-layout-background-content`}
          className={styles.layoutBackgroundContent}
          {...createComponentProps(
            internalId,
            "layout-background-content",
            debugMode
          )}
        >
          <div
            id={`${internalId}-layout-background`}
            className={styles.layoutBackground}
            {...createComponentProps(
              internalId,
              "layout-background",
              debugMode
            )}
          />
        </div>
      </div>
      <div
        id={`${internalId}-layout-content-wrapper`}
        className={styles.layoutContentWrapper}
        {...createComponentProps(
          internalId,
          "layout-content-wrapper",
          debugMode
        )}
      >
        <Header role="banner" internalId={internalId} debugMode={debugMode} />
        <main
          role="main"
          id={`${internalId}-layout-main`}
          className={styles.layoutMain}
          {...createComponentProps(internalId, "layout-main", debugMode)}
        >
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
});

// ============================================================================
// MEMOIZED LAYOUT COMPONENT
// ============================================================================

/** A memoized base layout component. */
const MemoizedBaseLayout = React.memo(BaseLayout);

// ============================================================================
// MAIN LAYOUT COMPONENT
// ============================================================================

/** A layout component that provides the base page structure with header, main, and footer sections. */
const Layout = setDisplayName(function Layout(props) {
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

  const Component = isMemoized ? MemoizedBaseLayout : BaseLayout;
  const element = <Component {...updatedProps}>{children}</Component>;
  return element;
} as LayoutCompoundComponent);

// ============================================================================
// LAYOUT COMPOUND COMPONENTS
// ============================================================================

type LayoutCompoundComponent = React.FC<LayoutProps> & {
  /** A simple layout component that provides a consistent layout for page content. */
  Simple: typeof SimpleLayout;
};

Layout.Simple = SimpleLayout;

export default Layout;
