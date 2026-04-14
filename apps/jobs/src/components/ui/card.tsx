/**
 * @file apps/jobs/src/components/ui/card.tsx
 * @author Guy Romelle Magayano
 * @description Shadcn-style card primitives for page sections and job records.
 */

import type { ComponentProps } from "react";

import { cn } from "@jobs/lib/utils";

export type CardProps = ComponentProps<"div">;

/** Renders the base card container. */
export function Card(props: CardProps) {
  const { className, ...rest } = props;

  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-200/80 bg-white shadow-[0_18px_40px_-30px_rgba(15,23,42,0.3)]",
        className
      )}
      data-slot="card"
      {...rest}
    />
  );
}

/** Renders the card header section. */
export function CardHeader(props: ComponentProps<"div">) {
  const { className, ...rest } = props;

  return (
    <div
      className={cn("grid gap-2 px-6 pt-6", className)}
      data-slot="card-header"
      {...rest}
    />
  );
}

/** Renders the card title. */
export function CardTitle(props: ComponentProps<"h2">) {
  const { className, ...rest } = props;

  return (
    <h2
      className={cn(
        "text-2xl font-semibold tracking-tight text-zinc-950",
        className
      )}
      data-slot="card-title"
      {...rest}
    />
  );
}

/** Renders the card description. */
export function CardDescription(props: ComponentProps<"p">) {
  const { className, ...rest } = props;

  return (
    <p
      className={cn("text-sm leading-6 text-zinc-600", className)}
      data-slot="card-description"
      {...rest}
    />
  );
}

/** Renders the card content section. */
export function CardContent(props: ComponentProps<"div">) {
  const { className, ...rest } = props;

  return (
    <div
      className={cn("px-6 pb-6", className)}
      data-slot="card-content"
      {...rest}
    />
  );
}

/** Renders the card footer section. */
export function CardFooter(props: ComponentProps<"div">) {
  const { className, ...rest } = props;

  return (
    <div
      className={cn("flex flex-wrap items-center gap-3 px-6 pb-6", className)}
      data-slot="card-footer"
      {...rest}
    />
  );
}
