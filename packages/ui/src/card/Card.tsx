import React from "react";

import {
  Div,
  type DivProps,
  type DivRef,
  Heading,
  type HeadingProps,
  type HeadingRef,
  P,
  type PProps,
  type PRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

type CardPartProps = DivProps;

export const Card = React.forwardRef<DivRef, CardPartProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <Div
      ref={ref}
      {...rest}
      className={cn(
        "bg-card text-card-foreground rounded-lg border shadow-sm",
        className
      )}
      data-slot={getDataSlot(props, "card")}
    />
  );
});

Card.displayName = "Card";

export const CardHeader = React.forwardRef<DivRef, CardPartProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Div
        ref={ref}
        {...rest}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        data-slot={getDataSlot(props, "card-header")}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

export type CardTitleProps = HeadingProps;

export const CardTitle = React.forwardRef<HeadingRef, CardTitleProps>(
  (props, ref) => {
    const { as = "h3", className, ...rest } = props;

    return (
      <Heading
        ref={ref}
        as={as}
        {...rest}
        className={cn(
          "text-2xl leading-none font-semibold tracking-normal",
          className
        )}
        data-slot={getDataSlot(props, "card-title")}
      />
    );
  }
);

CardTitle.displayName = "CardTitle";

export type CardDescriptionProps = PProps;

export const CardDescription = React.forwardRef<PRef, CardDescriptionProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <P
        ref={ref}
        {...rest}
        className={cn("text-muted-foreground text-sm", className)}
        data-slot={getDataSlot(props, "card-description")}
      />
    );
  }
);

CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<DivRef, CardPartProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Div
        ref={ref}
        {...rest}
        className={cn("p-6 pt-0", className)}
        data-slot={getDataSlot(props, "card-content")}
      />
    );
  }
);

CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<DivRef, CardPartProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Div
        ref={ref}
        {...rest}
        className={cn("flex items-center p-6 pt-0", className)}
        data-slot={getDataSlot(props, "card-footer")}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";
