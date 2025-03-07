import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const ArticleClient = lazy(async () => {
  const module = await import("./Article.client");
  return { default: module.ArticleClient };
});

export type ArticleRef = React.ElementRef<"article">;
export type ArticleProps = React.ComponentPropsWithoutRef<"article"> &
  CommonComponentProps;

/**
 * Render the default article server component.
 * @param {ArticleProps} props - The default article server component properties
 * @returns The rendered default article server component
 */
export const Article = ({
  isClient = false,
  children,
  ...rest
}: ArticleProps) => {
  const element = <article {...rest}>{children}</article>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ArticleClient {...rest}>{children} </ArticleClient>
      </Suspense>
    );
  }

  return element;
};

Article.displayName = "Article";
