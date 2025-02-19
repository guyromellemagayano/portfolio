"use client";

import { forwardRef } from "react";

import type { ArticleProps, ArticleRef } from "./Article";

/**
 * Render the article client component.
 * @param {ArticleProps} props - The article client component properties
 * @param {ArticleRef} ref - The article client component reference
 * @returns The rendered article client component
 */
const ArticleClient = forwardRef<ArticleRef, ArticleProps>(
  ({ children, ...rest }, ref) => {
    return (
      <article ref={ref} {...rest}>
        {children}
      </article>
    );
  }
);

ArticleClient.displayName = "ArticleClient";

export default ArticleClient;
