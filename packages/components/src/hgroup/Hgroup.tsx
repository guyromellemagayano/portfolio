import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type HgroupRef = PrimitiveRef<"hgroup">;
export type HgroupProps<TAs extends PrimitiveElement = "hgroup"> =
  PrimitiveProps<"hgroup", TAs>;

/** Render the native <hgroup> HTML element. */
export const Hgroup = createHtmlPrimitive("Hgroup", "hgroup");
