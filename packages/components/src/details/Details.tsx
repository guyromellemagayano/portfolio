import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type DetailsRef = PrimitiveRef<"details">;
export type DetailsProps<TAs extends PrimitiveElement = "details"> =
  PrimitiveProps<"details", TAs>;

/** Render the native <details> HTML element. */
export const Details = createHtmlPrimitive("Details", "details");
