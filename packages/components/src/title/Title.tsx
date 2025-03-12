import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const TitleClient = lazy(async () => {
  const module = await import("./Title.client");
  return { default: module.TitleClient };
});

export type TitleRef = React.ElementRef<"title">;
export type TitleProps = React.ComponentPropsWithoutRef<"title"> &
  CommonComponentProps;

/**
 * Render the default document title server component.
 * @param {TitleProps} props - The default document title server component properties
 * @returns The rendered default document title server component
 */
export const Title = ({ isClient = false, children, ...rest }: TitleProps) => {
  const element = <title {...rest}>{children}</title>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TitleClient {...rest}>{children}</TitleClient>
      </Suspense>
    );
  }

  return element;
};

Title.displayName = "Title";
