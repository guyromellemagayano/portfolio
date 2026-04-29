import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type FieldsetRef = PrimitiveRef<"fieldset">;
export type FieldsetProps<TAs extends PrimitiveElement = "fieldset"> =
  PrimitiveProps<"fieldset", TAs>;

/** Render the native <fieldset> HTML element. */
export const Fieldset = createHtmlPrimitive("Fieldset", "fieldset");
