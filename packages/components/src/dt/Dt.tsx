import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type DtRef = PrimitiveRef<"dt">;
export type DtProps<TAs extends PrimitiveElement = "dt"> = PrimitiveProps<
  "dt",
  TAs
>;

/** Render the native <dt> HTML element. */
export const Dt = createHtmlPrimitive("Dt", "dt");
