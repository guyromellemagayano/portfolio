import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const SectionClient = lazy(async () => {
  const module = await import("./Section.client");
  return { default: module.SectionClient };
});

export type SectionRef = HTMLElement;
export type SectionProps = HTMLAttributes<SectionRef> & CommonComponentProps;

/**
 * Render the default generic section server component.
 * @param {SectionProps} props - The default generic section server component properties
 * @returns The rendered default generic section server component
 */
export const Section = ({
  isClient = false,
  children,
  ...rest
}: SectionProps) => {
  const element = <section {...rest}>{children}</section>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SectionClient {...rest}>{children}</SectionClient>
      </Suspense>
    );
  }

  return element;
};

Section.displayName = "Section";
