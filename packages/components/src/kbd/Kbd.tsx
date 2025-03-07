import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const KbdClient = lazy(async () => {
  const module = await import("./Kbd.client");
  return { default: module.KbdClient };
});

export type KbdRef = React.ElementRef<"kbd">;
export type KbdProps = React.ComponentPropsWithoutRef<"kbd"> &
  CommonComponentProps;

/**
 * Render the default keyboard input server component.
 * @param {KbdProps} props - The default keyboard input server component properties
 * @returns The rendered default keyboard input server component
 */
export const Kbd = ({ isClient = false, children, ...rest }: KbdProps) => {
  const element = <kbd {...rest}>{children}</kbd>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <KbdClient {...rest}>{children}</KbdClient>
      </Suspense>
    );
  }

  return element;
};

Kbd.displayName = "Kbd";
