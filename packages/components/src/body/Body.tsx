import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const BodyClient = lazy(async () => {
  const module = await import("./Body.client");
  return { default: module.BodyClient };
});

export type BodyRef = React.ElementRef<"body">;
export type BodyProps = React.ComponentPropsWithoutRef<"body"> &
  CommonComponentProps;

/**
 * Render the default document body server component.
 * @param {BodyProps} props - The default document body server component properties
 * @returns The rendered default document body server component
 */
export const Body = ({ isClient = false, children, ...rest }: BodyProps) => {
  const element = <body {...rest}>{children}</body>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BodyClient {...rest}>{children}</BodyClient>
      </Suspense>
    );
  }

  return element;
};

Body.displayName = "Body";
