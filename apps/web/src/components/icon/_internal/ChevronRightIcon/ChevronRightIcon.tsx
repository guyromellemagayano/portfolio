import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CommonIconComponent } from "../../_types";

/** Chevron right icon. */
const ChevronRightIcon: CommonIconComponent = setDisplayName(
  React.memo(function ChevronRightIcon(props) {
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
        {...createComponentProps(id, "icon-chevron-right", isDebugMode)}
      >
        <path
          d="M6.75 5.75 9.25 8l-2.5 2.25"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    return element;
  })
);

export default ChevronRightIcon;
