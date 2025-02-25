import { lazy, Suspense } from "react";

import type { DialogProps } from "./Dialog.client";

// Dynamically import the client component
const DialogClient = lazy(async () => {
  const module = await import("./Dialog.client");
  return { default: module.DialogClient };
});

/**
 * Render the default dialog server component.
 * @param {DialogProps} props - The default dialog server component properties
 * @returns The rendered default dialog server component
 */
export const Dialog = ({
  isClient = false,
  children,
  ...rest
}: DialogProps) => {
  const element = <dialog {...rest}>{children}</dialog>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <DialogClient {...rest}>{children}</DialogClient>
      </Suspense>
    );
  }

  return element;
};

Dialog.displayName = "Dialog";
