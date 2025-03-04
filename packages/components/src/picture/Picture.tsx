import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const PictureClient = lazy(async () => {
  const module = await import("./Picture.client");
  return { default: module.PictureClient };
});

export type PictureRef = HTMLElement;
export type PictureProps = HTMLAttributes<PictureRef> & CommonComponentProps;

/**
 * Render the default picture server component.
 * @param {PictureProps} props - The default picture server component properties
 * @returns The rendered default picture server component
 */
export const Picture = ({
  isClient = false,
  children,
  ...rest
}: PictureProps) => {
  const element = <picture {...rest}>{children}</picture>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <PictureClient {...rest}>{children}</PictureClient>
      </Suspense>
    );
  }

  return element;
};

Picture.displayName = "Picture";
