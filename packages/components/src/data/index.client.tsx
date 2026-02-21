"use client";

import React, { memo } from "react";

import { Data, type DataProps, type DataRef } from ".";

/** Render the data client component. */
export const DataClient = React.forwardRef<DataRef, DataProps>((props, ref) => (
  <Data ref={ref} {...props} />
));

DataClient.displayName = "DataClient";

/** Memoized version of `DataClient` for performance optimization. */
export const MemoizedDataClient = memo(DataClient);
