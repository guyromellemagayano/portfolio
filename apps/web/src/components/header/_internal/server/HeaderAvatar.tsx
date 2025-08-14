import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Div } from "@guyromellemagayano/components";

import {
  AVATAR_COMPONENT_LABELS,
  type AvatarContainerProps,
  type AvatarContainerRef,
  type AvatarProps,
  type AvatarRef,
} from "@web/components/header";
import avatarImage from "@web/images/avatar.jpg";
import { cn } from "@web/lib";

import styles from "./HeaderAvatar.module.css";

/** An avatar container component. */
export const AvatarContainer = React.forwardRef<
  AvatarContainerRef,
  AvatarContainerProps
>(function AvatarContainer(props, ref) {
  const { className, ...rest } = props;

  return (
    <Div
      ref={ref}
      className={cn(styles.avatarContainer, className)}
      {...rest}
    />
  );
});

AvatarContainer.displayName = "AvatarContainer";

/** An avatar component. */
export const Avatar = React.forwardRef<AvatarRef, AvatarProps>(
  function Avatar(props, ref) {
    const {
      className,
      large = false,
      href = AVATAR_COMPONENT_LABELS.link,
      ...rest
    } = props;

    return (
      <Link
        ref={ref}
        href={href}
        aria-label={AVATAR_COMPONENT_LABELS.home}
        className={cn(styles.avatarLink, className)}
        {...rest}
      >
        <Image
          src={avatarImage}
          alt=""
          sizes={large ? "4rem" : "2.25rem"}
          className={cn(
            styles.avatarImage,
            large ? styles.avatarImageLarge : styles.avatarImageDefault
          )}
          priority
        />
      </Link>
    );
  }
);

Avatar.displayName = "Avatar";
