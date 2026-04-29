import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type DfnRef = PrimitiveRef<"dfn">;
export type DfnProps<TAs extends PrimitiveElement = "dfn"> = PrimitiveProps<
  "dfn",
  TAs
>;

/** Render the native <dfn> HTML element. */
export const Dfn = createHtmlPrimitive("Dfn", "dfn");
