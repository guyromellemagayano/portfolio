import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const WbrClient = lazy(async () => {
  const module = await import("./Wbr.client");
  return { default: module.WbrClient };
});

export type WbrRef = HTMLElement;
export type WbrProps = HTMLAttributes<WbrRef> & CommonComponentProps;

/**
 * Render the default line break opportunity server component.
 * @param {WbrProps} props - The default line break opportunity server component properties
 * @returns The rendered default line break opportunity server component
 */
export const Wbr = ({ isClient = false, ...rest }: WbrProps) => {
  const element = <wbr {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <WbrClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Wbr.displayName = "Wbr";
