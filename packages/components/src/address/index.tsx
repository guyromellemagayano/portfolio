import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

export const AddressClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AddressClient };
});
export const MemoizedAddressClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAddressClient };
});

export type AddressRef = React.ComponentRef<"address">;

export interface AddressProps
  extends React.ComponentPropsWithoutRef<"address">, CommonComponentProps {}

/** Render the address server component. */
export const Address = React.forwardRef<AddressRef, AddressProps>(
  (props, ref) => {
    const {
      as: Component = "address",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedAddressClient
        : AddressClient;

      return (
        <Suspense fallback={element}>
          <ClientComponent {...rest} ref={ref}>
            {children}
          </ClientComponent>
        </Suspense>
      );
    }

    return element;
  }
);

Address.displayName = "Address";
