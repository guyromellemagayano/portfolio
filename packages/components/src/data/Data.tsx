import { lazy, Suspense } from "react";
import { DataProps } from "./Data.client";

// Dynamically import the client component
const DataClient = lazy(async () => {
  const module = await import("./Data.client");
  return { default: module.DataClient };
});

/**
 * Render the default data server component.
 * @param {DataProps} props - The default data server component properties
 * @returns The rendered default data server component
 */
export const Data = ({ isClient = false, children, ...rest }: DataProps) => {
  const element = <data {...rest}>{children}</data>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <DataClient {...rest}>{children}</DataClient>
      </Suspense>
    );
  }

  return element;
};

Data.displayName = "Data";
