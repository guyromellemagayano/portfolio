import React from "react";

import { Article } from "@guyromellemagayano/components";

import {
  type CardComponent,
  CardCta,
  CardDescription,
  CardEyebrow,
  CardLink,
  type CardProps,
  type CardRef,
  CardTitle,
} from "@web/components/card";
import { cn } from "@web/lib";

/** A card component that can be used to display content in a card-like format. */
export const Card = React.forwardRef<CardRef, CardProps>(
  function Card(props, ref) {
    const { children, className, ...rest } = props;

    const element = (
      <Article
        ref={ref}
        className={cn("group relative flex flex-col items-start", className)}
        {...rest}
      >
        {children}
      </Article>
    );

    return element;
  }
) as CardComponent;

Card.displayName = "Card";

Card.Link = CardLink;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Cta = CardCta;
Card.Eyebrow = CardEyebrow;
