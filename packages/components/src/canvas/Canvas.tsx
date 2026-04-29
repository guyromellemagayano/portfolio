import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type CanvasRef = PrimitiveRef<"canvas">;
export type CanvasProps<TAs extends PrimitiveElement = "canvas"> =
  PrimitiveProps<"canvas", TAs>;

/** Render the native <canvas> HTML element. */
export const Canvas = createHtmlPrimitive("Canvas", "canvas");
