import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type TrackRef = PrimitiveRef<"track">;
export type TrackProps<TAs extends PrimitiveElement = "track"> = PrimitiveProps<
  "track",
  TAs
>;

/** Render the native <track> HTML element. */
export const Track = createHtmlPrimitive("Track", "track");
