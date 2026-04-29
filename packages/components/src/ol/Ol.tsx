import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type OlRef = PrimitiveRef<"ol">;
export type OlProps<TAs extends PrimitiveElement = "ol"> = PrimitiveProps<
  "ol",
  TAs
>;

/** Render the native <ol> HTML element. */
export const Ol = createHtmlPrimitive("Ol", "ol");
