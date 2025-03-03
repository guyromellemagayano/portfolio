import { type OptionHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const OptionClient = lazy(async () => {
  const module = await import("./Option.client");
  return { default: module.OptionClient };
});

export type OptionRef = HTMLOptionElement;
export type OptionProps = OptionHTMLAttributes<OptionRef> &
  CommonComponentProps;

/**
 * Render the default HTML option server component.
 * @param {OptionProps} props - The default HTML option server component properties
 * @returns The rendered default HTML option server component
 */
export const Option = ({
  isClient = false,
  children,
  ...rest
}: OptionProps) => {
  const element = <option {...rest}>{children}</option>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <OptionClient {...rest}>{children}</OptionClient>
      </Suspense>
    );
  }

  return element;
};

Option.displayName = "Option";
