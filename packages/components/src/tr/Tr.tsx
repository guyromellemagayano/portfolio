import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const TrClient = lazy(async () => {
  const module = await import("./Tr.client");
  return { default: module.TrClient };
});

export type TrRef = HTMLTableRowElement;
export type TrProps = HTMLAttributes<TrRef> & CommonComponentProps;

/**
 * Render the default table row server component.
 * @param {TrProps} props - The default table row server component properties
 * @returns The rendered default table row server component
 */
export const Tr = ({ isClient = false, children, ...rest }: TrProps) => {
  const element = <tr {...rest}>{children}</tr>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TrClient {...rest}>{children}</TrClient>
      </Suspense>
    );
  }

  return element;
};

Tr.displayName = "Tr";
