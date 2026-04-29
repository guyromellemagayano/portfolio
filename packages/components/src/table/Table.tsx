import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type TableRef = PrimitiveRef<"table">;
export type TableProps<TAs extends PrimitiveElement = "table"> = PrimitiveProps<
  "table",
  TAs
>;

/** Render the native <table> HTML element. */
export const Table = createHtmlPrimitive("Table", "table");
