import React from "react";

import {
  Div,
  type DivProps,
  type DivRef,
} from "@guyromellemagayano/components";

import type { CommonWebAppComponentProps } from "@web/@types/components";
import { useComponentId } from "@web/hooks/useComponentId";
import { cn } from "@web/lib";

import styles from "./Prose.module.css";

type ProseRef = DivRef;
interface ProseProps extends DivProps, CommonWebAppComponentProps {}

type ProseComponent = React.ForwardRefExoticComponent<
  ProseProps & React.RefAttributes<ProseRef>
>;

/** Renders rich text content with consistent prose styling. */
export const Prose: ProseComponent = React.forwardRef(
  function Prose(props, ref) {
    const { className, _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    return (
      <Div
        {...rest}
        ref={ref}
        className={cn(styles.proseContainer, className)}
        data-prose-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
      />
    );
  }
);

Prose.displayName = "Prose";
