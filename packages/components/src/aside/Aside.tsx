import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type AsideRef = PrimitiveRef<"aside">;
export type AsideProps<TAs extends PrimitiveElement = "aside"> = PrimitiveProps<
  "aside",
  TAs
>;

/** Render the native <aside> HTML element. */
export const Aside = createHtmlPrimitive("Aside", "aside");
