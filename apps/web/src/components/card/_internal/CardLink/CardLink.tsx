import React from "react";

import Link from "next/link";

import { Span } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  getLinkTargetProps,
  isRenderableContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import styles from "./CardLink.module.css";

interface CardLinkProps
  extends React.ComponentProps<"div">,
    Pick<
      React.ComponentPropsWithoutRef<typeof Link>,
      "href" | "target" | "title"
    >,
    ComponentProps {}

/** A card link component that can optionally be wrapped in a link for navigation */
const CardLink: React.FC<CardLinkProps> = setDisplayName(
  function CardLink(props) {
    const {
      children,
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
        data-card-link-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-link-root"
      >
        <div className={styles.cardLinkBackground} />
        {href && isValidLink(href) ? (
          <Link href={href} {...getLinkTargetProps(href, target)} title={title}>
            <Span className={styles.cardLinkClickableArea} />
            <Span className={styles.cardLinkContent}>{children}</Span>
          </Link>
        ) : (
          children
        )}
      </div>
    );

    return element;
  }
);

export { CardLink };
