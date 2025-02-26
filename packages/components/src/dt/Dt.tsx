import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const DtClient = lazy(async () => {
  const module = await import("./Dt.client");
  return { default: module.DtClient };
});

export type DtRef = HTMLDListElement;
export type DtProps = HTMLAttributes<DtRef> & CommonComponentProps;

/**
 * Render the default description term server component.
 * @param {DtProps} props - The default description term server component properties
 * @returns The rendered default description term server component
 */
export const Dt = ({ isClient = false, children, ...rest }: DtProps) => {
  const element = <dt {...rest}>{children}</dt>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <DtClient {...rest}>{children}</DtClient>
      </Suspense>
    );
  }

  return element;
};

Dt.displayName = "Dt";
