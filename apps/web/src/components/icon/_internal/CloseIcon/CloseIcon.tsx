import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CommonIconComponent } from "../../_types";

/** Close icon. */
const CloseIcon: CommonIconComponent = setDisplayName(
  React.memo(function CloseIcon(props) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <svg
        {...rest}
        viewBox="0 0 24 24"
        aria-hidden="true"
        {...createComponentProps(id, "icon-close", isDebugMode)}
      >
        <path
          d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    return element;
  })
);

export default CloseIcon;
