import { type ReactElement, type Ref } from "react";

import { createHtmlPrimitive, createNativeDefaultProps } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type ImgRef = PrimitiveRef<"img">;

type InformativeImageProps = {
  alt: string;
  decorative?: false | undefined;
};

type DecorativeImageProps = {
  alt?: "" | undefined;
  decorative: true;
};

type PolymorphicImageProps = {
  alt?: string;
  decorative?: boolean;
};

type ImgAccessibilityProps<TAs extends PrimitiveElement> = TAs extends "img"
  ? InformativeImageProps | DecorativeImageProps
  : PolymorphicImageProps;

type ImgComponent = {
  <TAs extends PrimitiveElement = "img">(
    props: ImgProps<TAs> & {
      ref?: Ref<PrimitiveRef<"img"> | PrimitiveRef<TAs>>;
    }
  ): ReactElement | null;
  displayName?: string;
};

export type ImgProps<TAs extends PrimitiveElement = "img"> = PrimitiveProps<
  "img",
  TAs
> &
  ImgAccessibilityProps<TAs>;

/** Render the native <img> HTML element. */
export const Img = createHtmlPrimitive("Img", "img", {
  defaultProps: createNativeDefaultProps("img", {
    decoding: "async",
    src: "#",
  }),
  prepareProps: (props, tagName) => {
    const { decorative, ...rest } = props;

    if (tagName !== "img") {
      return rest;
    }

    if (decorative !== true) {
      return rest;
    }

    return {
      ...rest,
      alt: "",
    };
  },
}) as ImgComponent;
