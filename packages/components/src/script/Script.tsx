import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type ScriptRef = PrimitiveRef<"script">;
export type ScriptProps<TAs extends PrimitiveElement = "script"> =
  PrimitiveProps<"script", TAs>;

/** Render the native <script> HTML element. */
export const Script = createHtmlPrimitive("Script", "script");
