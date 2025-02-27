import { type InputHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const InputClient = lazy(async () => {
  const module = await import("./Input.client");
  return { default: module.InputClient };
});

export type InputRef = HTMLInputElement;
export type InputProps = InputHTMLAttributes<InputRef> & CommonComponentProps;

/**
 * Render the default HTML input server component.
 * @param {InputProps} props - The default HTML input server component properties
 * @returns The rendered default HTML input server component
 */
export const Input = ({
  isClient = false,
  type = "text",
  ...rest
}: InputProps) => {
  const element = <input type={type} {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <InputClient type={type} {...rest} />
      </Suspense>
    );
  }

  return element;
};

Input.displayName = "Input";
