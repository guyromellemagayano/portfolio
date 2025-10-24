import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CommonIconComponent } from "../../Icon.types";

export const ChevronDownIcon: CommonIconComponent = setDisplayName(
  React.memo(function ChevronDownIcon(props) {
    const { as: Component = "svg", debugId, debugMode, ...rest } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const element = (
      <Component
        {...rest}
        viewBox="0 0 8 6"
        aria-hidden="true"
        {...createComponentProps(componentId, "icon-chevron-down", isDebugMode)}
      >
        <path
          d="M1.75 1.75 4 4.25l2.25-2.5"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Component>
    );

    return element;
  })
);
