import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const FigcaptionClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.FigcaptionClient };
});
const MemoizedFigcaptionClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedFigcaptionClient };
});

export type FigcaptionRef = React.ComponentRef<"figcaption">;

export interface FigcaptionProps
  extends React.ComponentPropsWithoutRef<"figcaption">, CommonComponentProps {}

/** Render the figure caption server component. */
export const Figcaption = React.forwardRef<FigcaptionRef, FigcaptionProps>(
  (props, ref) => {
    const {
      as: Component = "figcaption",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedFigcaptionClient
        : FigcaptionClient;

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

Figcaption.displayName = "Figcaption";
