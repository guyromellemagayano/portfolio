import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type BdoRef = PrimitiveRef<"bdo">;
export type BdoProps<TAs extends PrimitiveElement = "bdo"> = PrimitiveProps<
  "bdo",
  TAs
>;

/** Render the native <bdo> HTML element. */
export const Bdo = createHtmlPrimitive("Bdo", "bdo");
