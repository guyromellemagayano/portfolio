import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const SectionClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SectionClient };
});
const MemoizedSectionClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedSectionClient };
});

export type SectionRef = React.ComponentRef<"section">;

export interface SectionProps
  extends React.ComponentPropsWithoutRef<"section">, CommonComponentProps {}

/** Render the generic section server component. */
export const Section = React.forwardRef<SectionRef, SectionProps>(
  (props, ref) => {
    const {
      as: Component = "section",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedSectionClient
        : SectionClient;

      return (
        <Suspense fallback={element}>
          <ClientComponent {...rest} ref={ref}>
            {children}
          </ClientComponent>
        </Suspense>
      );
    }

    return element;
  }
);

Section.displayName = "Section";
