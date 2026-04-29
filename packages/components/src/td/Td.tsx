import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type TdRef = PrimitiveRef<"td">;
export type TdProps<TAs extends PrimitiveElement = "td"> = PrimitiveProps<
  "td",
  TAs
>;

/** Render the native <td> HTML element. */
export const Td = createHtmlPrimitive("Td", "td");
