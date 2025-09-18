import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CommonIconProps } from "../../_types";

type MailIconComponent = React.FC<
  CommonIconProps & {
    page?: "about" | "home";
  }
>;

/** Mail icon. */
const MailIcon: MailIconComponent = setDisplayName(
  React.memo(function MailIcon(props) {
    const { page = "home", _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element =
      page === "about" ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          {...rest}
          {...createComponentProps(id, "icon-mail", isDebugMode)}
        >
          <path
            fillRule="evenodd"
            d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
          />
        </svg>
      ) : (
        <svg
          {...rest}
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          {...createComponentProps(id, "icon-mail", isDebugMode)}
        >
          <path
            d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
            className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
          />
          <path
            d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
            className="stroke-zinc-400 dark:stroke-zinc-500"
          />
        </svg>
      );

    return element;
  })
);

export default MailIcon;
