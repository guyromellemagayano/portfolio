import React from "react";

import {
  Div,
  type DivProps,
  type DivRef,
  Img,
  type ImgProps,
  type ImgRef,
  Span,
  type SpanProps,
  type SpanRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type AvatarProps = DivProps;

export const Avatar = React.forwardRef<DivRef, AvatarProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <Div
      ref={ref}
      {...rest}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      data-slot={getDataSlot(props, "avatar")}
    />
  );
});

Avatar.displayName = "Avatar";

export type AvatarImageProps = ImgProps;

export const AvatarImage = React.forwardRef<ImgRef, AvatarImageProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Img
        ref={ref}
        {...rest}
        className={cn("aspect-square h-full w-full", className)}
        data-slot={getDataSlot(props, "avatar-image")}
      />
    );
  }
);

AvatarImage.displayName = "AvatarImage";

export type AvatarFallbackProps = SpanProps;

export const AvatarFallback = React.forwardRef<SpanRef, AvatarFallbackProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Span
        ref={ref}
        {...rest}
        className={cn(
          "bg-muted flex h-full w-full items-center justify-center rounded-full",
          className
        )}
        data-slot={getDataSlot(props, "avatar-fallback")}
      />
    );
  }
);

AvatarFallback.displayName = "AvatarFallback";
