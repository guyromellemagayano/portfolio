import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const SlotClient = lazy(async () => {
  const module = await import("./Slot.client");
  return { default: module.SlotClient };
});

export type SlotRef = React.ElementRef<"slot">;
export type SlotProps = React.ComponentPropsWithoutRef<"slot"> &
  CommonComponentProps;

/**
 * Render the default web component slot server component.
 * @param {SlotProps} props - The default web component slot server component properties
 * @returns The rendered default web component slot server component
 */
export const Slot = ({ isClient = false, children, ...rest }: SlotProps) => {
  const element = <slot {...rest}>{children}</slot>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SlotClient {...rest}>{children}</SlotClient>
      </Suspense>
    );
  }

  return element;
};

Slot.displayName = "Slot";
