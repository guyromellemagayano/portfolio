import {
  createHtmlPrimitive,
  createNativeDefaultProps,
  withSafeBlankTargetRel,
} from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type ARef = PrimitiveRef<"a">;
export type AProps<TAs extends PrimitiveElement = "a"> = PrimitiveProps<
  "a",
  TAs
>;

/** Render the native <a> HTML element. */
export const A = createHtmlPrimitive("A", "a", {
  defaultProps: createNativeDefaultProps("a", { href: "#" }),
  prepareProps: (props, tagName) =>
    tagName === "a" ? withSafeBlankTargetRel(props) : props,
});
