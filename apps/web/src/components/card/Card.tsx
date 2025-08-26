import React from "react";

import { Article } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  createCompoundComponent,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import {
  CardCta,
  CardDescription,
  CardEyebrow,
  CardLink,
  CardTitle,
} from "./_internal";
import styles from "./Card.module.css";

interface CardInternalProps
  extends React.ComponentProps<typeof Article>,
    Pick<
      ComponentProps,
      "componentId" | "isDebugMode" | "isClient" | "isMemoized"
    > {}

/** Internal card component with all props */
const CardInternal: React.FC<CardInternalProps> = setDisplayName(
  function InternalCard(props) {
    const { children, className, componentId, isDebugMode, ...rest } = props;

    if (!isRenderableContent(children)) return null;

    const element = (
      <Article
        {...rest}
        className={cn(styles.card, className)}
        data-card-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-root"
      >
        {children}
      </Article>
    );

    return element;
  }
);

interface CardExternalProps
  extends React.ComponentProps<typeof Article>,
    Pick<
      ComponentProps,
      "internalId" | "debugMode" | "isClient" | "isMemoized"
    > {}

type CardCompoundComponent = React.ComponentType<CardExternalProps> & {
  /** A card link component that provides interactive hover effects and accessibility features */
  Link: typeof CardLink;
  /** A card title component that can optionally be wrapped in a link for navigation */
  Title: typeof CardTitle;
  /** A card description component that can optionally be wrapped in a link for navigation */
  Description: typeof CardDescription;
  /** A card call to action component that can optionally be wrapped in a link for navigation */
  Cta: typeof CardCta;
  /** A card eyebrow component that can optionally be wrapped in a link for navigation */
  Eyebrow: typeof CardEyebrow;
};

/** Main card component with compound sub-components */
const Card = createCompoundComponent("Card", CardInternal, useComponentId, {
  Eyebrow: CardEyebrow,
  Link: CardLink,
  Title: CardTitle,
  Description: CardDescription,
  Cta: CardCta,
}) as CardCompoundComponent;

export { Card };
