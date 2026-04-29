import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type ArticleRef = PrimitiveRef<"article">;
export type ArticleProps<TAs extends PrimitiveElement = "article"> =
  PrimitiveProps<"article", TAs>;

/** Render the native <article> HTML element. */
export const Article = createHtmlPrimitive("Article", "article");
