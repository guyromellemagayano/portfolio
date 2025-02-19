import { type HTMLAttributes, lazy, Suspense } from "react";

// Dynamically import the client component
const LineBreakClient = lazy(async () => {
  const module = await import("./LineBreak.client");
  return { default: module.default };
});

export type LineBreakRef = HTMLBRElement;
export type LineBreakProps = HTMLAttributes<LineBreakRef> & {
  isClient?: boolean;
};

/**
 * Render the default line break server component.
 * @param {LineBreakProps} props - The default line break server component properties
 * @returns The rendered default line break server component
 */
const LineBreak = ({ isClient = false, ...rest }: LineBreakProps) => {
  const element = <br {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <LineBreakClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

LineBreak.displayName = "LineBreak";

export default LineBreak;
