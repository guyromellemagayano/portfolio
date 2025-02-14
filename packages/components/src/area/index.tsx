import { type AreaHTMLAttributes, lazy, Suspense } from "react";

// Dynamically import the client component
const AreaClient = lazy(() =>
  import("./index.client").then((m) => ({ default: m.default }))
);

export type AreaRef = HTMLAreaElement;
export type AreaProps = AreaHTMLAttributes<AreaRef> & {
  isClient?: boolean;
};

/**
 * Render the default area server component.
 * @param {AreaProps} props - The default area server component properties
 * @returns The rendered default area server component
 */
export const Area = ({
  alt = "",
  isClient = false,
  children,
  ...rest
}: AreaProps) => {
  if (isClient) {
    return (
      <Suspense>
        <AreaClient alt={alt} {...rest}>
          {children}
        </AreaClient>
      </Suspense>
    );
  }

  return (
    <area alt={alt} {...rest}>
      {children}
    </area>
  );
};

Area.displayName = "Area";
