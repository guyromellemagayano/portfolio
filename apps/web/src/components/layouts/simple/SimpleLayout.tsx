import React from "react";

import {
  type CommonComponentProps,
  Link,
} from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasAnyRenderableContent,
  hasMeaningfulText,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Container } from "@web/components/Container";
import { cn } from "@web/utils";

import { COMMON_LAYOUT_COMPONENT_LABELS } from "../_data";
import styles from "./SimpleLayout.module.css";

// ============================================================================
// SIMPLE LAYOUT COMPONENT TYPES & INTERFACES
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

// ============================================================================
// BASE SIMPLE LAYOUT COMPONENT
// ============================================================================

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
        {...createComponentProps(internalId, "simple-layout", debugMode)}
      >
        <Link
          href="#main-content"
          className={styles.skipLink}
          aria-label={COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
        >
          {COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
        </Link>
        <header className={styles.simpleLayoutHeader}>
          {title && hasMeaningfulText(title) ? (
            <h1
              id={`${internalId}-simple-layout-title`}
              className={styles.simpleLayoutTitle}
            >
              {title}
            </h1>
          ) : null}
          {intro && hasMeaningfulText(intro) ? (
            <p
              id={`${internalId}-simple-layout-intro`}
              className={styles.simpleLayoutIntro}
            >
              {intro}
            </p>
          ) : null}
        </header>
        {hasAnyRenderableContent(children) ? (
          <main
            id={`${internalId}-simple-layout-main-content`}
            role="main"
            className={styles.simpleLayoutContent}
          >
            {children}
          </main>
        ) : null}
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
export const SimpleLayout: SimpleLayoutComponent = setDisplayName(
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

    if (
      !hasAnyRenderableContent(children) &&
      !hasMeaningfulText(title) &&
      !hasMeaningfulText(intro)
    )
      return null;

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
