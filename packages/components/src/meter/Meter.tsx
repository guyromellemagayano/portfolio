import { type MeterHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const MeterClient = lazy(async () => {
  const module = await import("./Meter.client");
  return { default: module.MeterClient };
});

export type MeterRef = HTMLMeterElement;
export type MeterProps = MeterHTMLAttributes<MeterRef> & CommonComponentProps;

/**
 * Render the default HTML meter server component.
 * @param {MeterProps} props - The default HTML meter server component properties
 * @returns The rendered default HTML meter server component
 */
export const Meter = ({ isClient = false, children, ...rest }: MeterProps) => {
  const element = <meter {...rest}>{children}</meter>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <MeterClient {...rest}>{children}</MeterClient>
      </Suspense>
    );
  }

  return element;
};

Meter.displayName = "Meter";
