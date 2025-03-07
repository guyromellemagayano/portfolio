import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const MainClient = lazy(async () => {
  const module = await import("./Main.client");
  return { default: module.MainClient };
});

export type MainRef = React.ElementRef<"main">;
export type MainProps = React.ComponentPropsWithoutRef<"main"> &
  CommonComponentProps;

/**
 * Render the default main server component.
 * @param {MainProps} props - The default main server component properties
 * @returns The rendered default main server component
 */
export const Main = ({ isClient = false, children, ...rest }: MainProps) => {
  const element = <main {...rest}>{children}</main>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <MainClient {...rest}>{children}</MainClient>
      </Suspense>
    );
  }

  return element;
};

Main.displayName = "Main";
