"use client";

import React, { memo } from "react";

import { Datalist, type DatalistProps, type DatalistRef } from ".";

/** Render the datalist client component. */
export const DatalistClient = React.forwardRef<DatalistRef, DatalistProps>(
  (props, ref) => <Datalist ref={ref} {...props} />
);

DatalistClient.displayName = "DatalistClient";

/** Memoized version of `DatalistClient` for performance optimization. */
export const MemoizedDatalistClient = memo(DatalistClient);
