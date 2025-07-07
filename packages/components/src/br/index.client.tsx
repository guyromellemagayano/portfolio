import { forwardRef, memo } from "react";

import type { BrProps, BrRef } from "./index";

export const BrClient = forwardRef<BrRef, BrProps>((props, ref) => {
  const { as: Component = "br", children, ...rest } = props;
  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});
BrClient.displayName = "BrClient";

export const MemoizedBrClient = memo(BrClient);
MemoizedBrClient.displayName = "MemoizedBrClient";
