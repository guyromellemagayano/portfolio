import React from "react";

import {
  Caption,
  type CaptionProps as CaptionPrimitiveProps,
  type CaptionRef,
  Div,
  type DivProps,
  type DivRef,
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

export type TableContainerProps = DivProps;

export const TableContainer = React.forwardRef<DivRef, TableContainerProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Div
        ref={ref}
        {...rest}
        className={cn("relative w-full overflow-auto", className)}
        data-slot={getDataSlot(props, "table-container")}
      />
    );
  }
);

TableContainer.displayName = "TableContainer";

export type TableProps = TablePrimitiveProps & {
  containerProps?: TableContainerProps;
};

export const Table = React.forwardRef<TablePrimitiveRef, TableProps>(
  (props, ref) => {
    const { className, containerProps, ...rest } = props;

    return (
      <TableContainer {...containerProps}>
        <TablePrimitive
          ref={ref}
          {...rest}
          className={cn("w-full caption-bottom text-sm", className)}
          data-slot={getDataSlot(props, "table")}
        />
      </TableContainer>
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

export type TableEmptyProps = TdProps & {
  colSpan: number;
};

export const TableEmpty = React.forwardRef<TdRef, TableEmptyProps>(
  (props, ref) => {
    const { children = "No results.", className, colSpan, ...rest } = props;

    return (
      <TableRow data-slot="table-empty-row">
        <TableCell
          ref={ref}
          colSpan={colSpan}
          {...rest}
          className={cn("text-muted-foreground h-24 text-center", className)}
          data-slot={getDataSlot(props, "table-empty")}
        >
          {children}
        </TableCell>
      </TableRow>
    );
  }
);

TableEmpty.displayName = "TableEmpty";

export type TableLoadingProps = TableEmptyProps & {
  busyLabel?: string;
};

export const TableLoading = React.forwardRef<TdRef, TableLoadingProps>(
  (props, ref) => {
    const {
      busyLabel = "Loading table rows",
      children = "Loading...",
      className,
      ...rest
    } = props;

    return (
      <TableEmpty
        ref={ref}
        aria-busy="true"
        aria-label={busyLabel}
        {...rest}
        className={cn("animate-pulse", className)}
        data-slot={getDataSlot(props, "table-loading")}
      >
        {children}
      </TableEmpty>
    );
  }
);

TableLoading.displayName = "TableLoading";
