import React from "react";

import {
  Div,
  type DivProps,
  type DivRef,
  Heading,
  type HeadingProps,
  type HeadingRef,
  Li,
  type LiProps,
  type LiRef,
  Ol,
  type OlRef,
  P,
  type PProps,
  type PRef,
  Ul,
  type UlProps,
  type UlRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type FeatureListItemData = {
  description?: React.ReactNode;
  descriptionProps?: FeatureDescriptionProps;
  icon?: React.ReactNode;
  iconProps?: FeatureIconProps;
  itemProps?: FeatureItemProps;
  key?: React.Key;
  title: React.ReactNode;
  titleProps?: FeatureTitleProps;
};

export type FeatureListProps = Omit<UlProps, "as"> & {
  items?: readonly FeatureListItemData[];
  itemProps?: FeatureItemProps;
  ordered?: boolean;
};

export type FeatureItemProps = Omit<LiProps, "title">;
export type FeatureIconProps = DivProps;
export type FeatureTitleProps = HeadingProps;
export type FeatureDescriptionProps = PProps;

function hasRenderableContent(value: React.ReactNode) {
  return value !== null && value !== undefined && value !== false;
}

function getFeatureKey(item: FeatureListItemData, index: number) {
  if (item.key !== undefined) {
    return item.key;
  }

  if (typeof item.title === "number" || typeof item.title === "string") {
    return item.title;
  }

  return index;
}

export const FeatureList = React.forwardRef<UlRef | OlRef, FeatureListProps>(
  (props, ref) => {
    const { children, className, itemProps, items, ordered, ...rest } = props;
    const content = (
      <>
        {children}
        {items?.map((item, index) => (
          <FeatureItem
            key={getFeatureKey(item, index)}
            {...itemProps}
            {...item.itemProps}
            description={item.description}
            descriptionProps={item.descriptionProps}
            icon={item.icon}
            iconProps={item.iconProps}
            title={item.title}
            titleProps={item.titleProps}
          />
        ))}
      </>
    );

    if (ordered) {
      return (
        <Ol
          ref={ref as React.Ref<HTMLOListElement>}
          {...rest}
          className={cn("grid gap-4", className)}
          data-slot={getDataSlot(props, "feature-list")}
        >
          {content}
        </Ol>
      );
    }

    return (
      <Ul
        ref={ref as React.Ref<HTMLUListElement>}
        {...rest}
        className={cn("grid gap-4", className)}
        data-slot={getDataSlot(props, "feature-list")}
      >
        {content}
      </Ul>
    );
  }
);

FeatureList.displayName = "FeatureList";

export const FeatureItem = React.forwardRef<
  LiRef,
  FeatureItemProps & Omit<FeatureListItemData, "itemProps" | "key">
>((props, ref) => {
  const {
    children,
    className,
    description,
    descriptionProps,
    icon,
    iconProps,
    title,
    titleProps,
    ...rest
  } = props;
  const hasIcon = hasRenderableContent(icon);
  const hasDescription = hasRenderableContent(description);

  return (
    <Li
      ref={ref}
      {...rest}
      className={cn("flex gap-3", className)}
      data-slot={getDataSlot(props, "feature-item")}
    >
      {hasIcon ? <FeatureIcon {...iconProps}>{icon}</FeatureIcon> : null}
      <Div className="min-w-0 space-y-1" data-slot="feature-content">
        <FeatureTitle {...titleProps}>{title}</FeatureTitle>
        {hasDescription ? (
          <FeatureDescription {...descriptionProps}>
            {description}
          </FeatureDescription>
        ) : null}
        {children}
      </Div>
    </Li>
  );
});

FeatureItem.displayName = "FeatureItem";

export const FeatureIcon = React.forwardRef<DivRef, FeatureIconProps>(
  (props, ref) => {
    const { "aria-hidden": ariaHidden = true, className, ...rest } = props;

    return (
      <Div
        ref={ref}
        aria-hidden={ariaHidden}
        {...rest}
        className={cn("text-primary mt-1 shrink-0", className)}
        data-slot={getDataSlot(props, "feature-icon")}
      />
    );
  }
);

FeatureIcon.displayName = "FeatureIcon";

export const FeatureTitle = React.forwardRef<HeadingRef, FeatureTitleProps>(
  (props, ref) => {
    const { as = "h3", className, ...rest } = props;

    return (
      <Heading
        ref={ref}
        as={as}
        {...rest}
        className={cn("text-base font-semibold tracking-normal", className)}
        data-slot={getDataSlot(props, "feature-title")}
      />
    );
  }
);

FeatureTitle.displayName = "FeatureTitle";

export const FeatureDescription = React.forwardRef<
  PRef,
  FeatureDescriptionProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <P
      ref={ref}
      {...rest}
      className={cn("text-muted-foreground text-sm leading-6", className)}
      data-slot={getDataSlot(props, "feature-description")}
    />
  );
});

FeatureDescription.displayName = "FeatureDescription";
