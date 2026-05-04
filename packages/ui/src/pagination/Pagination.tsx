import React from "react";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import {
  Li,
  type LiProps,
  type LiRef,
  Nav,
  type NavProps,
  type NavRef,
  Span,
  type SpanProps,
  type SpanRef,
  Ul,
  type UlProps,
  type UlRef,
} from "@portfolio/components";

import { Link, type LinkProps } from "../link";
import { cn, getDataSlot } from "../utils";
import { VisuallyHidden } from "../visually-hidden";

export type PaginationProps = NavProps;

export const Pagination = React.forwardRef<NavRef, PaginationProps>(
  (props, ref) => {
    const {
      "aria-label": ariaLabel = "Pagination",
      className,
      ...rest
    } = props;

    return (
      <Nav
        ref={ref}
        aria-label={ariaLabel}
        {...rest}
        className={cn("mx-auto flex w-full justify-center", className)}
        data-slot={getDataSlot(props, "pagination")}
      />
    );
  }
);

Pagination.displayName = "Pagination";

export type PaginationContentProps = UlProps;

export const PaginationContent = React.forwardRef<
  UlRef,
  PaginationContentProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <Ul
      ref={ref}
      {...rest}
      className={cn("flex flex-row items-center gap-1", className)}
      data-slot={getDataSlot(props, "pagination-content")}
    />
  );
});

PaginationContent.displayName = "PaginationContent";

export type PaginationItemProps = LiProps;

export const PaginationItem = React.forwardRef<LiRef, PaginationItemProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Li
        ref={ref}
        {...rest}
        className={cn("inline-flex", className)}
        data-slot={getDataSlot(props, "pagination-item")}
      />
    );
  }
);

PaginationItem.displayName = "PaginationItem";

type PaginationLinkBaseProps = Omit<LinkProps, "href" | "variant"> & {
  /** Mark this item as the current page and expose `aria-current="page"`. */
  current?: boolean;
  /** Remove this item from tab order and expose `aria-disabled`. */
  disabled?: boolean;
  href?: LinkProps["href"];
};

export type PaginationLinkProps = PaginationLinkBaseProps;
export type PaginationLinkRef = React.ComponentRef<typeof Link> | SpanRef;

function getPaginationLinkClassName({
  className,
  current,
  disabled,
}: Pick<PaginationLinkProps, "className" | "current" | "disabled">) {
  return cn(
    "focus-visible:ring-ring inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
    current
      ? "border-input bg-background text-foreground hover:text-foreground border"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
    disabled ? "pointer-events-none opacity-50" : undefined,
    className
  );
}

export const PaginationLink = React.forwardRef<
  PaginationLinkRef,
  PaginationLinkProps
>((props, ref) => {
  const {
    "aria-current": ariaCurrent,
    "aria-disabled": ariaDisabled,
    className,
    current,
    disabled,
    href,
    tabIndex,
    ...rest
  } = props;
  const resolvedDisabled = disabled || !href;
  const resolvedClassName = getPaginationLinkClassName({
    className,
    current,
    disabled: resolvedDisabled,
  });
  const resolvedAriaCurrent = current ? (ariaCurrent ?? "page") : ariaCurrent;

  if (resolvedDisabled) {
    return (
      <Span
        ref={ref as React.Ref<SpanRef>}
        {...(rest as SpanProps)}
        aria-current={resolvedAriaCurrent}
        aria-disabled={ariaDisabled ?? true}
        className={resolvedClassName}
        data-disabled=""
        data-slot={getDataSlot(props, "pagination-link")}
        tabIndex={tabIndex ?? -1}
      />
    );
  }

  return (
    <Link
      ref={ref as React.Ref<React.ComponentRef<typeof Link>>}
      href={href}
      {...rest}
      aria-current={resolvedAriaCurrent}
      aria-disabled={ariaDisabled}
      className={resolvedClassName}
      data-slot={getDataSlot(props, "pagination-link")}
      tabIndex={tabIndex}
      variant="subtle"
    />
  );
});

PaginationLink.displayName = "PaginationLink";

export type PaginationPreviousProps = Omit<PaginationLinkProps, "children"> & {
  label?: React.ReactNode;
};

export const PaginationPrevious = React.forwardRef<
  PaginationLinkRef,
  PaginationPreviousProps
>((props, ref) => {
  const {
    "aria-label": ariaLabel = "Previous page",
    className,
    label = "Previous",
    ...rest
  } = props;

  return (
    <PaginationLink
      ref={ref}
      aria-label={ariaLabel}
      {...rest}
      className={cn("gap-1 pr-3 pl-2.5", className)}
      data-slot={getDataSlot(props, "pagination-previous")}
    >
      <ChevronLeft aria-hidden="true" className="size-4" />
      <span>{label}</span>
    </PaginationLink>
  );
});

PaginationPrevious.displayName = "PaginationPrevious";

export type PaginationNextProps = Omit<PaginationLinkProps, "children"> & {
  label?: React.ReactNode;
};

export const PaginationNext = React.forwardRef<
  PaginationLinkRef,
  PaginationNextProps
>((props, ref) => {
  const {
    "aria-label": ariaLabel = "Next page",
    className,
    label = "Next",
    ...rest
  } = props;

  return (
    <PaginationLink
      ref={ref}
      aria-label={ariaLabel}
      {...rest}
      className={cn("gap-1 pr-2.5 pl-3", className)}
      data-slot={getDataSlot(props, "pagination-next")}
    >
      <span>{label}</span>
      <ChevronRight aria-hidden="true" className="size-4" />
    </PaginationLink>
  );
});

PaginationNext.displayName = "PaginationNext";

export type PaginationEllipsisProps = Omit<LiProps, "children"> & {
  label?: string;
};

export const PaginationEllipsis = React.forwardRef<
  LiRef,
  PaginationEllipsisProps
>((props, ref) => {
  const { className, label = "More pages", ...rest } = props;

  return (
    <Li
      ref={ref}
      {...rest}
      className={cn(
        "text-muted-foreground flex h-9 w-9 items-center justify-center",
        className
      )}
      data-slot={getDataSlot(props, "pagination-ellipsis")}
    >
      <MoreHorizontal aria-hidden="true" className="size-4" />
      <VisuallyHidden>{label}</VisuallyHidden>
    </Li>
  );
});

PaginationEllipsis.displayName = "PaginationEllipsis";

export type PaginationControlPage = {
  current?: boolean;
  disabled?: boolean;
  href?: LinkProps["href"];
  itemProps?: Omit<PaginationItemProps, "children">;
  label: React.ReactNode;
  linkProps?: Omit<
    PaginationLinkProps,
    "children" | "current" | "disabled" | "href"
  >;
  type?: "page";
};

export type PaginationControlEllipsis = {
  ellipsisProps?: Omit<PaginationEllipsisProps, "children">;
  label?: string;
  type: "ellipsis";
};

export type PaginationControlItem =
  | PaginationControlEllipsis
  | PaginationControlPage;

export type PaginationControlsProps = Omit<PaginationProps, "children"> & {
  contentProps?: Omit<PaginationContentProps, "children">;
  next?: PaginationNextProps | null;
  pages: PaginationControlItem[];
  previous?: PaginationPreviousProps | null;
};

function getPaginationControlKey(item: PaginationControlItem, index: number) {
  if (item.type === "ellipsis") {
    return `ellipsis-${index}`;
  }

  if (typeof item.href === "string" && item.href) {
    return item.href;
  }

  if (typeof item.label === "string" && item.label) {
    return item.label;
  }

  return index;
}

export const PaginationControls = React.forwardRef<
  NavRef,
  PaginationControlsProps
>((props, ref) => {
  const { contentProps, next, pages, previous, ...paginationProps } = props;

  return (
    <Pagination ref={ref} {...paginationProps}>
      <PaginationContent {...contentProps}>
        {previous ? (
          <PaginationItem>
            <PaginationPrevious {...previous} />
          </PaginationItem>
        ) : null}
        {pages.map((item, index) => {
          const key = getPaginationControlKey(item, index);

          if (item.type === "ellipsis") {
            return (
              <PaginationEllipsis
                key={key}
                label={item.label}
                {...item.ellipsisProps}
              />
            );
          }

          return (
            <PaginationItem key={key} {...item.itemProps}>
              <PaginationLink
                current={item.current}
                disabled={item.disabled}
                href={item.href}
                {...item.linkProps}
              >
                {item.label}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {next ? (
          <PaginationItem>
            <PaginationNext {...next} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
});

PaginationControls.displayName = "PaginationControls";
