import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const UClient = lazy(async () => {
  const module = await import("./U.client");
  return { default: module.UClient };
});

export type URef = HTMLElement;
export type UProps = HTMLAttributes<URef> & CommonComponentProps;

/**
 * Render the default unarticulated annotation (underline) server component.
 * @param {UProps} props - The default unarticulated annotation (underline) server component properties
 * @returns The rendered default unarticulated annotation (underline) server component
 */
export const U = ({ isClient = false, children, ...rest }: UProps) => {
  const element = <u {...rest}>{children}</u>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <UClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

U.displayName = "U";
