import { lazy, Suspense } from "react";

import type { ButtonProps } from "./Button.client";

// Dynamically import the client component
const ButtonClient = lazy(async () => {
  const module = await import("./Button.client");
  return { default: module.ButtonClient };
});

/**
 * Render the default button server component.
 * @param {ButtonProps} props - The default button server component properties
 * @returns The rendered default button server component
 */
export const Button = ({
  type = "button",
  isClient = false,
  children,
  ...rest
}: ButtonProps) => {
  const element = (
    <button type={type} {...rest} disabled>
      {children}
    </button>
  );

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ButtonClient type={type} {...rest}>
          {children}
        </ButtonClient>
      </Suspense>
    );
  }

  return element;
};

Button.displayName = "Button";
