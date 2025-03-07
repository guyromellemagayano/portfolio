import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const ObjectClient = lazy(async () => {
  const module = await import("./Object.client");
  return { default: module.ObjectClient };
});

export type ObjectRef = React.ElementRef<"object">;
export type ObjectProps = React.ComponentPropsWithoutRef<"object"> &
  CommonComponentProps;

/**
 * Render the default object server component.
 * @param {ObjectProps} props - The default object server component properties
 * @returns The rendered default object server component
 */
export const Object = ({
  isClient = false,
  children,
  ...rest
}: ObjectProps) => {
  const element = <object {...rest}>{children}</object>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ObjectClient {...rest}>{children}</ObjectClient>
      </Suspense>
    );
  }

  return element;
};

Object.displayName = "Object";
