import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const LinkClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.LinkClient };
});
const MemoizedLinkClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedLinkClient };
});

export type LinkRef = React.ComponentRef<"link">;

export interface LinkProps
  extends
    Omit<React.ComponentPropsWithoutRef<"link">, "as">,
    CommonComponentProps {}

/** Render the external resource link server component. */
export const Link = React.forwardRef<LinkRef, LinkProps>((props, ref) => {
  const {
    as: Component = "link",
    isClient = false,
    isMemoized = false,
    ...rest
  } = props;

  const element = <Component {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedLinkClient : LinkClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} ref={ref} />
      </Suspense>
    );
  }

  return element;
});

Link.displayName = "Link";
