import React from "react";

import {
  Figcaption,
  type FigcaptionProps,
  type FigcaptionRef,
  Figure as FigurePrimitive,
  type FigureProps as FigurePrimitiveProps,
  type FigureRef,
  Img,
  type ImgProps,
  type ImgRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type FigureImageProps = ImgProps;
export type FigureCaptionProps = FigcaptionProps;
export type GeneratedFigureImageProps = Omit<
  ImgProps,
  "alt" | "decorative" | "src"
>;

export type FigureProps = FigurePrimitiveProps & {
  alt?: string;
  caption?: React.ReactNode;
  captionProps?: FigureCaptionProps;
  decorative?: boolean;
  imageProps?: GeneratedFigureImageProps;
  src?: string;
};

function hasRenderableContent(value: React.ReactNode) {
  return value !== null && value !== undefined && value !== false;
}

export const Figure = React.forwardRef<FigureRef, FigureProps>((props, ref) => {
  const {
    caption,
    captionProps,
    children,
    className,
    decorative,
    imageProps,
    alt,
    src,
    ...rest
  } = props;
  const hasCaption = hasRenderableContent(caption);

  return (
    <FigurePrimitive
      ref={ref}
      {...rest}
      className={cn("space-y-3", className)}
      data-slot={getDataSlot(props, "figure")}
    >
      {src ? (
        decorative ? (
          <FigureImage {...imageProps} decorative src={src} />
        ) : (
          <FigureImage {...imageProps} alt={alt ?? ""} src={src} />
        )
      ) : null}
      {children}
      {hasCaption ? (
        <FigureCaption {...captionProps}>{caption}</FigureCaption>
      ) : null}
    </FigurePrimitive>
  );
});

Figure.displayName = "Figure";

export const FigureImage = React.forwardRef<ImgRef, FigureImageProps>(
  (props, ref) => {
    const { className, loading = "lazy", ...rest } = props;

    return (
      <Img
        ref={ref}
        loading={loading}
        {...rest}
        className={cn("rounded-lg border", className)}
        data-slot={getDataSlot(props, "figure-image")}
      />
    );
  }
);

FigureImage.displayName = "FigureImage";

export const FigureCaption = React.forwardRef<
  FigcaptionRef,
  FigureCaptionProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <Figcaption
      ref={ref}
      {...rest}
      className={cn("text-muted-foreground text-sm leading-6", className)}
      data-slot={getDataSlot(props, "figure-caption")}
    />
  );
});

FigureCaption.displayName = "FigureCaption";
