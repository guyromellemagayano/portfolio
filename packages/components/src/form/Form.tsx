import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const FormClient = lazy(async () => {
  const module = await import("./Form.client");
  return { default: module.FormClient };
});

export type FormRef = React.ElementRef<"form">;
export type FormProps = React.ComponentPropsWithoutRef<"form"> &
  CommonComponentProps;

/**
 * Render the default form server component.
 * @param {FormProps} props - The default form server component properties
 * @returns The rendered default form server component
 */
export const Form = ({ isClient = false, children, ...rest }: FormProps) => {
  const element = <form {...rest}>{children}</form>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <FormClient {...rest}>{children}</FormClient>
      </Suspense>
    );
  }

  return element;
};

Form.displayName = "Form";
