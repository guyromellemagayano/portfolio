import React from "react";

import Image from "next/image";
import Link from "next/link";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  hasMeaningfulText,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import { AVATAR_COMPONENT_LABELS } from "../../_data";
import styles from "./HeaderAvatar.module.css";

interface HeaderAvatarProps
  extends Omit<React.ComponentProps<typeof Link>, "href">,
    ComponentProps {
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
const HeaderAvatar: HeaderAvatarComponent = setDisplayName(
  function HeaderAvatar(props) {
    const {
      className,
      large = false,
      href = AVATAR_COMPONENT_LABELS.link,
      alt = AVATAR_COMPONENT_LABELS.alt,
      src = AVATAR_COMPONENT_LABELS.src,
      internalId,
      debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!hasMeaningfulText(src)) return null;

    const imageSizes = large ? "4rem" : "2.25rem";
    const imageClassName = cn(
      styles.avatarImage,
      large ? styles.avatarImageLarge : styles.avatarImageDefault
    );

    const element = (
      <Link
        {...rest}
        href={href}
        aria-label={AVATAR_COMPONENT_LABELS.home}
        className={cn(styles.avatarLink, className)}
        data-header-avatar-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
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

export { HeaderAvatar };
