import React from "react";

import { type CommonComponentProps } from "../types";

export type ArticleRef = React.ComponentRef<"article">;

export interface ArticleProps
  extends React.ComponentPropsWithoutRef<"article">, CommonComponentProps {}

/** Render the article component. */
export const Article = React.forwardRef<ArticleRef, ArticleProps>(
  (props, ref) => {
    const { as: Component = "article", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Article.displayName = "Article";
