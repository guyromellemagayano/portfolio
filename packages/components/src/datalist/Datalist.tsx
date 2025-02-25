import { lazy, Suspense } from "react";

import type { DatalistProps } from "./Datalist.client";

// Dynamically import the client component
const DatalistClient = lazy(async () => {
  const module = await import("./Datalist.client");
  return { default: module.DatalistClient };
});

/**
 * Render the default datalist server component.
 * @param {DatalistProps} props - The default datalist server component properties
 * @returns The rendered default datalist server component
 */
export const Datalist = ({
  isClient = false,
  children,
  ...rest
}: DatalistProps) => {
  const element = <datalist {...rest}>{children}</datalist>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <DatalistClient {...rest}>{children}</DatalistClient>
      </Suspense>
    );
  }

  return element;
};

Datalist.displayName = "Datalist";
