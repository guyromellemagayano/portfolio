import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const AddressClient = lazy(async () => {
  const module = await import("./Address.client");
  return { default: module.AddressClient };
});

export type AddressRef = React.ElementRef<"address">;
export type AddressProps = React.ComponentPropsWithoutRef<"address"> &
  CommonComponentProps;

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
  const element = <address {...rest}>{children}</address>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <AddressClient {...rest}>{children}</AddressClient>
      </Suspense>
    );
  }

  return element;
};

Address.displayName = "Address";
