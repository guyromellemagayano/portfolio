import { type TableHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const TableClient = lazy(async () => {
  const module = await import("./Table.client");
  return { default: module.TableClient };
});

export type TableRef = HTMLTableElement;
export type TableProps = TableHTMLAttributes<TableRef> & CommonComponentProps;

/**
 * Render the default table server component.
 * @param {TableProps} props - The default table server component properties
 * @returns The rendered default table server component
 */
export const Table = ({ isClient = false, children, ...rest }: TableProps) => {
  const element = <table {...rest}>{children}</table>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TableClient {...rest}>{children}</TableClient>
      </Suspense>
    );
  }

  return element;
};

Table.displayName = "Table";
