import { type InsHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const InsClient = lazy(async () => {
  const module = await import("./Ins.client");
  return { default: module.InsClient };
});

export type InsRef = HTMLModElement;
export type InsProps = InsHTMLAttributes<InsRef> & CommonComponentProps;

/**
 * Render the default inserted text server component.
 * @param {InsProps} props - The default inserted text server component properties
 * @returns The rendered default inserted text server component
 */
export const Ins = ({ isClient = false, children, ...rest }: InsProps) => {
  const element = <ins {...rest}>{children}</ins>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <InsClient {...rest}>{children}</InsClient>
      </Suspense>
    );
  }

  return element;
};

Ins.displayName = "Ins";
