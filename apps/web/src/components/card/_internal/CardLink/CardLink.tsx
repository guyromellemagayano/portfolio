import React from "react";

import Link from "next/link";

import { A, Div, Span } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  isRenderableContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./CardLink.module.css";

interface CardLinkProps
  extends React.ComponentProps<typeof Div>,
    React.ComponentPropsWithoutRef<typeof A>,
    ComponentProps {
  href?: React.ComponentProps<typeof Link>["href"];
}

/** Public card link component with `useComponentId` integration */
const CardLink: React.FC<CardLinkProps> = setDisplayName(
  function CardLink(props) {
    const {
      children,
      className,
      internalId,
      debugMode,
      href,
      title = "",
      target = "_self",
      as: Component = Link,
      ...rest
    } = props;

    // Use shared hook for ID generation, component naming, and debug logging
    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!isRenderableContent(children)) return null;

    // Convert `href` to string for validation, handling all Next.js Link href types
    const hrefString = typeof href === "string" ? href : href?.toString() || "";

    const element = (
      <Div
        {...rest}
        className={cn(styles.cardLinkHeading, className)}
        data-card-link-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-link-root"
      >
        <Div className={styles.cardLinkBackground} />
        {href && isValidLink(hrefString) ? (
          <Component
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            title={title}
          >
            <Span className={styles.cardLinkClickableArea} />
            <Span className={styles.cardLinkContent}>{children}</Span>
          </Component>
        ) : (
          children
        )}
      </Div>
    );

    return element;
  }
);

export { CardLink };
