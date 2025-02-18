import { type AreaHTMLAttributes, lazy, Suspense } from "react";

// Dynamically import the client component
const AreaClient = lazy(async () => {
  const module = await import("./Area.client");
  return { default: module.default };
});

export type AreaRef = HTMLAreaElement;
export type AreaProps = AreaHTMLAttributes<AreaRef> & {
  isClient?: boolean;
};

/**
 * Render the default area server component.
 * @param {AreaProps} props - The default area server component properties
 * @returns The rendered default area server component
 */
const Area = ({ alt = "", isClient = false, children, ...rest }: AreaProps) => {
  const element = (
    <area alt={alt} {...rest}>
      {children}
    </area>
  );

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <AreaClient alt={alt} {...rest}>
          {children}
        </AreaClient>
      </Suspense>
    );
  }

  return element;
};

Area.displayName = "Area";

export default Area;
