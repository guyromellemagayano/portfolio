import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CommonIconComponent } from "../_types";

export const CloseIcon: CommonIconComponent = setDisplayName(
  React.memo(function CloseIcon(props) {
    const { as: Component = "svg", debugId, debugMode, ...rest } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const element = (
      <Component
        {...rest}
        viewBox="0 0 24 24"
        aria-hidden="true"
        {...createComponentProps(componentId, "icon-close", isDebugMode)}
      >
        <path
          d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Component>
    );

    return element;
  })
);
