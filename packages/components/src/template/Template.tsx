import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type TemplateRef = PrimitiveRef<"template">;
export type TemplateProps<TAs extends PrimitiveElement = "template"> =
  PrimitiveProps<"template", TAs>;

/** Render the native <template> HTML element. */
export const Template = createHtmlPrimitive("Template", "template");
