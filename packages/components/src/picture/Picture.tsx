import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type PictureRef = PrimitiveRef<"picture">;
export type PictureProps<TAs extends PrimitiveElement = "picture"> =
  PrimitiveProps<"picture", TAs>;

/** Render the native <picture> HTML element. */
export const Picture = createHtmlPrimitive("Picture", "picture");
