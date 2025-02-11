'use client';

import { type BaseHTMLAttributes, forwardRef } from 'react';

export type TBaseRef = HTMLBaseElement;
export type TBaseProps = BaseHTMLAttributes<TBaseRef>;

/**
 * Render the base component.
 * @param {TBaseProps} props - The base component properties
 * @param {TBaseRef} ref - The base component reference
 * @returns The rendered base component
 */
const Base = forwardRef<TBaseRef, TBaseProps>(({ ...rest }, ref) => {
  return <base ref={ref} {...rest} />;
});

Base.displayName = 'Base';

export default Base;
