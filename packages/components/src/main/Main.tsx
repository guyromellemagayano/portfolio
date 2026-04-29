import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type MainRef = PrimitiveRef<"main">;
export type MainProps<TAs extends PrimitiveElement = "main"> = PrimitiveProps<
  "main",
  TAs
>;

/** Render the native <main> HTML element. */
export const Main = createHtmlPrimitive("Main", "main");
