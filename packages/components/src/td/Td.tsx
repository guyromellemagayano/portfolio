import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const TdClient = lazy(async () => {
  const module = await import("./Td.client");
  return { default: module.TdClient };
});

export type TdRef = React.ElementRef<"td">;
export type TdProps = React.ComponentPropsWithoutRef<"td"> &
  CommonComponentProps;

/**
 * Render the default table data cell server component.
 * @param {TdProps} props - The default table data cell server component properties
 * @returns The rendered default table data cell server component
 */
export const Td = ({ isClient = false, children, ...rest }: TdProps) => {
  const element = <td {...rest}>{children}</td>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TdClient {...rest}>{children}</TdClient>
      </Suspense>
    );
  }

  return element;
};

Td.displayName = "Td";
