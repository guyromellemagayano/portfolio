import { type FieldsetHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const FieldsetClient = lazy(async () => {
  const module = await import("./Fieldset.client");
  return { default: module.FieldsetClient };
});

export type FieldsetRef = HTMLFieldSetElement;
export type FieldsetProps = FieldsetHTMLAttributes<FieldsetRef> &
  CommonComponentProps;

/**
 * Render the default field set server component.
 * @param {FieldsetProps} props - The default field set server component properties
 * @returns The rendered default field set server component
 */
export const Fieldset = ({
  isClient = false,
  children,
  ...rest
}: FieldsetProps) => {
  const element = <fieldset {...rest}>{children}</fieldset>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <FieldsetClient {...rest}>{children}</FieldsetClient>
      </Suspense>
    );
  }

  return element;
};

Fieldset.displayName = "Fieldset";
