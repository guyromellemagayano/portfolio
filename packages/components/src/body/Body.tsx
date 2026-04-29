import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type BodyRef = PrimitiveRef<"body">;
export type BodyProps<TAs extends PrimitiveElement = "body"> = PrimitiveProps<
  "body",
  TAs
>;

/** Render the native <body> HTML element. */
export const Body = createHtmlPrimitive("Body", "body");
