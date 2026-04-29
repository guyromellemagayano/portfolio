import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SourceRef = PrimitiveRef<"source">;
export type SourceProps<TAs extends PrimitiveElement = "source"> =
  PrimitiveProps<"source", TAs>;

/** Render the native <source> HTML element. */
export const Source = createHtmlPrimitive("Source", "source");
