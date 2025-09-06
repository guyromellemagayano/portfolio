import React from "react";

import {
  type CommonComponentProps,
  Link,
} from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  hasAnyRenderableContent,
  hasMeaningfulText,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Container } from "@web/components/Container";
import { cn } from "@web/lib";

import { COMMON_LAYOUT_COMPONENT_LABELS } from "../_data";
import styles from "./SimpleLayout.module.css";

// ============================================================================
// BASE SIMPLE LAYOUT COMPONENT
// ============================================================================

interface SimpleLayoutProps
  extends React.ComponentProps<typeof Container>,
    CommonComponentProps {
  /** Page title */
  title: string;
  /** Page introduction */
  intro: string;
}
type SimpleLayoutComponent = React.FC<SimpleLayoutProps>;

/** A base simple layout component. */
const BaseSimpleLayout: SimpleLayoutComponent = setDisplayName(
  function BaseSimpleLayout(props) {
    const {
      children,
      className,
      title,
      intro,
      internalId,
      debugMode,
      ...rest
    } = props;

    const element = (
      <Container
        {...rest}
        className={cn(styles.simpleLayoutContainer, className)}
        aria-labelledby={`${internalId}-simple-layout`}
        data-simple-layout-id={`${internalId}-simple-layout`}
        data-debug-mode={debugMode ? "true" : undefined}
        data-testid="simple-layout-root"
      >
        <Link
          href="#main-content"
          className={styles.skipLink}
          aria-label={COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
        >
          {COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
        </Link>
        <header className={styles.simpleLayoutHeader}>
          {title && hasMeaningfulText(title) && (
            <h1
              id={`${internalId}-simple-layout-title`}
              className={styles.simpleLayoutTitle}
            >
              {title}
            </h1>
          )}
          {intro && hasMeaningfulText(intro) && (
            <p
              id={`${internalId}-simple-layout-intro`}
              className={styles.simpleLayoutIntro}
            >
              {intro}
            </p>
          )}
        </header>
        {children && isRenderableContent(children) && (
          <main
            id="main-content"
            role="main"
            className={styles.simpleLayoutContent}
            data-testid="simple-layout-main"
          >
            {children}
          </main>
        )}
      </Container>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED BASE SIMPLE LAYOUT COMPONENT
// ============================================================================

/** A memoized simple layout component. */
const MemoizedSimpleLayout = React.memo(BaseSimpleLayout);

// ============================================================================
// MAIN SIMPLE LAYOUT COMPONENT
// ============================================================================

/** A simple layout component that provides a consistent layout for page content. */
const SimpleLayout: SimpleLayoutComponent = setDisplayName(
  function SimpleLayout(props) {
    const {
      children,
      title,
      intro,
      isMemoized = false,
      internalId,
      debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!hasAnyRenderableContent(title, intro, children)) return null;

    const updatedProps = {
      ...rest,
      title,
      intro,
      internalId: id,
      debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedSimpleLayout : BaseSimpleLayout;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);

export { SimpleLayout };
