import React from "react";

import Link from "next/link";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  getLinkTargetProps,
  isRenderableContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./CardTitle.module.css";

interface CardTitleProps
  extends React.ComponentProps<"h2">,
    Pick<React.ComponentPropsWithoutRef<typeof Link>, "target" | "title">,
    ComponentProps {
  /** Link href */
  href?: React.ComponentProps<typeof Link>["href"];
}

/** Public card title component with `useComponentId` integration */
const CardTitle: React.FC<CardTitleProps> = setDisplayName(
  function CardTitle(props) {
    const {
      children,
      className,
      href,
      target = "_self",
      title = "",
      internalId,
      debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!isRenderableContent(children)) return null;

    const element = (
      <h2
        {...rest}
        className={cn(styles.cardTitleHeading, className)}
        data-card-title-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-title-root"
      >
        {href && isValidLink(href) ? (
          <Link href={href} {...getLinkTargetProps(href, target)} title={title}>
            <span className={styles.cardTitleClickableArea} />
            <span className={styles.cardTitleContent}>{children}</span>
          </Link>
        ) : (
          children
        )}
      </h2>
    );

    return element;
  }
);

export { CardTitle };
