import React from "react";

import { A, Heading, Link, Span } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  isRenderableContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./CardTitle.module.css";

interface CardTitleProps
  extends React.ComponentProps<typeof A>,
    React.ComponentPropsWithoutRef<typeof Heading>,
    ComponentProps {}

/** Public card title component with `useComponentId` integration */
const CardTitle: React.FC<CardTitleProps> = setDisplayName(
  function CardTitle(props) {
    const {
      internalId,
      debugMode,
      children,
      className,
      as: Component = Heading,
      href,
      title = "",
      target = "_self",
      ...rest
    } = props;

    // Use shared hook for ID generation, component naming, and debug logging
    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!isRenderableContent(children)) return null;

    // Convert href to string for validation, handling all Next.js Link href types
    const hrefString =
      typeof href === "string" ? href : (href as any)?.toString() || "";

    const element = (
      <Component
        {...rest}
        as="h2"
        className={cn(styles.cardTitleHeading, className)}
        data-card-title-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-title-root"
      >
        {href && isValidLink(hrefString) ? (
          <Link href={href} target={target} title={title}>
            <Span className={styles.cardTitleClickableArea} />
            <Span className={styles.cardTitleContent}>{children}</Span>
          </Link>
        ) : (
          children
        )}
      </Component>
    );

    return element;
  }
);

export { CardTitle };
