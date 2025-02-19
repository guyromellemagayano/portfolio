import { type BaseHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const BaseClient = lazy(async () => {
  const module = await import("./Base.client");
  return { default: module.default };
});

export type BaseRef = HTMLBaseElement;
export type BaseProps = BaseHTMLAttributes<BaseRef> & CommonComponentProps;

/**
 * Render the default base server component.
 * @param {BaseProps} props - The default base server component properties
 * @returns The rendered default base server component
 */
const Base = ({ isClient = false, children, ...rest }: BaseProps) => {
  const element = <base {...rest}>{children}</base>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BaseClient {...rest}>{children} </BaseClient>
      </Suspense>
    );
  }

  return element;
};

Base.displayName = "Base";

export default Base;
