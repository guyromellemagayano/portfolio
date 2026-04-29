import React from "react";

import { type CommonComponentProps } from "../types";

export type AsideRef = React.ComponentRef<"aside">;

export interface AsideProps
  extends React.ComponentPropsWithoutRef<"aside">, CommonComponentProps {}

/** Render the aside component. */
export const Aside = React.forwardRef<AsideRef, AsideProps>((props, ref) => {
  const { as: Component = "aside", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Aside.displayName = "Aside";
