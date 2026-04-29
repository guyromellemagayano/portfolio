import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SectionRef = PrimitiveRef<"section">;
export type SectionProps<TAs extends PrimitiveElement = "section"> =
  PrimitiveProps<"section", TAs>;

/** Render the native <section> HTML element. */
export const Section = createHtmlPrimitive("Section", "section");
