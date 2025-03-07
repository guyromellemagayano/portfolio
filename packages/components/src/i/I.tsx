import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const IClient = lazy(async () => {
  const module = await import("./I.client");
  return { default: module.IClient };
});

export type IRef = React.ElementRef<"i">;
export type IProps = React.ComponentPropsWithoutRef<"i"> & CommonComponentProps;

/**
 * Render the default idiomatic text server component.
 * @param {IProps} props - The default idiomatic text server component properties
 * @returns The rendered default idiomatic text server component
 */
export const I = ({ isClient = false, children, ...rest }: IProps) => {
  const element = <i {...rest}>{children}</i>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <IClient {...rest}>{children}</IClient>
      </Suspense>
    );
  }

  return element;
};

I.displayName = "I";
