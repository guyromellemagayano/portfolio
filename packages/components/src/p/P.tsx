import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const ParagraphClient = lazy(async () => {
  const module = await import("./P.client");
  return { default: module.ParagraphClient };
});

export type ParagraphRef = React.ElementRef<"p">;
export type ParagraphProps = React.ComponentPropsWithoutRef<"p"> &
  CommonComponentProps;

/**
 * Render the default paragraph server component.
 * @param {ParagraphProps} props - The default paragraph server component properties
 * @returns The rendered default paragraph server component
 */
export const Paragraph = ({
  isClient = false,
  children,
  ...rest
}: ParagraphProps) => {
  const element = <p {...rest}>{children}</p>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ParagraphClient {...rest}>{children}</ParagraphClient>
      </Suspense>
    );
  }

  return element;
};

Paragraph.displayName = "Paragraph";
