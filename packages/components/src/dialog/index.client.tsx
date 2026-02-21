"use client";

import React, { memo } from "react";

import { Dialog, type DialogProps, type DialogRef } from ".";

/** Render the dialog client component. */
export const DialogClient = React.forwardRef<DialogRef, DialogProps>(
  (props, ref) => <Dialog ref={ref} {...props} />
);

DialogClient.displayName = "DialogClient";

/** Memoized version of `DialogClient` for performance optimization. */
export const MemoizedDialogClient = memo(DialogClient);
