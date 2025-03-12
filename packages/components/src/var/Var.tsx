import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const VarClient = lazy(async () => {
  const module = await import("./Var.client");
  return { default: module.VarClient };
});

export type VarRef = React.ElementRef<"var">;
export type VarProps = React.ComponentPropsWithoutRef<"var"> &
  CommonComponentProps;

/**
 * Render the default variable server component.
 * @param {VarProps} props - The default variable server component properties
 * @returns The rendered default variable server component
 */
export const Var = ({ isClient = false, children, ...rest }: VarProps) => {
  const element = <var {...rest}>{children}</var>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <VarClient {...rest}>{children}</VarClient>
      </Suspense>
    );
  }

  return element;
};

Var.displayName = "Var";
