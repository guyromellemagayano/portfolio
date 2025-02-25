"use client";

import { DataHTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type DataRef = HTMLDataElement;
export type DataProps = DataHTMLAttributes<DataRef> & CommonComponentProps;

/**
 * Render the data client component.
 * @param {DataProps} props - The data client component properties
 * @param {DataRef} ref - The data client component reference
 * @returns The rendered data client component
 */
export const DataClient = forwardRef<DataRef, DataProps>(
  ({ children, ...rest }, ref) => {
    return (
      <data ref={ref} {...rest}>
        {children}
      </data>
    );
  }
);

DataClient.displayName = "DataClient";
