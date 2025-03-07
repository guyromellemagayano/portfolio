import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const AsideClient = lazy(async () => {
  const module = await import("./Aside.client");
  return { default: module.AsideClient };
});

export type AsideRef = React.ElementRef<"aside">;
export type AsideProps = React.ComponentPropsWithoutRef<"aside"> &
  CommonComponentProps;

/**
 * Render the default aside server component.
 * @param {AsideProps} props - The default aside server component properties
 * @returns The rendered default aside server component
 */
export const Aside = ({ isClient = false, children, ...rest }: AsideProps) => {
  const element = <aside {...rest}>{children}</aside>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <AsideClient {...rest}>{children} </AsideClient>
      </Suspense>
    );
  }

  return element;
};

Aside.displayName = "Aside";
