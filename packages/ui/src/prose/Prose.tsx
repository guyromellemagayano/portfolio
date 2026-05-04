import React from "react";

import {
  Div,
  type DivProps,
  type DivRef,
  type PrimitiveElement,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type ProseProps = DivProps<PrimitiveElement> & {
  readable?: boolean;
};

export const Prose = React.forwardRef<DivRef, ProseProps>((props, ref) => {
  const { className, readable = true, ...rest } = props;

  return (
    <Div
      ref={ref}
      {...rest}
      className={cn(
        readable ? "max-w-3xl" : undefined,
        "text-foreground space-y-5 leading-7",
        "[&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline",
        "[&_blockquote]:text-muted-foreground [&_blockquote]:border-l [&_blockquote]:pl-4",
        "[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-normal",
        "[&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-normal",
        "[&_li]:mt-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6",
        "[&_p]:text-base [&_strong]:font-semibold",
        className
      )}
      data-slot={getDataSlot(props, "prose")}
    />
  );
});

Prose.displayName = "Prose";
