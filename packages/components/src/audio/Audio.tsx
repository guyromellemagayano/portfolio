import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type AudioRef = PrimitiveRef<"audio">;
export type AudioProps<TAs extends PrimitiveElement = "audio"> = PrimitiveProps<
  "audio",
  TAs
>;

/** Render the native <audio> HTML element. */
export const Audio = createHtmlPrimitive("Audio", "audio");
