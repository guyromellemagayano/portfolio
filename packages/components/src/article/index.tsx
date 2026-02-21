import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

export const ArticleClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ArticleClient };
});
export const MemoizedArticleClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedArticleClient };
});

export type ArticleRef = React.ComponentRef<"article">;

export interface ArticleProps
  extends React.ComponentPropsWithoutRef<"article">, CommonComponentProps {}

/** Render the article server component. */
export const Article = React.forwardRef<ArticleRef, ArticleProps>(
  (props, ref) => {
    const {
      as: Component = "article",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedArticleClient
        : ArticleClient;

      return (
        <Suspense fallback={element}>
          <ClientComponent {...rest} ref={ref}>
            {children}
          </ClientComponent>
        </Suspense>
      );
    }

    return element;
  }
);

Article.displayName = "Article";
