import { type HTMLAttributes, lazy, Suspense } from "react";

// Dynamically import the client component
const ArticleClient = lazy(() =>
  import("./index.client").then((m) => ({ default: m.default }))
);

export type ArticleRef = HTMLElement;
export type ArticleProps = HTMLAttributes<ArticleRef> & {
  isClient?: boolean;
};

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
  if (isClient) {
    return (
      <Suspense>
        <ArticleClient {...rest}>{children} </ArticleClient>
      </Suspense>
    );
  }

  return <article {...rest}>{children}</article>;
};

Article.displayName = "Article";
