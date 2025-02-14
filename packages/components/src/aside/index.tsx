import { type HTMLAttributes, lazy, Suspense } from "react";

// Dynamically import the client component
const AsideClient = lazy(() =>
  import("./index.client").then((m) => ({ default: m.default }))
);

export type AsideRef = HTMLElement;
export type AsideProps = HTMLAttributes<AsideRef> & {
  isClient?: boolean;
};

/**
 * Render the default aside server component.
 * @param {AsideProps} props - The default aside server component properties
 * @returns The rendered default aside server component
 */
export const Aside = ({ isClient = false, children, ...rest }: AsideProps) => {
  if (isClient) {
    return (
      <Suspense>
        <AsideClient {...rest}>{children} </AsideClient>
      </Suspense>
    );
  }

  return <aside {...rest}>{children}</aside>;
};

Aside.displayName = "Aside";
