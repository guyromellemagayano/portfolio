import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const AbbreviationClient = lazy(async () => {
  const module = await import("./Abbreviation.client");
  return { default: module.default };
});

export type AbbreviationRef = HTMLElement;
export type AbbreviationProps = HTMLAttributes<AbbreviationRef> &
  CommonComponentProps;

/**
 * Render the default abbreviation server component.
 * @param {AbbreviationProps} props - The default abbreviation server component properties
 * @returns The rendered default abbreviation server component
 */
const Abbreviation = ({
  isClient = false,
  children,
  ...rest
}: AbbreviationProps) => {
  const element = <abbr {...rest}>{children}</abbr>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <AbbreviationClient {...rest}>{children}</AbbreviationClient>
      </Suspense>
    );
  }

  return element;
};

Abbreviation.displayName = "Abbreviation";

export default Abbreviation;
