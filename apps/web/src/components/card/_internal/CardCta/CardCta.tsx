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

import { Icon } from "@web/components";
import { cn } from "@web/lib";

import styles from "./CardCta.module.css";

interface CardCtaProps
  extends React.ComponentProps<"div">,
    Pick<
      React.ComponentPropsWithoutRef<typeof Link>,
      "href" | "target" | "title"
    >,
    ComponentProps {}

/** A card call to action component that can optionally be wrapped in a link for navigation */
const CardCta: React.FC<CardCtaProps> = setDisplayName(function CardCta(props) {
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
    <div
      {...rest}
      className={cn(styles.cardCtaContainer, className)}
      data-card-cta-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
      data-testid="card-cta-root"
    >
      {href && isValidLink(href) ? (
        <Link
          href={href}
          {...getLinkTargetProps(href, target)}
          title={title}
          className={styles.cardCtaLink}
        >
          {children}
          <Icon.ChevronRight />
        </Link>
      ) : (
        children
      )}
    </div>
  );

  return element;
});

export { CardCta };
