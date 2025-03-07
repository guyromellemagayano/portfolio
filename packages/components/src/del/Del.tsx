import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const DelClient = lazy(async () => {
  const module = await import("./Del.client");
  return { default: module.DelClient };
});

export type DelRef = React.ElementRef<"del">;
export type DelProps = React.ComponentPropsWithoutRef<"del"> &
  CommonComponentProps;

/**
 * Render the default deleted text server component.
 * @param {DelProps} props - The default deleted text server component properties
 * @returns The rendered default deleted text server component
 */
export const Del = ({ isClient = false, children, ...rest }: DelProps) => {
  const element = <del {...rest}>{children}</del>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <DelClient {...rest}>{children}</DelClient>
      </Suspense>
    );
  }

  return element;
};

Del.displayName = "Del";
