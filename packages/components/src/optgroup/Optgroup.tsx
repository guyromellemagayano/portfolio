import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const OptgroupClient = lazy(async () => {
  const module = await import("./Optgroup.client");
  return { default: module.OptgroupClient };
});

export type OptgroupRef = React.ElementRef<"optgroup">;
export type OptgroupProps = React.ComponentPropsWithoutRef<"optgroup"> &
  CommonComponentProps;

/**
 * Render the default option group server component.
 * @param {OptgroupProps} props - The default option group server component properties
 * @returns The rendered default option group server component
 */
export const Optgroup = ({
  isClient = false,
  children,
  ...rest
}: OptgroupProps) => {
  const element = <optgroup {...rest}>{children}</optgroup>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <OptgroupClient {...rest}>{children}</OptgroupClient>
      </Suspense>
    );
  }

  return element;
};

Optgroup.displayName = "Optgroup";
