import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const TfootClient = lazy(async () => {
  const module = await import("./Tfoot.client");
  return { default: module.TfootClient };
});

export type TfootRef = HTMLTableSectionElement;
export type TfootProps = HTMLAttributes<TfootRef> & CommonComponentProps;

/**
 * Render the default table foot server component.
 * @param {TfootProps} props - The default table foot server component properties
 * @returns The rendered default table foot server component
 */
export const Tfoot = ({ isClient = false, children, ...rest }: TfootProps) => {
  const element = <tfoot {...rest}>{children}</tfoot>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TfootClient {...rest}>{children}</TfootClient>
      </Suspense>
    );
  }

  return element;
};

Tfoot.displayName = "Tfoot";
