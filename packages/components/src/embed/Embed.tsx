import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const EmbedClient = lazy(async () => {
  const module = await import("./Embed.client");
  return { default: module.EmbedClient };
});

export type EmbedRef = React.ElementRef<"embed">;
export type EmbedProps = React.ComponentPropsWithoutRef<"embed"> &
  CommonComponentProps;

/**
 * Render the default embed external content server component.
 * @param {EmbedProps} props - The default embed external content server component properties
 * @returns The rendered default embed external content server component
 */
export const Embed = ({ isClient = false, ...rest }: EmbedProps) => {
  const element = <embed {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <EmbedClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Embed.displayName = "Embed";
