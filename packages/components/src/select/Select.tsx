import { type SelectHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const SelectClient = lazy(async () => {
  const module = await import("./Select.client");
  return { default: module.SelectClient };
});

export type SelectRef = HTMLSelectElement;
export type SelectProps = SelectHTMLAttributes<SelectRef> &
  CommonComponentProps;

/**
 * Render the default HTML select server component.
 * @param {SelectProps} props - The default HTML select server component properties
 * @returns The rendered default HTML select server component
 */
export const Select = ({
  isClient = false,
  children,
  ...rest
}: SelectProps) => {
  const element = <select {...rest}>{children}</select>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SelectClient {...rest}>{children}</SelectClient>
      </Suspense>
    );
  }

  return element;
};

Select.displayName = "Select";
