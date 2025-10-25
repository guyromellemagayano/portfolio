import React from "react";

import Image from "next/image";
import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isValidImageSrc,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { AVATAR_COMPONENT_LABELS } from "../../Header.data";

// ============================================================================
// HEADER AVATAR COMPONENT TYPES & INTERFACES
// ============================================================================

export interface HeaderAvatarProps
  extends Omit<React.ComponentPropsWithRef<typeof Link>, "href">,
    Omit<CommonComponentProps, "as"> {
  /** The href of the link. */
  href?: React.ComponentProps<typeof Link>["href"];
  /** The alt text. */
  alt?: React.ComponentProps<typeof Image>["alt"];
  /** The avatar image. */
  src?: React.ComponentProps<typeof Image>["src"];
  /** Whether the avatar is large. */
  large?: boolean;
}
export type HeaderAvatarComponent = React.FC<HeaderAvatarProps>;

// ============================================================================
// BASE HEADER AVATAR COMPONENT
// ============================================================================

const BaseHeaderAvatar: HeaderAvatarComponent = setDisplayName(
  function BaseHeaderAvatar(props) {
    const {
      className,
      large = false,
      href,
      alt,
      src,
      title,
      target,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const linkHref =
      href && isValidLink(href) ? href : AVATAR_COMPONENT_LABELS.link;
    const linkTitle =
      title && title.length > 0 ? title : AVATAR_COMPONENT_LABELS.home;
    const linkTargetProps = getLinkTargetProps(linkHref, target);
    const imageSrc =
      src && isValidImageSrc(src) ? src : AVATAR_COMPONENT_LABELS.src;
    const imageAlt = alt && alt.length > 0 ? alt : AVATAR_COMPONENT_LABELS.alt;

    const element = (
      <Link
        {...rest}
        href={linkHref}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        title={linkTitle}
        aria-label={linkTitle}
        className={cn("pointer-events-auto", className)}
        {...createComponentProps(
          componentId,
          "header-avatar-link",
          isDebugMode
        )}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          sizes={large ? "4rem" : "2.25rem"}
          className={cn(
            "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
            large ? "h-16 w-16" : "h-9 w-9"
          )}
          {...createComponentProps(
            componentId,
            "header-avatar-img",
            isDebugMode
          )}
          priority
        />
      </Link>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED HEADER AVATAR COMPONENT
// ============================================================================

const MemoizedHeaderAvatar = React.memo(BaseHeaderAvatar);

// ============================================================================
// MAIN HEADER AVATAR COMPONENT
// ============================================================================

export const HeaderAvatar: HeaderAvatarComponent = setDisplayName(
  function HeaderAvatar(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedHeaderAvatar : BaseHeaderAvatar;
    const element = <Component {...rest} />;
    return element;
  }
);
