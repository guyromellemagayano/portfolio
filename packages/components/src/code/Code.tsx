import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type CodeRef = PrimitiveRef<"code">;
export type CodeProps<TAs extends PrimitiveElement = "code"> = PrimitiveProps<
  "code",
  TAs
>;

/** Render the native <code> HTML element. */
export const Code = createHtmlPrimitive("Code", "code");
