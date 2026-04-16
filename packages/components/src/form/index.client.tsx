"use client";

import React, { memo } from "react";

import { Form, type FormProps, type FormRef } from ".";

/** Render the form client component. */
export const FormClient = React.forwardRef<FormRef, FormProps>((props, ref) => (
  <Form ref={ref} {...props} />
));

FormClient.displayName = "FormClient";

/** Memoized version of `FormClient` for performance optimization. */
export const MemoizedFormClient = memo(FormClient);
