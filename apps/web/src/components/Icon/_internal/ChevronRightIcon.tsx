import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CommonIconComponent } from "../_types";

export const ChevronRightIcon: CommonIconComponent = setDisplayName(
  React.memo(function ChevronRightIcon(props) {
    const { as: Component = "svg", debugId, debugMode, ...rest } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const element = (
      <Component
        {...rest}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        {...createComponentProps(
          componentId,
          "icon-chevron-right",
          isDebugMode
        )}
      >
        <path
          d="M6.75 5.75 9.25 8l-2.5 2.25"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Component>
    );

    return element;
  })
);
