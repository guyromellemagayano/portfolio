import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const SvgClient = lazy(async () => {
  const module = await import("./Svg.client");
  return { default: module.SvgClient };
});

export type SvgRef = React.ElementRef<"svg">;
export type SvgProps = React.ComponentPropsWithoutRef<"svg"> &
  CommonComponentProps;

/**
 * Render the default scalable vector graphics server component.
 * @param {SvgProps} props - The default scalable vector graphics server component properties
 * @returns The rendered default scalable vector graphics server component
 */
export const Svg = ({ isClient = false, children, ...rest }: SvgProps) => {
  const element = <svg {...rest}>{children}</svg>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SvgClient {...rest}>{children}</SvgClient>
      </Suspense>
    );
  }

  return element;
};

Svg.displayName = "Svg";
