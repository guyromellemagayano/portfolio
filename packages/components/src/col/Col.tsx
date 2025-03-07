import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const ColClient = lazy(async () => {
  const module = await import("./Col.client");
  return { default: module.ColClient };
});

export type ColRef = React.ElementRef<"col">;
export type ColProps = React.ComponentPropsWithoutRef<"col"> &
  CommonComponentProps;

/**
 * Render the default column server component.
 * @param {ColProps} props - The default column server component properties
 * @returns The rendered default column server component
 */
export const Col = ({ isClient = false, ...rest }: ColProps) => {
  const element = <col {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ColClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Col.displayName = "Col";
