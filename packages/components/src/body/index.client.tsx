"use client";

import React, { memo } from "react";

import { Body, type BodyProps, type BodyRef } from ".";

/**
 * BodyClient component - client-side version of the Body component.
 *
 * This component wraps the main Body component and provides client-side rendering
 * capabilities. It inherits all the polymorphic behavior and documentation
 * from the main Body component.
 *
 * @example
 * // ✅ Recommended - explicit element type
 * <BodyClient as="div">Content</BodyClient>
 * <BodyClient as="main">Content</BodyClient>
 *
 * // ⚠️ Use with caution
 * <BodyClient as="body">Content</BodyClient>
 *
 * @example
 * // With body-specific attributes
 * <BodyClient as="div" lang="en" dir="ltr">Content</BodyClient>
 *
 * @example
 * // As semantic page wrapper
 * <BodyClient as="main" className="page-content">
 *   <header>Header</header>
 *   <section>Main content</section>
 *   <footer>Footer</footer>
 * </BodyClient>
 */
export const BodyClient = React.forwardRef<BodyRef, BodyProps>((props, ref) => (
  <Body ref={ref} {...props} />
));

BodyClient.displayName = "BodyClient";

/**
 * MemoizedBodyClient component - memoized version of BodyClient.
 *
 * This component provides the same functionality as BodyClient but with
 * React.memo optimization for performance-sensitive use cases.
 *
 * @example
 * // ✅ Recommended - explicit element type
 * <MemoizedBodyClient as="div">Content</MemoizedBodyClient>
 * <MemoizedBodyClient as="main">Content</MemoizedBodyClient>
 *
 * // ⚠️ Use with caution
 * <MemoizedBodyClient as="body">Content</MemoizedBodyClient>
 *
 * @example
 * // With body-specific attributes
 * <MemoizedBodyClient as="div" lang="en" dir="ltr">Content</MemoizedBodyClient>
 */
export const MemoizedBodyClient = memo(BodyClient);
