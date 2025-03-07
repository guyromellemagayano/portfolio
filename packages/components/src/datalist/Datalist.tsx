import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const DatalistClient = lazy(async () => {
  const module = await import("./Datalist.client");
  return { default: module.DatalistClient };
});

export type DatalistRef = React.ElementRef<"datalist">;
export type DatalistProps = React.ComponentPropsWithoutRef<"datalist"> &
  CommonComponentProps;

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
