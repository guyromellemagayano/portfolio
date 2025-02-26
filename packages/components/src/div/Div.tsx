import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const DivClient = lazy(async () => {
  const module = await import("./Div.client");
  return { default: module.DivClient };
});

export type DivRef = HTMLDivElement;
export type DivProps = HTMLAttributes<DivRef> & CommonComponentProps;

/**
 * Render the default content division server component.
 * @param {DivProps} props - The default content division server component properties
 * @returns The rendered default content division server component
 */
export const Div = ({ isClient = false, children, ...rest }: DivProps) => {
  const element = <div {...rest}>{children}</div>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <DivClient {...rest}>{children}</DivClient>
      </Suspense>
    );
  }

  return element;
};

Div.displayName = "Div";
