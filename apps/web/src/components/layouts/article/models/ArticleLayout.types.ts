import type { SvgProps } from "@guyromellemagayano/components";

import type { ContainerProps, ContainerRef } from "@web/components";
import type { ArticleWithSlug } from "@web/lib";

/** Props for the `ArrowLeftIcon` component. */
export interface ArrowLeftIconProps extends SvgProps {}

/** Ref for the `ArticleLayout` component. */
export type ArticleLayoutRef = ContainerRef;

/** Props for the `ArticleLayout` component. */
export interface ArticleLayoutProps extends ContainerProps {
  /**
   * The article to display.
   */
  article?: ArticleWithSlug;
}