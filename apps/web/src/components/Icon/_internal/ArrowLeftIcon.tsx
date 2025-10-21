import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CommonIconComponent } from "../_types";

export const ArrowLeftIcon: CommonIconComponent = setDisplayName(
  React.memo(function ArrowLeftIcon(props) {
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
        {...createComponentProps(componentId, "icon-arrow-left", isDebugMode)}
      >
        <path
          d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Component>
    );

    return element;
  })
);
