import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type DataRef = PrimitiveRef<"data">;
export type DataProps<TAs extends PrimitiveElement = "data"> = PrimitiveProps<
  "data",
  TAs
>;

/** Render the native <data> HTML element. */
export const Data = createHtmlPrimitive("Data", "data");
