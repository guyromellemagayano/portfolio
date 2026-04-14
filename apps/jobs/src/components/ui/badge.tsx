/**
 * @file apps/jobs/src/components/ui/Badge.tsx
 * @author Guy Romelle Magayano
 * @description Badge primitive for compact jobs metadata labels.
 */

import { type ComponentProps } from "react";

import { cn } from "@jobs/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "border-zinc-200 bg-zinc-100 text-zinc-700",
        secondary: "border-zinc-200 bg-white text-zinc-700",
        success: "border-emerald-200 bg-emerald-50 text-emerald-700",
        warning: "border-amber-200 bg-amber-50 text-amber-700",
        danger: "border-rose-200 bg-rose-50 text-rose-700",
        outline: "border-zinc-300 bg-transparent text-zinc-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge(props: BadgeProps) {
  const { className, variant, ...rest } = props;

  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      data-slot="badge"
      {...rest}
    />
  );
}
