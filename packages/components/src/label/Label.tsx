import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const LabelClient = lazy(async () => {
  const module = await import("./Label.client");
  return { default: module.LabelClient };
});

export type LabelRef = React.ElementRef<"label">;
export type LabelProps = React.ComponentPropsWithoutRef<"label"> &
  CommonComponentProps;

/**
 * Render the default label server component.
 * @param {LabelProps} props - The default label server component properties
 * @returns The rendered default label server component
 */
export const Label = ({ isClient = false, children, ...rest }: LabelProps) => {
  const element = <label {...rest}>{children}</label>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <LabelClient {...rest}>{children}</LabelClient>
      </Suspense>
    );
  }

  return element;
};

Label.displayName = "Label";
