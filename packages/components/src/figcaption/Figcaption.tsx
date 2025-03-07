import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const FigcaptionClient = lazy(async () => {
  const module = await import("./Figcaption.client");
  return { default: module.FigcaptionClient };
});

export type FigcaptionRef = React.ElementRef<"figcaption">;
export type FigcaptionProps = React.ComponentPropsWithoutRef<"figcaption"> &
  CommonComponentProps;

/**
 * Render the default figure caption server component.
 * @param {FigcaptionProps} props - The default figure caption server component properties
 * @returns The rendered default figure caption server component
 */
export const Figcaption = ({
  isClient = false,
  children,
  ...rest
}: FigcaptionProps) => {
  const element = <figcaption {...rest}>{children}</figcaption>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <FigcaptionClient {...rest}>{children}</FigcaptionClient>
      </Suspense>
    );
  }

  return element;
};

Figcaption.displayName = "Figcaption";
