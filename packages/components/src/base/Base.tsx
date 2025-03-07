import { lazy, Suspense } from "react";

import { CommonComponentProps } from "../components";

// Dynamically import the client component
const BaseClient = lazy(async () => {
  const module = await import("./Base.client");
  return { default: module.BaseClient };
});

export type BaseRef = React.ElementRef<"base">;
export type BaseProps = React.ComponentPropsWithoutRef<"base"> &
  CommonComponentProps;

/**
 * Render the default base server component.
 * @param {BaseProps} props - The default base server component properties
 * @returns The rendered default base server component
 */
export const Base = ({ isClient = false, children, ...rest }: BaseProps) => {
  const element = <base {...rest}>{children}</base>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BaseClient {...rest}>{children} </BaseClient>
      </Suspense>
    );
  }

  return element;
};

Base.displayName = "Base";
