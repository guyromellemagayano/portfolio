import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const SubClient = lazy(async () => {
  const module = await import("./Sub.client");
  return { default: module.SubClient };
});

export type SubRef = HTMLElement;
export type SubProps = HTMLAttributes<SubRef> & CommonComponentProps;

/**
 * Render the default subscript server component.
 * @param {SubProps} props - The default subscript server component properties
 * @returns The rendered default subscript server component
 */
export const Sub = ({ isClient = false, children, ...rest }: SubProps) => {
  const element = <sub {...rest}>{children}</sub>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SubClient {...rest}>{children}</SubClient>
      </Suspense>
    );
  }

  return element;
};

Sub.displayName = "Sub";
