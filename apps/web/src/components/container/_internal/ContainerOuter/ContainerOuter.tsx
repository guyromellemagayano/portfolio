import React from "react";

import { Div } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  createCompoundComponent,
  isRenderableContent,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./ContainerOuter.module.css";

interface ContainerOuterProps
  extends React.ComponentProps<typeof Div>,
    ComponentProps {}

interface ContainerOuterInternalProps extends ContainerOuterProps {
  /** Generated or custom component ID */
  componentId: string;
  /** Processed debug mode */
  isDebugMode: boolean;
}

/** Internal container outer component with all props */
const ContainerOuterInternal: React.FC<ContainerOuterInternalProps> =
  function ContainerOuterInternal(props) {
    const { children, className, componentId, isDebugMode, ...rest } = props;

    if (!isRenderableContent(children)) return null;

    const element = (
      <Div
        {...rest}
        className={cn(styles.containerOuter, className)}
        data-container-outer-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="container-outer-root"
      >
        <Div className={styles.containerOuterContent}>{children}</Div>
      </Div>
    );

    return element;
  };

/** Public container outer wrapper component for layout and styling */
const ContainerOuter = createCompoundComponent(
  "ContainerOuter",
  ContainerOuterInternal,
  useComponentId,
  {},
  {
    memoized: true,
    hookOptions: {
      defaultDebugMode: false,
    },
  }
);

export { ContainerOuter };
