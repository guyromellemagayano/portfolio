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
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type EmptyStateHeaderProps = DivProps;
export type EmptyStateIconProps = DivProps;
export type EmptyStateTitleProps = HeadingProps<PrimitiveElement>;
export type EmptyStateDescriptionProps = PProps;
export type EmptyStateActionsProps = DivProps;

type EmptyStateRootProps = Omit<
  SectionPrimitiveProps,
  | "description"
  | "descriptionId"
  | "descriptionProps"
  | "heading"
  | "headingAs"
  | "headingId"
  | "headingProps"
  | "headerProps"
>;

export type EmptyStateProps = EmptyStateRootProps & {
  actions?: React.ReactNode;
  actionsProps?: EmptyStateActionsProps;
  description?: React.ReactNode;
  descriptionId?: string;
  descriptionProps?: EmptyStateDescriptionProps;
  headerProps?: EmptyStateHeaderProps;
  icon?: React.ReactNode;
  iconProps?: EmptyStateIconProps;
  title?: React.ReactNode;
  titleAs?: EmptyStateTitleProps["as"];
  titleId?: string;
  titleProps?: EmptyStateTitleProps;
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

export const EmptyState = React.forwardRef<SectionRef, EmptyStateProps>(
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
      headerProps,
      icon,
      iconProps,
      id,
      title,
      titleAs = "h2",
      titleId,
      titleProps,
      ...rest
    } = props;
    const reactId = React.useId();
    const idBase = id ?? `empty-state-${reactId}`;
    const hasIcon = hasRenderableContent(icon);
    const hasTitle = hasRenderableContent(title);
    const hasDescription = hasRenderableContent(description);
    const hasActions = hasRenderableContent(actions);
    const resolvedTitleId = titleProps?.id ?? titleId ?? `${idBase}-title`;
    const resolvedDescriptionId =
      descriptionProps?.id ?? descriptionId ?? `${idBase}-description`;
    const labelledBy =
      ariaLabelledBy ??
      (!rest["aria-label"] && hasTitle ? resolvedTitleId : undefined);
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
        className={cn(
          "mx-auto flex max-w-lg flex-col items-center justify-center gap-4 py-10 text-center",
          className
        )}
        data-slot={getDataSlot(props, "empty-state")}
        id={id}
      >
        {hasIcon ? (
          <EmptyStateIcon {...iconProps}>{icon}</EmptyStateIcon>
        ) : null}
        {hasTitle || hasDescription ? (
          <EmptyStateHeader {...headerProps}>
            {hasTitle ? (
              <EmptyStateTitle
                as={titleAs}
                {...titleProps}
                id={resolvedTitleId}
              >
                {title}
              </EmptyStateTitle>
            ) : null}
            {hasDescription ? (
              <EmptyStateDescription
                {...descriptionProps}
                id={resolvedDescriptionId}
              >
                {description}
              </EmptyStateDescription>
            ) : null}
          </EmptyStateHeader>
        ) : null}
        {children}
        {hasActions ? (
          <EmptyStateActions {...actionsProps}>{actions}</EmptyStateActions>
        ) : null}
      </SectionPrimitive>
    );
  }
);

EmptyState.displayName = "EmptyState";

export const EmptyStateIcon = React.forwardRef<DivRef, EmptyStateIconProps>(
  (props, ref) => {
    const { "aria-hidden": ariaHidden = true, className, ...rest } = props;

    return (
      <Div
        ref={ref}
        aria-hidden={ariaHidden}
        {...rest}
        className={cn(
          "bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full",
          className
        )}
        data-slot={getDataSlot(props, "empty-state-icon")}
      />
    );
  }
);

EmptyStateIcon.displayName = "EmptyStateIcon";

export const EmptyStateHeader = React.forwardRef<DivRef, EmptyStateHeaderProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Div
        ref={ref}
        {...rest}
        className={cn("space-y-2", className)}
        data-slot={getDataSlot(props, "empty-state-header")}
      />
    );
  }
);

EmptyStateHeader.displayName = "EmptyStateHeader";

export const EmptyStateTitle = React.forwardRef<
  HeadingRef,
  EmptyStateTitleProps
>((props, ref) => {
  const { as = "h2", className, ...rest } = props;

  return (
    <Heading
      ref={ref}
      as={as}
      {...rest}
      className={cn(
        "text-xl leading-tight font-semibold tracking-normal",
        className
      )}
      data-slot={getDataSlot(props, "empty-state-title")}
    />
  );
});

EmptyStateTitle.displayName = "EmptyStateTitle";

export const EmptyStateDescription = React.forwardRef<
  PRef,
  EmptyStateDescriptionProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <P
      ref={ref}
      {...rest}
      className={cn("text-muted-foreground text-sm", className)}
      data-slot={getDataSlot(props, "empty-state-description")}
    />
  );
});

EmptyStateDescription.displayName = "EmptyStateDescription";

export const EmptyStateActions = React.forwardRef<
  DivRef,
  EmptyStateActionsProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <Div
      ref={ref}
      {...rest}
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className
      )}
      data-slot={getDataSlot(props, "empty-state-actions")}
    />
  );
});

EmptyStateActions.displayName = "EmptyStateActions";
