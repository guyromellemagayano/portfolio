import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const SvgClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SvgClient };
});
const MemoizedSvgClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedSvgClient };
});

export type SvgRef = React.ComponentRef<"svg">;

export interface SvgProps
  extends React.ComponentPropsWithoutRef<"svg">, CommonComponentProps {}

/** Render the scalable vector graphics server component. */
export const Svg = React.forwardRef<SvgRef, SvgProps>((props, ref) => {
  const {
    as: Component = "svg",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedSvgClient : SvgClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} ref={ref}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
});

Svg.displayName = "Svg";
