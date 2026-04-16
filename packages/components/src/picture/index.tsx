import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const PictureClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.PictureClient };
});
const MemoizedPictureClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedPictureClient };
});

export type PictureRef = React.ComponentRef<"picture">;

export interface PictureProps
  extends React.ComponentPropsWithoutRef<"picture">, CommonComponentProps {}

/** Render the picture server component. */
export const Picture = React.forwardRef<PictureRef, PictureProps>(
  (props, ref) => {
    const {
      as: Component = "picture",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedPictureClient
        : PictureClient;

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

Picture.displayName = "Picture";
