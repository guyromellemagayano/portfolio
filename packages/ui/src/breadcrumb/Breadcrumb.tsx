import React from "react";

import { ChevronRight } from "lucide-react";

import {
  Li,
  type LiProps,
  type LiRef,
  Nav,
  type NavProps,
  type NavRef,
  Ol,
  type OlProps,
  type OlRef,
} from "@portfolio/components";

import { Link, type LinkProps } from "../link";
import { cn, getDataSlot } from "../utils";

export type BreadcrumbProps = NavProps;

export const Breadcrumb = React.forwardRef<NavRef, BreadcrumbProps>(
  (props, ref) => {
    const {
      "aria-label": ariaLabel = "Breadcrumb",
      className,
      ...rest
    } = props;

    return (
      <Nav
        ref={ref}
        aria-label={ariaLabel}
        {...rest}
        className={cn("text-muted-foreground text-sm", className)}
        data-slot={getDataSlot(props, "breadcrumb")}
      />
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

export type BreadcrumbListProps = OlProps;

export const BreadcrumbList = React.forwardRef<OlRef, BreadcrumbListProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Ol
        ref={ref}
        {...rest}
        className={cn("flex flex-wrap items-center gap-1.5", className)}
        data-slot={getDataSlot(props, "breadcrumb-list")}
      />
    );
  }
);

BreadcrumbList.displayName = "BreadcrumbList";

export type BreadcrumbItemProps = LiProps;

export const BreadcrumbItem = React.forwardRef<LiRef, BreadcrumbItemProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Li
        ref={ref}
        {...rest}
        className={cn("inline-flex items-center gap-1.5", className)}
        data-slot={getDataSlot(props, "breadcrumb-item")}
      />
    );
  }
);

BreadcrumbItem.displayName = "BreadcrumbItem";

export type BreadcrumbLinkProps = LinkProps;

export const BreadcrumbLink = React.forwardRef<
  React.ComponentRef<typeof Link>,
  BreadcrumbLinkProps
>((props, ref) => {
  const { className, variant = "muted", ...rest } = props;

  return (
    <Link
      ref={ref}
      variant={variant}
      {...rest}
      className={cn("font-normal", className)}
      data-slot={getDataSlot(props, "breadcrumb-link")}
    />
  );
});

BreadcrumbLink.displayName = "BreadcrumbLink";

export type BreadcrumbPageProps = React.ComponentPropsWithoutRef<"span">;

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbPageProps
>((props, ref) => {
  const { "aria-current": ariaCurrent = "page", className, ...rest } = props;

  return (
    <span
      ref={ref}
      aria-current={ariaCurrent}
      {...rest}
      className={cn("text-foreground font-medium", className)}
      data-slot={getDataSlot(props, "breadcrumb-page")}
    />
  );
});

BreadcrumbPage.displayName = "BreadcrumbPage";

export type BreadcrumbSeparatorProps = LiProps;

export const BreadcrumbSeparator = React.forwardRef<
  LiRef,
  BreadcrumbSeparatorProps
>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <Li
      ref={ref}
      aria-hidden="true"
      role="presentation"
      {...rest}
      className={cn("inline-flex items-center", className)}
      data-slot={getDataSlot(props, "breadcrumb-separator")}
    >
      {children ?? <ChevronRight aria-hidden="true" className="size-3.5" />}
    </Li>
  );
});

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export type BreadcrumbTrailItem = {
  current?: boolean;
  href?: LinkProps["href"];
  label: React.ReactNode;
  linkProps?: Omit<LinkProps, "children" | "href">;
  pageProps?: Omit<BreadcrumbPageProps, "children">;
};

export type BreadcrumbTrailProps = Omit<BreadcrumbProps, "children"> & {
  items: BreadcrumbTrailItem[];
  listProps?: Omit<BreadcrumbListProps, "children">;
  separator?: React.ReactNode;
  separatorProps?: Omit<BreadcrumbSeparatorProps, "children">;
};

function getTrailItemKey(item: BreadcrumbTrailItem, index: number) {
  if (typeof item.href === "string" && item.href) {
    return item.href;
  }

  if (typeof item.label === "string" && item.label) {
    return item.label;
  }

  return index;
}

export const BreadcrumbTrail = React.forwardRef<NavRef, BreadcrumbTrailProps>(
  (props, ref) => {
    const { items, listProps, separator, separatorProps, ...breadcrumbProps } =
      props;

    return (
      <Breadcrumb ref={ref} {...breadcrumbProps}>
        <BreadcrumbList {...listProps}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isCurrent = item.current ?? isLast;
            const key = getTrailItemKey(item, index);

            return (
              <React.Fragment key={key}>
                {index > 0 ? (
                  <BreadcrumbSeparator {...separatorProps}>
                    {separator}
                  </BreadcrumbSeparator>
                ) : null}
                <BreadcrumbItem>
                  {isCurrent || !item.href ? (
                    <BreadcrumbPage {...item.pageProps}>
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href} {...item.linkProps}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
);

BreadcrumbTrail.displayName = "BreadcrumbTrail";
