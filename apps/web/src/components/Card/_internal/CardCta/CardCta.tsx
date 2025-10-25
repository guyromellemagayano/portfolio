import React from "react";

import Link from "next/link";

import { CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Icon } from "@web/components";
import { cn } from "@web/utils";

import { CardLinkCustom } from "../CardLinkCustom";

// ============================================================================
// CARD CTA COMPONENT TYPES & INTERFACES
// ============================================================================

export interface CardCtaProps
  extends React.ComponentPropsWithRef<"div">,
    CommonComponentProps {
  href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
  target?: React.ComponentPropsWithoutRef<typeof Link>["target"];
  title?: React.ComponentPropsWithoutRef<typeof Link>["title"];
}
export type CardCtaComponent = React.FC<CardCtaProps>;

// ============================================================================
// BASE CARD CTA COMPONENT
// ============================================================================

const BaseCardCta: CardCtaComponent = setDisplayName(
  function BaseCardCta(props) {
    const {
      as: Component = "div",
      children,
      className,
      href,
      target,
      title,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    if (!children) return null;

    const element = (
      <Component
        {...rest}
        className={cn(
          "relative z-10 mt-2 flex items-start text-sm font-medium text-amber-500",
          className
        )}
        {...createComponentProps(componentId, "card-cta", isDebugMode)}
      >
        {href && isValidLink(href) ? (
          <CardLinkCustom
            href={href}
            target={target}
            title={title}
            className={cn(
              "flex items-center transition hover:text-amber-600 dark:hover:text-amber-600",
              className
            )}
            debugId={componentId}
            debugMode={isDebugMode}
          >
            {children}
            <Icon.ChevronRight />
          </CardLinkCustom>
        ) : (
          children
        )}
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED CARD CTA COMPONENT
// ============================================================================

const MemoizedCardCta = React.memo(BaseCardCta);

// ============================================================================
// MAIN CARD CTA COMPONENT
// ============================================================================

export const CardCta: CardCtaComponent = setDisplayName(
  function CardCta(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedCardCta : BaseCardCta;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
