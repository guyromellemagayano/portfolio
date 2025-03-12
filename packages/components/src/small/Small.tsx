import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const SmallClient = lazy(async () => {
  const module = await import("./Small.client");
  return { default: module.SmallClient };
});

export type SmallRef = React.ElementRef<"small">;
export type SmallProps = React.ComponentPropsWithoutRef<"small"> &
  CommonComponentProps;

/**
 * Render the default side comment server component.
 * @param {SmallProps} props - The default side comment server component properties
 * @returns The rendered default side comment server component
 */
export const Small = ({ isClient = false, children, ...rest }: SmallProps) => {
  const element = <small {...rest}>{children}</small>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SmallClient {...rest}>{children}</SmallClient>
      </Suspense>
    );
  }

  return element;
};

Small.displayName = "Small";
