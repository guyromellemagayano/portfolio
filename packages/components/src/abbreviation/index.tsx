import { lazy, Suspense, type HTMLAttributes } from "react";

// Dynamically import the client component
const AbbreviationClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.default };
});

export type AbbreviationRef = HTMLElement;
export type AbbreviationProps = HTMLAttributes<AbbreviationRef> & {
  isClient?: boolean;
};

/**
 * Render the default abbreviation server component.
 * @param {AbbreviationProps} props - The default abbreviation server component properties
 * @returns The rendered default abbreviation server component
 */
export const Abbreviation = ({
  isClient = false,
  children,
  ...rest
}: AbbreviationProps) => {
  if (isClient) {
    return (
      <Suspense>
        <AbbreviationClient {...rest}>{children} </AbbreviationClient>
      </Suspense>
    );
  }

  return <abbr {...rest}>{children}</abbr>;
};

Abbreviation.displayName = "Abbreviation";
