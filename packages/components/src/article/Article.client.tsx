"use client";

import { type HTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type ArticleRef = HTMLElement;
export type ArticleProps = HTMLAttributes<ArticleRef> & CommonComponentProps;

/**
 * Render the article client component.
 * @param {ArticleProps} props - The article client component properties
 * @param {ArticleRef} ref - The article client component reference
 * @returns The rendered article client component
 */
export const ArticleClient = forwardRef<ArticleRef, ArticleProps>(
  ({ children, ...rest }, ref) => {
    return (
      <article ref={ref} {...rest}>
        {children}
      </article>
    );
  }
);

ArticleClient.displayName = "ArticleClient";
