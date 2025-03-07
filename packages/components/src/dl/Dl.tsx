import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const DlClient = lazy(async () => {
  const module = await import("./Dl.client");
  return { default: module.DlClient };
});

export type DlRef = React.ElementRef<"dl">;
export type DlProps = React.ComponentPropsWithoutRef<"dl"> &
  CommonComponentProps;

/**
 * Render the default description list server component.
 * @param {DlProps} props - The default description list server component properties
 * @returns The rendered default description list server component
 */
export const Dl = ({ isClient = false, children, ...rest }: DlProps) => {
  const element = <dl {...rest}>{children}</dl>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <DlClient {...rest}>{children}</DlClient>
      </Suspense>
    );
  }

  return element;
};

Dl.displayName = "Dl";
