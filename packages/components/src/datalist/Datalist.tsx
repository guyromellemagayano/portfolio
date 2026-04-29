import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type DatalistRef = PrimitiveRef<"datalist">;
export type DatalistProps<TAs extends PrimitiveElement = "datalist"> =
  PrimitiveProps<"datalist", TAs>;

/** Render the native <datalist> HTML element. */
export const Datalist = createHtmlPrimitive("Datalist", "datalist");
