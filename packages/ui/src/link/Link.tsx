/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { A, type AProps, type ARef } from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export const linkVariants = cva(
  "focus-visible:ring-ring font-medium underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
  {
    variants: {
      variant: {
        default: "text-primary hover:underline",
        muted: "text-muted-foreground hover:text-foreground",
        subtle: "text-foreground hover:text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type LinkProps = AProps &
  VariantProps<typeof linkVariants> & {
    external?: boolean;
    newTab?: boolean;
  };

function isExternalHref(href: unknown) {
  return typeof href === "string" && /^(?:https?:)?\/\//u.test(href);
}

export const Link = React.forwardRef<ARef, LinkProps>((props, ref) => {
  const { className, external, newTab, target, variant, ...rest } = props;
  const resolvedExternal = external ?? isExternalHref(rest.href);
  const resolvedTarget = newTab ? "_blank" : target;
  const opensNewTab = resolvedTarget === "_blank";

  return (
    <A
      ref={ref}
      target={resolvedTarget}
      {...rest}
      className={cn(linkVariants({ variant }), className)}
      data-external={resolvedExternal ? "" : undefined}
      data-new-tab={opensNewTab ? "" : undefined}
      data-slot={getDataSlot(props, "link")}
    />
  );
});

Link.displayName = "Link";
