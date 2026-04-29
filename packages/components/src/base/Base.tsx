import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type BaseRef = PrimitiveRef<"base">;
export type BaseProps<TAs extends PrimitiveElement = "base"> = PrimitiveProps<
  "base",
  TAs
>;

/** Render the native <base> HTML element. */
export const Base = createHtmlPrimitive("Base", "base");
