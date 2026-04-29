import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type OptgroupRef = PrimitiveRef<"optgroup">;
export type OptgroupProps<TAs extends PrimitiveElement = "optgroup"> =
  PrimitiveProps<"optgroup", TAs>;

/** Render the native <optgroup> HTML element. */
export const Optgroup = createHtmlPrimitive("Optgroup", "optgroup");
