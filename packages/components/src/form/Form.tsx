import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type FormRef = PrimitiveRef<"form">;
export type FormProps<TAs extends PrimitiveElement = "form"> = PrimitiveProps<
  "form",
  TAs
>;

/** Render the native <form> HTML element. */
export const Form = createHtmlPrimitive("Form", "form");
