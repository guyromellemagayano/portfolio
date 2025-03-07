import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const HrClient = lazy(async () => {
  const module = await import("./Hr.client");
  return { default: module.HrClient };
});

export type HrRef = React.ElementRef<"hr">;
export type HrProps = React.ComponentPropsWithoutRef<"hr"> &
  CommonComponentProps;

/**
 * Render the default thematic break (horizontal rule) server component.
 * @param {HrProps} props - The default thematic break (horizontal rule) server component properties
 * @returns The rendered default thematic break (horizontal rule) server component
 */
export const Hr = ({ isClient = false, ...rest }: HrProps) => {
  const element = <hr {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <HrClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Hr.displayName = "Hr";
