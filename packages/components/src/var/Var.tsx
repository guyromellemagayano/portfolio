import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type VarRef = PrimitiveRef<"var">;
export type VarProps<TAs extends PrimitiveElement = "var"> = PrimitiveProps<
  "var",
  TAs
>;

/** Render the native <var> HTML element. */
export const Var = createHtmlPrimitive("Var", "var");
