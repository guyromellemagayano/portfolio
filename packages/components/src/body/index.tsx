import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const BodyClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BodyClient };
});
const MemoizedBodyClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBodyClient };
});

export type BodyRef = React.ComponentRef<"body">;

export interface BodyProps
  extends React.ComponentPropsWithoutRef<"body">,
    CommonComponentProps {}

/**
 * Body component - renders as div by default for compatibility.
 *
 * This component is polymorphic and can render as any element. It defaults to
 * rendering as a div for better compatibility with React Testing Library and
 * nested component contexts.
 *
 * @example
 * // ✅ Recommended - explicit element type
 * <Body as="div">Content</Body>
 * <Body as="main">Content</Body>
 * <Body as="section">Content</Body>
 *
 * // ⚠️ Use with caution - may not work in all contexts
 * <Body as="body">Content</Body>
 *
 * // ❌ Avoid - unclear intent and may cause confusion
 * <Body>Content</Body>
 *
 * @example
 * // With client-side rendering
 * <Body as="div" isClient>Client content</Body>
 * <Body as="main" isClient isMemoized>Memoized content</Body>
 *
 * @example
 * // With body-specific attributes
 * <Body as="div" lang="en" dir="ltr">Content</Body>
 *
 * @example
 * // As semantic page wrapper
 * <Body as="main" className="page-content">
 *   <header>Header</header>
 *   <section>Main content</section>
 *   <footer>Footer</footer>
 * </Body>
 */
export const Body = React.forwardRef<BodyRef, BodyProps>((props, ref) => {
  const {
    as: Component = "div",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  // Runtime validation in development
  if (
    typeof process !== "undefined" &&
    process.env.NODE_ENV === "development"
  ) {
    // Warn if no explicit 'as' prop is provided
    if (!props.as) {
      console.warn(
        "[Body Component] No explicit 'as' prop provided. " +
          "Body component renders as <div> by default for compatibility. " +
          'Consider using <Body as="div"> or <Body as="main"> for clarity. ' +
          'If you intended to render as <body>, use <Body as="body"> but note ' +
          "that <body> elements may not work in all contexts (e.g., React Testing Library)."
      );
    }

    // Warn if trying to render as body in development
    if (Component === "body") {
      console.warn(
        "[Body Component] Rendering as <body> element. " +
          "This may not work in all contexts, particularly in testing environments. " +
          'Consider using <Body as="div"> or <Body as="main"> for better compatibility.'
      );
    }
  }

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBodyClient : BodyClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} ref={ref}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
});

Body.displayName = "Body";
