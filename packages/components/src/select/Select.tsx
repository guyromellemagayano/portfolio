import React from "react";

import { useFieldControlProps } from "../field";
import { createHtmlPrimitive } from "../primitive";
import {
  type HtmlPrimitiveComponent,
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SelectRef = PrimitiveRef<"select">;
export type SelectProps<TAs extends PrimitiveElement = "select"> =
  PrimitiveProps<"select", TAs>;

const SelectRoot = createHtmlPrimitive("Select", "select");

/** Render the native <select> HTML element. */
const SelectComponent = React.forwardRef<SelectRef, SelectProps>(
  (props, ref) => {
    const controlProps = useFieldControlProps(props);

    return <SelectRoot ref={ref} {...controlProps} />;
  }
);

SelectComponent.displayName = "Select";

export const Select = SelectComponent as HtmlPrimitiveComponent<"select">;
