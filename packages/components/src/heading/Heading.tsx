import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const HeadingClient = lazy(async () => {
  const module = await import("./Heading.client");
  return { default: module.HeadingClient };
});

export type HeadingRef = React.ElementRef<"h1">;
export type HeadingProps = React.ComponentPropsWithoutRef<"h1"> &
  CommonComponentProps & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

/**
 * Render the default HTML section heading server component.
 * @param {HeadingProps} props - The default HTML section heading server component properties
 * @returns The rendered default HTML section heading server component
 */
export const Heading = ({
  as: Component = "h1",
  isClient = false,
  children,
  ...rest
}: HeadingProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <HeadingClient {...rest}>{children}</HeadingClient>
      </Suspense>
    );
  }

  return element;
};

Heading.displayName = "Heading";
