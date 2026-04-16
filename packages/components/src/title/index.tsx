import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const TitleClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TitleClient };
});
const MemoizedTitleClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedTitleClient };
});

export type TitleRef = React.ComponentRef<"title">;

export interface TitleProps
  extends React.ComponentPropsWithoutRef<"title">, CommonComponentProps {}

/** Render the document title server component. */
export const Title = React.forwardRef<TitleRef, TitleProps>((props, ref) => {
  const {
    as: Component = "title",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedTitleClient : TitleClient;

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

Title.displayName = "Title";
