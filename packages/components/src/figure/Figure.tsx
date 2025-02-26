import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const FigureClient = lazy(async () => {
  const module = await import("./Figure.client");
  return { default: module.FigureClient };
});

export type FigureRef = HTMLElement;
export type FigureProps = HTMLAttributes<FigureRef> & CommonComponentProps;

/**
 * Render the default figure with optional caption server component.
 * @param {FigureProps} props - The default figure with optional caption server component properties
 * @returns The rendered default figure with optional caption server component
 */
export const Figure = ({
  isClient = false,
  children,
  ...rest
}: FigureProps) => {
  const element = <figure {...rest}>{children}</figure>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <FigureClient {...rest}>{children}</FigureClient>
      </Suspense>
    );
  }

  return element;
};

Figure.displayName = "Figure";
