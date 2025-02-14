import { lazy, Suspense, type HTMLAttributes } from "react";

// Dynamically import the client component
const AddressClient = lazy(() =>
  import("./index.client").then((m) => ({ default: m.default }))
);

export type AddressRef = HTMLElement;
export type AddressProps = HTMLAttributes<AddressRef> & {
  isClient?: boolean;
};

/**
 * Render the default address server component.
 * @param {AddressProps} props - The default address server component properties
 * @returns The rendered default address server component
 */
export const Address = ({
  isClient = false,
  children,
  ...rest
}: AddressProps) => {
  if (isClient) {
    return (
      <Suspense>
        <AddressClient {...rest}>{children} </AddressClient>
      </Suspense>
    );
  }

  return <address {...rest}>{children}</address>;
};

Address.displayName = "Address";
