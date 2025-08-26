import React from "react";

import Link from "next/link";

import { A, Div } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  isRenderableContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Icon } from "@web/components";
import { cn } from "@web/lib";

import styles from "./CardCta.module.css";

interface CardCtaProps
  extends React.ComponentProps<typeof Div>,
    React.ComponentPropsWithoutRef<typeof A>,
    ComponentProps {
  href?: React.ComponentProps<typeof Link>["href"];
}

/** Public card CTA component with `useComponentId` integration */
const CardCta: React.FC<CardCtaProps> = setDisplayName(function CardCta(props) {
  const {
    children,
    className,
    href,
    target = "_self",
    title = "",
    internalId,
    debugMode,
    as: Component = Link,
    ...rest
  } = props;

  // Use shared hook for ID generation, component naming, and debug logging
  const { id, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  if (!isRenderableContent(children)) return null;

  // Convert href to string for validation, handling all Next.js Link href types
  const hrefString = typeof href === "string" ? href : href?.toString() || "";

  const element = (
    <Div
      {...rest}
      className={cn(styles.cardCtaContainer, className)}
      data-card-cta-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
      data-testid="card-cta-root"
    >
      {href && isValidLink(hrefString) ? (
        <Component
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          title={title}
          className={styles.cardCtaLink}
        >
          {children}
          <Icon.ChevronRight />
        </Component>
      ) : (
        children
      )}
    </Div>
  );

  return element;
});

export { CardCta };
