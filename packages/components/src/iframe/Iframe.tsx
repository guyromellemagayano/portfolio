import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type IframeRef = PrimitiveRef<"iframe">;
export type IframeProps<TAs extends PrimitiveElement = "iframe"> =
  PrimitiveProps<"iframe", TAs>;

/** Render the native <iframe> HTML element. */
export const Iframe = createHtmlPrimitive("Iframe", "iframe");
