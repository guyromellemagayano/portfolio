import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const AreaClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AreaClient };
});
const MemoizedAreaClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAreaClient };
});

export type AreaRef = React.ComponentRef<"area">;

export interface AreaProps
  extends React.ComponentPropsWithoutRef<"area">,
    CommonComponentProps {}

/**
 * Render the area server component.
 */
export const Area = React.forwardRef<AreaRef, AreaProps>((props, ref) => {
  const {
    as: Component = "area",
    alt = "",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = (
    <Component alt={alt} {...rest}>
      {children}
    </Component>
  );

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAreaClient : AreaClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent alt={alt} {...rest} ref={ref}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
});

Area.displayName = "Area";
