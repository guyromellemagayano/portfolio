import React from "react";

import { type CommonComponentProps } from "../types";

export type TitleRef = React.ComponentRef<"title">;

export interface TitleProps
  extends React.ComponentPropsWithoutRef<"title">, CommonComponentProps {}

/** Render the document title component. */
export const Title = React.forwardRef<TitleRef, TitleProps>((props, ref) => {
  const { as: Component = "title", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Title.displayName = "Title";
