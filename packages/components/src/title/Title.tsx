import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type TitleRef = PrimitiveRef<"title">;
export type TitleProps<TAs extends PrimitiveElement = "title"> = PrimitiveProps<
  "title",
  TAs
>;

/** Render the native <title> HTML element. */
export const Title = createHtmlPrimitive("Title", "title");
