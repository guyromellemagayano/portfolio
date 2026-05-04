import React from "react";

import { Main, type MainProps, type MainRef } from "@portfolio/components";

import { Link, type LinkProps } from "../link";
import { cn, getDataSlot } from "../utils";

export const SKIP_LINK_TARGET_ID = "main-content";

function getTargetId(targetId: string | undefined) {
  const resolvedTargetId = targetId?.trim() || SKIP_LINK_TARGET_ID;

  return resolvedTargetId.startsWith("#")
    ? resolvedTargetId.slice(1)
    : resolvedTargetId;
}

export type SkipLinkProps = Omit<LinkProps, "href" | "variant"> & {
  href?: `#${string}`;
  targetId?: string;
};

export const SkipLink = React.forwardRef<
  React.ComponentRef<typeof Link>,
  SkipLinkProps
>((props, ref) => {
  const {
    children = "Skip to content",
    className,
    href,
    targetId,
    ...rest
  } = props;
  const resolvedHref = href ?? `#${getTargetId(targetId)}`;

  return (
    <Link
      ref={ref}
      href={resolvedHref}
      {...rest}
      className={cn(
        "focus:bg-background focus:text-foreground focus:ring-ring sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:shadow-lg focus:ring-2 focus:ring-offset-2",
        className
      )}
      data-slot={getDataSlot(props, "skip-link")}
      variant="subtle"
    >
      {children}
    </Link>
  );
});

SkipLink.displayName = "SkipLink";

export type SkipLinkTargetProps = MainProps & {
  targetId?: string;
};

export const SkipLinkTarget = React.forwardRef<MainRef, SkipLinkTargetProps>(
  (props, ref) => {
    const { className, id, tabIndex, targetId, ...rest } = props;

    return (
      <Main
        ref={ref}
        id={id ?? getTargetId(targetId)}
        tabIndex={tabIndex ?? -1}
        {...rest}
        className={cn("scroll-mt-4 focus-visible:outline-none", className)}
        data-slot={getDataSlot(props, "skip-link-target")}
      />
    );
  }
);

SkipLinkTarget.displayName = "SkipLinkTarget";
