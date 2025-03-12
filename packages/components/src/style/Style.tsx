import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const StyleClient = lazy(async () => {
  const module = await import("./Style.client");
  return { default: module.StyleClient };
});

export type StyleRef = React.ElementRef<"style">;
export type StyleProps = React.ComponentPropsWithoutRef<"style"> &
  CommonComponentProps;

/**
 * Render the default style information server component.
 * @param {StyleProps} props - The default style information server component properties
 * @returns The rendered default style information server component
 */
export const Style = ({ isClient = false, children, ...rest }: StyleProps) => {
  const element = <style {...rest}>{children}</style>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <StyleClient {...rest}>{children}</StyleClient>
      </Suspense>
    );
  }

  return element;
};

Style.displayName = "Style";
