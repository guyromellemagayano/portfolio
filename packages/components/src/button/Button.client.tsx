"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type ButtonRef = HTMLButtonElement;
export type ButtonProps = ButtonHTMLAttributes<ButtonRef> &
  CommonComponentProps;

/**
 * Render the button client component.
 * @param {ButtonProps} props - The button client component properties
 * @param {ButtonRef} ref - The button client component reference
 * @returns The rendered button client component
 */
const ButtonClient = forwardRef<ButtonRef, ButtonProps>(
  ({ children, ...rest }, ref) => {
    return (
      <button ref={ref} {...rest}>
        {children}
      </button>
    );
  }
);

ButtonClient.displayName = "ButtonClient";

export default ButtonClient;
