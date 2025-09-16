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
import { ArticleLayout, SimpleLayout } from "./_internal";
import styles from "./styles/Layout.module.css";

// ============================================================================
// LAYOUT COMPONENT TYPES & INTERFACES
// ============================================================================

interface LayoutProps
  extends React.ComponentProps<"div">,
    Omit<CommonComponentProps, "as"> {}
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
      className={cn(styles.layoutContainer, className)}
      {...createComponentProps(internalId, "layout", debugMode)}
    >
      <Link
        href="#main-content"
        className={styles.skipLink}
        aria-label={COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
      >
        {COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
      </Link>
      <div className={styles.layoutBackgroundWrapper} aria-hidden="true" inert>
        <div className={styles.layoutBackgroundContent}>
          <div className={styles.layoutBackground} />
        </div>
      </div>
      <div className={styles.layoutContentWrapper}>
        <Header role="banner" internalId={internalId} debugMode={debugMode} />
        <main id="main-content" role="main" className={styles.layoutMain}>
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
export const Layout = setDisplayName(function Layout(props) {
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
  /** An article layout component that provides a consistent layout for an article. */
  Article: typeof ArticleLayout;
};

Layout.Simple = SimpleLayout;
Layout.Article = ArticleLayout;
