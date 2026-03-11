import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const ImgClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ImgClient };
});
const MemoizedImgClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedImgClient };
});

export type ImgRef = React.ComponentRef<"img">;

export interface ImgProps
  extends React.ComponentPropsWithoutRef<"img">, CommonComponentProps {}

/** Render the image embed server component. */
export const Img = React.forwardRef<ImgRef, ImgProps>((props, ref) => {
  const {
    as: Component = "img",
    isClient = false,
    isMemoized = false,
    src = "#",
    alt = "",
    ...rest
  } = props;

  const element = <Component src={src} alt={alt} {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedImgClient : ImgClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent src={src} alt={alt} {...rest} ref={ref} />
      </Suspense>
    );
  }

  return element;
});

Img.displayName = "Img";
