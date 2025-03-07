import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const ImgClient = lazy(async () => {
  const module = await import("./Img.client");
  return { default: module.ImgClient };
});

export type ImgRef = React.ElementRef<"img">;
export type ImgProps = React.ComponentPropsWithoutRef<"img"> &
  CommonComponentProps;

/**
 * Render the default image embed server component.
 * @param {ImgProps} props - The default image embed server component properties
 * @returns The rendered default image embed server component
 */
export const Img = ({
  isClient = false,
  src = "#",
  alt = "",
  ...rest
}: ImgProps) => {
  const element = <img src={src} alt={alt} {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ImgClient src={src} alt={alt} {...rest} />
      </Suspense>
    );
  }

  return element;
};

Img.displayName = "Img";
