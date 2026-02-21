import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const TemplateClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TemplateClient };
});
const MemoizedTemplateClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedTemplateClient };
});

export type TemplateRef = React.ComponentRef<"template">;

export interface TemplateProps
  extends React.ComponentPropsWithoutRef<"template">, CommonComponentProps {}

/** Render the content template server component. */
export const Template = React.forwardRef<TemplateRef, TemplateProps>(
  (props, ref) => {
    const {
      as: Component = "template",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedTemplateClient
        : TemplateClient;

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

Template.displayName = "Template";
