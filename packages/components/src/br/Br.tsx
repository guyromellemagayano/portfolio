import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const BrClient = lazy(async () => {
  const module = await import("./Br.client");
  return { default: module.BrClient };
});

export type BrRef = HTMLBRElement;
export type BrProps = HTMLAttributes<BrRef> & CommonComponentProps;

/**
 * Render the default line break server component.
 * @param {BrProps} props - The default line break server component properties
 * @returns The rendered default line break server component
 */
export const Br = ({ isClient = false, ...rest }: BrProps) => {
  const element = <br {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BrClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Br.displayName = "Br";
