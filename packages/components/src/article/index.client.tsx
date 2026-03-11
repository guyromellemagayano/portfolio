"use client";

import React, { memo } from "react";

import { Article, type ArticleProps, type ArticleRef } from ".";

/** Render the article client component. */
export const ArticleClient = React.forwardRef<ArticleRef, ArticleProps>(
  (props, ref) => <Article ref={ref} {...props} />
);

ArticleClient.displayName = "ArticleClient";

/** Memoized version of `ArticleClient` for performance optimization. */
export const MemoizedArticleClient = memo(ArticleClient);
