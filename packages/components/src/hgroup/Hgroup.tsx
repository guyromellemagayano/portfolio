import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const HgroupClient = lazy(async () => {
  const module = await import("./Hgroup.client");
  return { default: module.HgroupClient };
});

export type HgroupRef = React.ElementRef<"hgroup">;
export type HgroupProps = React.ComponentPropsWithoutRef<"hgroup"> &
  CommonComponentProps;

/**
 * Render the default heading group component.
 * @param {HgroupProps} props - The default heading group component properties
 * @returns The rendered default heading group component
 */
export const Hgroup = ({
  isClient = false,
  children,
  ...rest
}: HgroupProps) => {
  const element = <hgroup {...rest}>{children}</hgroup>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <HgroupClient {...rest}>{children}</HgroupClient>
      </Suspense>
    );
  }

  return element;
};

Hgroup.displayName = "Hgroup";
