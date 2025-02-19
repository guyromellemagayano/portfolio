import { type ColHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const ColumnClient = lazy(async () => {
  const module = await import("./Column.client");
  return { default: module.default };
});

export type ColumnRef = HTMLTableColElement;
export type ColumnProps = ColHTMLAttributes<ColumnRef> & CommonComponentProps;

/**
 * Render the default column server component.
 * @param {ColumnProps} props - The default column server component properties
 * @returns The rendered default column server component
 */
const Column = ({ isClient = false, ...rest }: ColumnProps) => {
  const element = <col {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ColumnClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Column.displayName = "Column";

export default Column;
