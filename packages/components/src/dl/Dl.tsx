import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type DlRef = PrimitiveRef<"dl">;
export type DlProps<TAs extends PrimitiveElement = "dl"> = PrimitiveProps<
  "dl",
  TAs
>;

/** Render the native <dl> HTML element. */
export const Dl = createHtmlPrimitive("Dl", "dl");
