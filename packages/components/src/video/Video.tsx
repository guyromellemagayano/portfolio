import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type VideoRef = PrimitiveRef<"video">;
export type VideoProps<TAs extends PrimitiveElement = "video"> = PrimitiveProps<
  "video",
  TAs
>;

/** Render the native <video> HTML element. */
export const Video = createHtmlPrimitive("Video", "video");
