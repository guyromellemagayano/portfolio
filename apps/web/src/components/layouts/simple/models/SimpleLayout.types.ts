import type { ContainerProps, ContainerRef } from "@web/components/container";

/** Ref for the `SimpleLayout` component. */
export type SimpleLayoutRef = ContainerRef;

/** Props for the `SimpleLayout` component. */
export interface SimpleLayoutProps extends ContainerProps {
  /** The title of the page */
  title: string;

  /** The intro of the page */
  intro: string;
}
