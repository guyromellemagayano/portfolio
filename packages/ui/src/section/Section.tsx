import React from "react";

import {
  Section as SectionPrimitive,
  type SectionProps as SectionPrimitiveProps,
  type SectionRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type SectionProps = SectionPrimitiveProps;

export const Section = React.forwardRef<SectionRef, SectionProps>(
  (props, ref) => {
    const { className, descriptionProps, headingProps, headerProps, ...rest } =
      props;

    return (
      <SectionPrimitive
        ref={ref}
        {...rest}
        className={cn("space-y-6", className)}
        data-slot={getDataSlot(props, "section")}
        descriptionProps={{
          ...descriptionProps,
          className: cn(
            "text-muted-foreground max-w-2xl text-base",
            descriptionProps?.className
          ),
        }}
        headingProps={{
          ...headingProps,
          className: cn(
            "text-3xl leading-tight font-semibold tracking-normal",
            headingProps?.className
          ),
        }}
        headerProps={{
          ...headerProps,
          className: cn("space-y-2", headerProps?.className),
        }}
      />
    );
  }
);

Section.displayName = "Section";
