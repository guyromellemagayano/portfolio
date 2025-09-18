import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CommonIconComponent } from "../../_types";

/** Arrow down icon. */
const ArrowDownIcon: CommonIconComponent = setDisplayName(
  React.memo(function ArrowDownIcon(props) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <svg
        {...rest}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        {...createComponentProps(id, "icon-arrow-down", isDebugMode)}
      >
        <path
          d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    return element;
  })
);

export default ArrowDownIcon;
