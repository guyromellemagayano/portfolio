import { type DialogHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const DialogClient = lazy(async () => {
  const module = await import("./Dialog.client");
  return { default: module.DialogClient };
});

export type DialogRef = HTMLDialogElement;
export type DialogProps = DialogHTMLAttributes<DialogRef> &
  CommonComponentProps;

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
