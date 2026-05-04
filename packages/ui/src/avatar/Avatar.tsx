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

export type AvatarProps = DivProps & {
  alt?: string;
  fallback?: React.ReactNode;
  fallbackProps?: AvatarFallbackProps;
  imageProps?: Omit<AvatarImageProps, "alt" | "decorative" | "src">;
  name?: string;
  src?: string;
};

export const Avatar = React.forwardRef<DivRef, AvatarProps>((props, ref) => {
  const {
    alt,
    children,
    className,
    fallback,
    fallbackProps,
    imageProps,
    name,
    src,
    ...rest
  } = props;
  const generatedFallback = fallback ?? getAvatarInitials(name);

  return (
    <Div
      ref={ref}
      {...rest}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      data-slot={getDataSlot(props, "avatar")}
    >
      {src ? (
        <AvatarImage {...imageProps} alt={alt ?? name ?? ""} src={src} />
      ) : null}
      {generatedFallback ? (
        <AvatarFallback {...fallbackProps}>{generatedFallback}</AvatarFallback>
      ) : null}
      {children}
    </Div>
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

function getAvatarInitials(name: string | undefined) {
  if (!name) {
    return undefined;
  }

  return name
    .trim()
    .split(/\s+/u)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}
