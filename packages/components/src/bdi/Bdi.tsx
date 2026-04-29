import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type BdiRef = PrimitiveRef<"bdi">;
export type BdiProps<TAs extends PrimitiveElement = "bdi"> = PrimitiveProps<
  "bdi",
  TAs
>;

/** Render the native <bdi> HTML element. */
export const Bdi = createHtmlPrimitive("Bdi", "bdi");
