import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type MapRef = PrimitiveRef<"map">;
export type MapProps<TAs extends PrimitiveElement = "map"> = PrimitiveProps<
  "map",
  TAs
>;

/** Render the native <map> HTML element. */
export const Map = createHtmlPrimitive("Map", "map");
