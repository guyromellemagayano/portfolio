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
  type PrimitiveElement,
  Section as SectionPrimitive,
  type SectionProps as SectionPrimitiveProps,
  type SectionRef,
  Span,
  type SpanProps,
  type SpanRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type SectionHeaderProps = DivProps;
export type SectionEyebrowProps = SpanProps;
export type SectionHeadingProps = HeadingProps<PrimitiveElement>;
export type SectionDescriptionProps = PProps;
export type SectionActionsProps = DivProps;

export type SectionProps = Omit<
  SectionPrimitiveProps,
  | "description"
  | "descriptionId"
  | "descriptionProps"
  | "heading"
  | "headingAs"
  | "headingId"
  | "headingProps"
  | "headerProps"
> & {
  actions?: React.ReactNode;
  actionsProps?: SectionActionsProps;
  description?: React.ReactNode;
  descriptionId?: string;
  descriptionProps?: SectionDescriptionProps;
  eyebrow?: React.ReactNode;
  eyebrowProps?: SectionEyebrowProps;
  heading?: React.ReactNode;
  headingAs?: PrimitiveElement;
  headingId?: string;
  headingProps?: SectionHeadingProps;
  headerProps?: SectionHeaderProps;
};

function hasRenderableContent(value: React.ReactNode) {
  return value !== null && value !== undefined && value !== false;
}

function getIdTokens(value: string | undefined) {
  return value?.split(/\s+/u).filter(Boolean) ?? [];
}

function mergeIdRefs(...values: Array<string | undefined>) {
  const tokens = new Set<string>();

  for (const value of values) {
    for (const token of getIdTokens(value)) {
      tokens.add(token);
    }
  }

  return tokens.size > 0 ? Array.from(tokens).join(" ") : undefined;
}

export const Section = React.forwardRef<SectionRef, SectionProps>(
  (props, ref) => {
    const {
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": ariaLabelledBy,
      actions,
      actionsProps,
      children,
      className,
      description,
      descriptionId,
      descriptionProps,
      eyebrow,
      eyebrowProps,
      heading,
      headingAs = "h2",
      headingId,
      headingProps,
      headerProps,
      id,
      ...rest
    } = props;
    const reactId = React.useId();
    const idBase = id ?? `section-${reactId}`;
    const hasActions = hasRenderableContent(actions);
    const hasDescription = hasRenderableContent(description);
    const hasEyebrow = hasRenderableContent(eyebrow);
    const hasHeading = hasRenderableContent(heading);
    const hasHeader = hasActions || hasDescription || hasEyebrow || hasHeading;
    const resolvedHeadingId =
      headingProps?.id ?? headingId ?? `${idBase}-heading`;
    const resolvedDescriptionId =
      descriptionProps?.id ?? descriptionId ?? `${idBase}-description`;
    const labelledBy =
      ariaLabelledBy ??
      (!rest["aria-label"] && hasHeading ? resolvedHeadingId : undefined);
    const describedBy = mergeIdRefs(
      ariaDescribedBy,
      hasDescription ? resolvedDescriptionId : undefined
    );

    return (
      <SectionPrimitive
        ref={ref}
        {...rest}
        aria-describedby={describedBy}
        aria-labelledby={labelledBy}
        className={cn("space-y-6", className)}
        data-slot={getDataSlot(props, "section")}
        id={id}
      >
        {hasHeader ? (
          <SectionHeader {...headerProps}>
            <Div className="space-y-2" data-slot="section-copy">
              {hasEyebrow ? (
                <SectionEyebrow {...eyebrowProps}>{eyebrow}</SectionEyebrow>
              ) : null}
              {hasHeading ? (
                <SectionHeading
                  as={headingAs}
                  {...headingProps}
                  id={resolvedHeadingId}
                >
                  {heading}
                </SectionHeading>
              ) : null}
              {hasDescription ? (
                <SectionDescription
                  {...descriptionProps}
                  id={resolvedDescriptionId}
                >
                  {description}
                </SectionDescription>
              ) : null}
            </Div>
            {hasActions ? (
              <SectionActions {...actionsProps}>{actions}</SectionActions>
            ) : null}
          </SectionHeader>
        ) : null}
        {children}
      </SectionPrimitive>
    );
  }
);

Section.displayName = "Section";

export const SectionHeader = React.forwardRef<DivRef, SectionHeaderProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Div
        ref={ref}
        {...rest}
        className={cn(
          "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
          className
        )}
        data-slot={getDataSlot(props, "section-header")}
      />
    );
  }
);

SectionHeader.displayName = "SectionHeader";

export const SectionEyebrow = React.forwardRef<SpanRef, SectionEyebrowProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Span
        ref={ref}
        {...rest}
        className={cn(
          "text-muted-foreground text-sm font-medium tracking-wider uppercase",
          className
        )}
        data-slot={getDataSlot(props, "section-eyebrow")}
      />
    );
  }
);

SectionEyebrow.displayName = "SectionEyebrow";

export const SectionHeading = React.forwardRef<HeadingRef, SectionHeadingProps>(
  (props, ref) => {
    const { as = "h2", className, ...rest } = props;

    return (
      <Heading
        ref={ref}
        as={as}
        {...rest}
        className={cn(
          "text-3xl leading-tight font-semibold tracking-normal",
          className
        )}
        data-slot={getDataSlot(props, "section-heading")}
      />
    );
  }
);

SectionHeading.displayName = "SectionHeading";

export const SectionDescription = React.forwardRef<
  PRef,
  SectionDescriptionProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <P
      ref={ref}
      {...rest}
      className={cn("text-muted-foreground max-w-2xl text-base", className)}
      data-slot={getDataSlot(props, "section-description")}
    />
  );
});

SectionDescription.displayName = "SectionDescription";

export const SectionActions = React.forwardRef<DivRef, SectionActionsProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Div
        ref={ref}
        {...rest}
        className={cn("flex flex-wrap items-center gap-2", className)}
        data-slot={getDataSlot(props, "section-actions")}
      />
    );
  }
);

SectionActions.displayName = "SectionActions";
