import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type ObjectRef = PrimitiveRef<"object">;
export type ObjectProps<TAs extends PrimitiveElement = "object"> =
  PrimitiveProps<"object", TAs>;

/** Render the native <object> HTML element. */
export const Object = createHtmlPrimitive("Object", "object");
