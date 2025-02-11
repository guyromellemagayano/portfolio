'use client';

import { forwardRef } from 'react';

import type { TAddressProps, TAddressRef } from './Address.types';

/**
 * Render the address client component.
 * @param {TAddressProps} props - The address client component properties
 * @param {TAddressRef} ref - The address client component reference
 * @returns The rendered address client component
 */
const AddressClient = forwardRef<TAddressRef, TAddressProps>(
  ({ children, ...rest }, ref) => {
    return (
      <address ref={ref} {...rest}>
        {children}
      </address>
    );
  },
);

AddressClient.displayName = 'AddressClient';

export default AddressClient;
