'use client';

import { type ButtonHTMLAttributes, forwardRef } from 'react';

export type TButtonRef = HTMLButtonElement;
export type TButtonProps = ButtonHTMLAttributes<TButtonRef>;

/**
 * Render the button component
 * @param {TButtonProps} props - The button component properties
 * @param {TButtonRef} ref - The button component reference
 * @returns The rendered button component
 */
const Button = forwardRef<TButtonRef, TButtonProps>(
  ({ type = 'button', children, ...rest }, ref) => {
    return (
      <button ref={ref} type={type} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
