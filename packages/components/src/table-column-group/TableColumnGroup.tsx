import { type ColgroupHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const TableColumnGroupClient = lazy(async () => {
  const module = await import("./TableColumnGroup.client");
  return { default: module.default };
});

export type TableColumnGroupRef = HTMLTableColElement;
export type TableColumnGroupProps =
  ColgroupHTMLAttributes<TableColumnGroupRef> & CommonComponentProps;

/**
 * Render the default table column group server component.
 * @param {TableColumnGroupProps} props - The default table column group server component properties
 * @returns The rendered default table column group server component
 */
const TableColumnGroup = ({
  isClient = false,
  children,
  ...rest
}: TableColumnGroupProps) => {
  const element = <colgroup {...rest}>{children}</colgroup>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TableColumnGroupClient {...rest}>{children}</TableColumnGroupClient>
      </Suspense>
    );
  }

  return element;
};

TableColumnGroup.displayName = "TableColumnGroup";

export default TableColumnGroup;
