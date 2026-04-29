import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type StrongRef = PrimitiveRef<"strong">;
export type StrongProps<TAs extends PrimitiveElement = "strong"> =
  PrimitiveProps<"strong", TAs>;

/** Render the native <strong> HTML element. */
export const Strong = createHtmlPrimitive("Strong", "strong");
