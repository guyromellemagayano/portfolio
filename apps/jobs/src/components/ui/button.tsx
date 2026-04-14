/**
 * @file apps/jobs/src/components/ui/Button.tsx
 * @author Guy Romelle Magayano
 * @description Button primitive for actions across the jobs app.
 */

import { type ComponentProps } from "react";

import { cn } from "@jobs/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// eslint-disable-next-line react-refresh/only-export-components
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20",
  {
    variants: {
      variant: {
        default: "bg-zinc-950 text-zinc-50 shadow-sm hover:bg-zinc-800",
        secondary:
          "border border-zinc-200 bg-white text-zinc-800 shadow-sm hover:border-zinc-300 hover:bg-zinc-50",
        outline:
          "border border-zinc-300 bg-transparent text-zinc-800 hover:border-zinc-500 hover:bg-zinc-50",
        ghost: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950",
        danger:
          "border border-rose-200 bg-white text-rose-700 hover:border-rose-300 hover:bg-rose-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button(props: ButtonProps) {
  const { className, size, type = "button", variant, ...rest } = props;

  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      data-slot="button"
      type={type}
      {...rest}
    />
  );
}
