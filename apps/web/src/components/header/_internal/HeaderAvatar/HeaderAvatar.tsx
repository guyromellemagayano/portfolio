import React from "react";

import Image from "next/image";
import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { getLinkTargetProps, setDisplayName } from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import { AVATAR_COMPONENT_LABELS } from "../../_data";
import styles from "./HeaderAvatar.module.css";

// ============================================================================
// BASE HEADER AVATAR COMPONENT
// ============================================================================

interface HeaderAvatarProps
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
type HeaderAvatarComponent = React.FC<HeaderAvatarProps>;

/** Renders a linked avatar image for the header. */
const BaseHeaderAvatar: HeaderAvatarComponent = setDisplayName(
  function BaseHeaderAvatar(props) {
    const {
      className,
      large = false,
      href = AVATAR_COMPONENT_LABELS.link,
      alt = AVATAR_COMPONENT_LABELS.alt,
      src = AVATAR_COMPONENT_LABELS.src,
      target = "_self",
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const imageSizes = large ? "4rem" : "2.25rem";
    const imageClassName = cn(
      styles.avatarImage,
      large ? styles.avatarImageLarge : styles.avatarImageDefault
    );

    const linkTargetProps = getLinkTargetProps(href, target);

    const element = (
      <Link
        {...rest}
        href={href}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        className={cn(styles.avatarLink, className)}
        aria-label={AVATAR_COMPONENT_LABELS.home}
        data-header-avatar-id={`${_internalId}-header-avatar`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid="header-avatar-root"
      >
        <Image
          src={src}
          alt={alt}
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
const HeaderAvatar: HeaderAvatarComponent = setDisplayName(
  function HeaderAvatar(props) {
    const { isMemoized = false, _internalId, _debugMode, ...rest } = props;

    const updatedProps = {
      ...rest,
      _internalId,
      _debugMode,
    };

    const Component = isMemoized ? MemoizedHeaderAvatar : BaseHeaderAvatar;
    const element = <Component {...updatedProps} />;
    return element;
  }
);

export { HeaderAvatar };
