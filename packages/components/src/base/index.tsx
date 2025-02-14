import { type BaseHTMLAttributes, lazy, Suspense } from "react";

// Dynamically import the client component
const BaseClient = lazy(() =>
  import("./index.client").then((m) => ({ default: m.default }))
);

export type BaseRef = HTMLBaseElement;
export type BaseProps = BaseHTMLAttributes<BaseRef> & {
  isClient?: boolean;
};

/**
 * Render the default base server component.
 * @param {BaseProps} props - The default base server component properties
 * @returns The rendered default base server component
 */
export const Base = ({ isClient = false, children, ...rest }: BaseProps) => {
  if (isClient) {
    return (
      <Suspense>
        <BaseClient {...rest}>{children} </BaseClient>
      </Suspense>
    );
  }

  return <base {...rest}>{children}</base>;
};

Base.displayName = "Base";
