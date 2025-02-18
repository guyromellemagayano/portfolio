import { type HTMLAttributes, lazy, Suspense } from "react";

// Dynamically import the client component
const AddressClient = lazy(async () => {
  const module = await import("./Address.client");
  return { default: module.default };
});

export type AddressRef = HTMLElement;
export type AddressProps = HTMLAttributes<AddressRef> & {
  isClient?: boolean;
};

/**
 * Render the default address server component.
 * @param {AddressProps} props - The default address server component properties
 * @returns The rendered default address server component
 */
const Address = ({ isClient = false, children, ...rest }: AddressProps) => {
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

export default Address;
