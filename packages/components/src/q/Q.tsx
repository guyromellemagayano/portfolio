import { type QuoteHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const QClient = lazy(async () => {
  const module = await import("./Q.client");
  return { default: module.QClient };
});

export type QRef = React.ElementRef<"q">;
export type QProps = React.ComponentPropsWithoutRef<"q"> & CommonComponentProps;

/**
 * Render the default inline quotation server component.
 * @param {QProps} props - The default inline quotation server component properties
 * @returns The rendered default inline quotation server component
 */
export const Q = ({ isClient = false, children, ...rest }: QProps) => {
  const element = <q {...rest}>{children}</q>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <QClient {...rest}>{children}</QClient>
      </Suspense>
    );
  }

  return element;
};

Q.displayName = "Q";
