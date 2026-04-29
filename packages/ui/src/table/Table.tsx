import React from "react";

import {
  Caption,
  type CaptionProps as CaptionPrimitiveProps,
  type CaptionRef,
  Div,
  Table as TablePrimitive,
  type TableProps as TablePrimitiveProps,
  type TableRef as TablePrimitiveRef,
  Tbody,
  type TbodyProps,
  type TbodyRef,
  Td,
  type TdProps,
  type TdRef,
  Tfoot,
  type TfootProps,
  type TfootRef,
  Th,
  Thead,
  type TheadProps,
  type TheadRef,
  type ThProps,
  type ThRef,
  Tr,
  type TrProps,
  type TrRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type TableProps = TablePrimitiveProps;

export const Table = React.forwardRef<TablePrimitiveRef, TableProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Div
        className="relative w-full overflow-auto"
        data-slot="table-container"
      >
        <TablePrimitive
          ref={ref}
          {...rest}
          className={cn("w-full caption-bottom text-sm", className)}
          data-slot={getDataSlot(props, "table")}
        />
      </Div>
    );
  }
);

Table.displayName = "Table";

export type TableHeaderProps = TheadProps;

export const TableHeader = React.forwardRef<TheadRef, TableHeaderProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Thead
        ref={ref}
        {...rest}
        className={cn("[&_tr]:border-b", className)}
        data-slot={getDataSlot(props, "table-header")}
      />
    );
  }
);

TableHeader.displayName = "TableHeader";

export type TableBodyProps = TbodyProps;

export const TableBody = React.forwardRef<TbodyRef, TableBodyProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Tbody
        ref={ref}
        {...rest}
        className={cn("[&_tr:last-child]:border-0", className)}
        data-slot={getDataSlot(props, "table-body")}
      />
    );
  }
);

TableBody.displayName = "TableBody";

export type TableFooterProps = TfootProps;

export const TableFooter = React.forwardRef<TfootRef, TableFooterProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Tfoot
        ref={ref}
        {...rest}
        className={cn("bg-muted/50 border-t font-medium", className)}
        data-slot={getDataSlot(props, "table-footer")}
      />
    );
  }
);

TableFooter.displayName = "TableFooter";

export type TableRowProps = TrProps;

export const TableRow = React.forwardRef<TrRef, TableRowProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <Tr
      ref={ref}
      {...rest}
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      data-slot={getDataSlot(props, "table-row")}
    />
  );
});

TableRow.displayName = "TableRow";

export type TableHeadProps = ThProps;

export const TableHead = React.forwardRef<ThRef, TableHeadProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Th
        ref={ref}
        {...rest}
        className={cn(
          "text-muted-foreground h-12 px-4 text-left align-middle font-medium",
          className
        )}
        data-slot={getDataSlot(props, "table-head")}
      />
    );
  }
);

TableHead.displayName = "TableHead";

export type TableCellProps = TdProps;

export const TableCell = React.forwardRef<TdRef, TableCellProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Td
        ref={ref}
        {...rest}
        className={cn("p-4 align-middle", className)}
        data-slot={getDataSlot(props, "table-cell")}
      />
    );
  }
);

TableCell.displayName = "TableCell";

export type TableCaptionProps = CaptionPrimitiveProps;

export const TableCaption = React.forwardRef<CaptionRef, TableCaptionProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Caption
        ref={ref}
        {...rest}
        className={cn("text-muted-foreground mt-4 text-sm", className)}
        data-slot={getDataSlot(props, "table-caption")}
      />
    );
  }
);

TableCaption.displayName = "TableCaption";
