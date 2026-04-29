import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SearchRef = PrimitiveRef<"search">;
export type SearchProps<TAs extends PrimitiveElement = "search"> =
  PrimitiveProps<"search", TAs>;

/** Render the native <search> HTML element. */
export const Search = createHtmlPrimitive("Search", "search");
