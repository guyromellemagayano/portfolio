import React from "react";

import Image from "next/image";
import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  hasValidContent,
  isValidImageSrc,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { AVATAR_COMPONENT_LABELS } from "../_data";
import styles from "./styles/HeaderAvatar.module.css";

// ============================================================================
// HEADER AVATAR COMPONENT TYPES & INTERFACES
// ============================================================================

export interface HeaderAvatarProps
  extends Omit<React.ComponentProps<typeof Link>, "href">,
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

/** Renders a linked avatar image for the header. */
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
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const imageSizes = large ? "4rem" : "2.25rem";
    const imageClassName = cn(
      styles.avatarImage,
      large ? styles.avatarImageLarge : styles.avatarImageDefault
    );

    const linkHref =
      href && isValidLink(href) ? href : AVATAR_COMPONENT_LABELS.link;
    const linkTitle =
      title && hasValidContent(title) ? title : AVATAR_COMPONENT_LABELS.home;
    const imageSrc =
      src && isValidImageSrc(src) ? src : AVATAR_COMPONENT_LABELS.src;
    const imageAlt =
      alt && hasValidContent(alt) ? alt : AVATAR_COMPONENT_LABELS.alt;
    const linkTargetProps = getLinkTargetProps(linkHref, target);

    const element = (
      <Link
        {...rest}
        href={linkHref}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        className={cn(styles.avatarLink, className)}
        aria-label={linkTitle}
        {...createComponentProps(_internalId, "header-avatar", _debugMode)}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          sizes={imageSizes}
          className={imageClassName}
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

/** A memoized header avatar component. */
const MemoizedHeaderAvatar = React.memo(BaseHeaderAvatar);

// ============================================================================
// MAIN HEADER AVATAR COMPONENT
// ============================================================================

/** Renders the avatar link for the `Header` compound component. */
export const HeaderAvatar: HeaderAvatarComponent = setDisplayName(
  function HeaderAvatar(props) {
    const {
      isMemoized = false,
      _internalId,
      _debugMode,
      href = AVATAR_COMPONENT_LABELS.link,
      src = AVATAR_COMPONENT_LABELS.src,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    if (!isValidImageSrc(src) && !isValidLink(href)) return null;

    const updatedProps = {
      ...rest,
      href,
      src,
      _internalId: id,
      _debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedHeaderAvatar : BaseHeaderAvatar;
    const element = <Component {...updatedProps} />;
    return element;
  }
);
