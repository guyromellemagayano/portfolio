import React from "react";

import {
  Dd,
  type DdProps,
  type DdRef,
  Div,
  type DivProps,
  type DivRef,
  Dl,
  type DlProps,
  type DlRef,
  Dt,
  type DtProps,
  type DtRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type DescriptionListOrientation = "inline" | "stacked";

export type DescriptionTermProps = DtProps;
export type DescriptionDetailsProps = DdProps;
export type DescriptionListItemProps = DivProps & {
  orientation?: DescriptionListOrientation;
};

export type DescriptionListItemData = {
  description: React.ReactNode;
  detailsProps?: DescriptionDetailsProps;
  itemProps?: DescriptionListItemProps;
  key?: React.Key;
  term: React.ReactNode;
  termProps?: DescriptionTermProps;
};

export type DescriptionListProps = DlProps & {
  detailsProps?: DescriptionDetailsProps;
  itemProps?: DescriptionListItemProps;
  items?: readonly DescriptionListItemData[];
  orientation?: DescriptionListOrientation;
  termProps?: DescriptionTermProps;
};

function getDescriptionListItemKey(
  item: DescriptionListItemData,
  index: number
) {
  if (item.key !== undefined) {
    return item.key;
  }

  if (typeof item.term === "number" || typeof item.term === "string") {
    return item.term;
  }

  return index;
}

export const DescriptionList = React.forwardRef<DlRef, DescriptionListProps>(
  (props, ref) => {
    const {
      children,
      className,
      detailsProps,
      itemProps,
      items,
      orientation = "stacked",
      termProps,
      ...rest
    } = props;

    return (
      <Dl
        ref={ref}
        {...rest}
        className={cn("grid gap-4", className)}
        data-slot={getDataSlot(props, "description-list")}
      >
        {children}
        {items?.map((item, index) => (
          <DescriptionListItem
            key={getDescriptionListItemKey(item, index)}
            orientation={orientation}
            {...itemProps}
            {...item.itemProps}
          >
            <DescriptionTerm {...termProps} {...item.termProps}>
              {item.term}
            </DescriptionTerm>
            <DescriptionDetails {...detailsProps} {...item.detailsProps}>
              {item.description}
            </DescriptionDetails>
          </DescriptionListItem>
        ))}
      </Dl>
    );
  }
);

DescriptionList.displayName = "DescriptionList";

export const DescriptionListItem = React.forwardRef<
  DivRef,
  DescriptionListItemProps
>((props, ref) => {
  const { className, orientation = "stacked", ...rest } = props;

  return (
    <Div
      ref={ref}
      {...rest}
      className={cn(
        "grid gap-1",
        orientation === "inline"
          ? "sm:grid-cols-[minmax(8rem,14rem)_1fr] sm:gap-4"
          : undefined,
        className
      )}
      data-orientation={orientation}
      data-slot={getDataSlot(props, "description-list-item")}
    />
  );
});

DescriptionListItem.displayName = "DescriptionListItem";

export const DescriptionTerm = React.forwardRef<DtRef, DescriptionTermProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Dt
        ref={ref}
        {...rest}
        className={cn("text-foreground text-sm font-medium", className)}
        data-slot={getDataSlot(props, "description-term")}
      />
    );
  }
);

DescriptionTerm.displayName = "DescriptionTerm";

export const DescriptionDetails = React.forwardRef<
  DdRef,
  DescriptionDetailsProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <Dd
      ref={ref}
      {...rest}
      className={cn("text-muted-foreground text-sm", className)}
      data-slot={getDataSlot(props, "description-details")}
    />
  );
});

DescriptionDetails.displayName = "DescriptionDetails";
