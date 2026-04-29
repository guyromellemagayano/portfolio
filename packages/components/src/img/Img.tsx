import { createHtmlPrimitive, createNativeDefaultProps } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type ImgRef = PrimitiveRef<"img">;
export type ImgProps<TAs extends PrimitiveElement = "img"> = PrimitiveProps<
  "img",
  TAs
>;

/** Render the native <img> HTML element. */
export const Img = createHtmlPrimitive("Img", "img", {
  defaultProps: createNativeDefaultProps("img", {
    alt: "",
    decoding: "async",
    src: "#",
  }),
});
