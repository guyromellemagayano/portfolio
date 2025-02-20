"use client";

import { forwardRef } from "react";

import type {
  BringAttentionToProps,
  BringAttentionToRef,
} from "./BringAttentionTo";

/**
 * Render the bring attention to client component.
 * @param {BringAttentionToProps} props - The bring attention to client component properties
 * @param {BringAttentionToRef} ref - The bring attention to client component reference
 * @returns The rendered bring attention to client component
 */
const BringAttentionToClient = forwardRef<
  BringAttentionToRef,
  BringAttentionToProps
>(({ children, ...rest }, ref) => {
  return (
    <b ref={ref} {...rest}>
      {children}
    </b>
  );
});

BringAttentionToClient.displayName = "BringAttentionToClient";

export default BringAttentionToClient;
