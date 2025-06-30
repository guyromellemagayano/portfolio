"use client";

import React, { memo } from "react";

import { Article, type ArticleProps, type ArticleRef } from ".";

/**
 * Client-side article component.
 * For most use cases, the server component should be sufficient.
 * This exists for cases where client-side interactivity is specifically needed.
 */
export const ArticleClient = React.forwardRef<ArticleRef, ArticleProps>(
  (props, ref) => {
    // Simply delegate to the main component
    // The main component already handles all optimizations
    return <Article ref={ref} {...props} />;
  }
);

ArticleClient.displayName = "ArticleClient";

// Memoized version for cases where props change frequently
export const MemoizedArticleClient = memo(ArticleClient);

// Export default for convenience
export default ArticleClient;
