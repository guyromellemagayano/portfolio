import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type TbodyRef = PrimitiveRef<"tbody">;
export type TbodyProps<TAs extends PrimitiveElement = "tbody"> = PrimitiveProps<
  "tbody",
  TAs
>;

/** Render the native <tbody> HTML element. */
export const Tbody = createHtmlPrimitive("Tbody", "tbody");
