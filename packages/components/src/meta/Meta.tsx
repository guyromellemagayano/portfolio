import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const MetaClient = lazy(async () => {
  const module = await import("./Meta.client");
  return { default: module.MetaClient };
});

export type MetaRef = React.ElementRef<"meta">;
export type MetaProps = React.ComponentPropsWithoutRef<"meta"> &
  CommonComponentProps;

/**
 * Render the default metadata server component.
 * @param {MetaProps} props - The default metadata server component properties
 * @returns The rendered default metadata server component
 */
export const Meta = ({ isClient = false, ...rest }: MetaProps) => {
  const element = <meta {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <MetaClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Meta.displayName = "Meta";
