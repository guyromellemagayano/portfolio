import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type ProgressRef = PrimitiveRef<"progress">;
export type ProgressProps<TAs extends PrimitiveElement = "progress"> =
  PrimitiveProps<"progress", TAs>;

/** Render the native <progress> HTML element. */
export const Progress = createHtmlPrimitive("Progress", "progress");
