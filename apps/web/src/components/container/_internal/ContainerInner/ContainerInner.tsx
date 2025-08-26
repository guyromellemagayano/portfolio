import React from "react";

import { Div } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  createCompoundComponent,
  isRenderableContent,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./ContainerInner.module.css";

interface ContainerInnerProps
  extends React.ComponentProps<typeof Div>,
    ComponentProps {}

interface ContainerInnerInternalProps extends ContainerInnerProps {
  /** Generated or custom component ID */
  componentId: string;
  /** Processed debug mode */
  isDebugMode: boolean;
}

/** Internal container inner component with all props */
const ContainerInnerInternal: React.FC<ContainerInnerInternalProps> =
  function ContainerInnerInternal(props) {
    const { children, className, componentId, isDebugMode, ...rest } = props;

    if (!isRenderableContent(children)) return null;

    const element = (
      <Div
        {...rest}
        className={cn(styles.containerInner, className)}
        data-container-inner-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="container-inner-root"
      >
        <Div className={styles.containerInnerContent}>{children}</Div>
      </Div>
    );

    return element;
  };

/** Public container inner wrapper component for layout and styling */
const ContainerInner = createCompoundComponent(
  "ContainerInner",
  ContainerInnerInternal,
  useComponentId,
  {},
  {
    memoized: true,
    hookOptions: {
      defaultDebugMode: false,
    },
  }
);

export { ContainerInner };
