"use client";

import React, { memo } from "react";

import { Ruby, type RubyProps, type RubyRef } from ".";

/** Render the ruby annotation client component. */
export const RubyClient = React.forwardRef<RubyRef, RubyProps>((props, ref) => (
  <Ruby ref={ref} {...props} />
));

RubyClient.displayName = "RubyClient";

/** Memoized version of `RubyClient` for performance optimization. */
export const MemoizedRubyClient = memo(RubyClient);
