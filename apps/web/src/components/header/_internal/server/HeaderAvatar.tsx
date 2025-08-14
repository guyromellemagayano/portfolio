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
} from "@web/components/header/models";
import avatarImage from "@web/images/avatar.jpg";
import { cn } from "@web/lib";

/** An avatar container component. */
export const AvatarContainer = React.forwardRef<
  AvatarContainerRef,
  AvatarContainerProps
>(function AvatarContainer(props, ref) {
  const { className, ...rest } = props;

  return (
    <Div
      ref={ref}
      className={cn(
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10",
        className
      )}
      {...rest}
    />
  );
});

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
        className={cn("pointer-events-auto", className)}
        {...rest}
      >
        <Image
          src={avatarImage}
          alt=""
          sizes={large ? "4rem" : "2.25rem"}
          className={cn(
            "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
            large ? "h-16 w-16" : "h-9 w-9"
          )}
          priority
        />
      </Link>
    );
  }
);
