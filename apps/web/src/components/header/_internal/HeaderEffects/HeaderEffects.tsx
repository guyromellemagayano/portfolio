"use client";

import React, { useEffect } from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { setDisplayName } from "@guyromellemagayano/utils";

import { clamp } from "@web/utils";

// ============================================================================
// HEADER EFFECTS COMPONENT TYPES & INTERFACES
// ============================================================================

interface HeaderEffectsProps
  extends React.ComponentPropsWithRef<"div">,
    Omit<CommonComponentProps, "as"> {
  /** Reference to the header element. */
  headerEl: React.RefObject<React.ComponentRef<"div"> | null>;
  /** Reference to the avatar element. */
  avatarEl: React.RefObject<React.ComponentRef<"div"> | null>;
  /** Whether the current page is the home page. */
  isHomePage: boolean;
  /** Whether the initial render is complete. */
  isInitialRender: React.RefObject<boolean>;
}
type HeaderEffectsComponent = React.FC<HeaderEffectsProps>;

// ============================================================================
// BASE HEADER EFFECTS COMPONENT
// ============================================================================

/** Handles dynamic header and avatar positioning and sizing based on scroll position and page context. */
const BaseHeaderEffects: HeaderEffectsComponent = function BaseHeaderEffects(
  props
) {
  const { headerEl, avatarEl, isHomePage, isInitialRender } = props;

  useEffect(() => {
    let isInitial = isInitialRender.current;
    let downDelay = avatarEl.current?.offsetTop ?? 0;
    const upDelay = 64;

    /** Sets a property on the document element. */
    function setProperty(prop: string, value: string): void {
      document.documentElement.style.setProperty(prop, value);
    }

    /** Removes a property from the document element. */
    function removeProperty(prop: string): void {
      document.documentElement.style.removeProperty(prop);
    }

    /** Handles scroll-based header and avatar style updates for the header component. */
    function updateHeaderStyles(): void {
      const header = headerEl.current;
      if (!header) return;

      const { top, height } = header.getBoundingClientRect();

      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      );

      if (isInitial) setProperty("--header-position", "sticky");
      setProperty("--content-offset", `${downDelay}px`);

      if (isInitial || scrollY < downDelay) {
        setProperty("--header-height", `${downDelay + height}px`);
        setProperty("--header-mb", `${-downDelay}px`);
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay);
        setProperty("--header-height", `${offset}px`);
        setProperty("--header-mb", `${height - offset}px`);
      } else if (top === 0) {
        setProperty("--header-height", `${scrollY + height}px`);
        setProperty("--header-mb", `${-scrollY}px`);
      }

      /** Handles header inner position updates for the header component. */
      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty("--header-inner-position", "fixed");
        removeProperty("--header-top");
        removeProperty("--avatar-top");
      } else {
        removeProperty("--header-inner-position");
        setProperty("--header-top", "0px");
        setProperty("--avatar-top", "0px");
      }
    }

    /** Handles avatar style updates for the header component. */
    function updateAvatarStyles(): void {
      if (!isHomePage) return;

      const fromScale = 1;
      const toScale = 36 / 64;
      const fromX = 0;
      const toX = 2 / 16;

      const scrollY = downDelay - window.scrollY;

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
      scale = clamp(scale, fromScale, toScale);

      let x = (scrollY * (fromX - toX)) / downDelay + toX;
      x = clamp(x, fromX, toX);

      setProperty(
        "--avatar-image-transform",
        `translate3d(${x}rem, 0, 0) scale(${scale})`
      );

      const borderScale = 1 / (toScale / scale);
      const borderX = (-toX + x) * borderScale;
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

      setProperty("--avatar-border-transform", borderTransform);
      setProperty("--avatar-border-opacity", scale === toScale ? "1" : "0");
    }

    /** Handles style updates for the header component. */
    function updateStyles(): void {
      // Recompute `downDelay` in case layout shifted after hydration
      downDelay = (avatarEl.current as HTMLDivElement)?.offsetTop ?? 0;
      updateHeaderStyles();
      updateAvatarStyles();
      isInitial = false;
    }

    // rAF throttle
    let raf = 0;
    const onScrollResize = (): void => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        updateStyles();
        raf = 0;
      });
    };

    updateStyles();
    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
    };
  }, [headerEl, avatarEl, isHomePage, isInitialRender]);

  return null;
};

// ============================================================================
// MEMOIZED HEADER EFFECTS COMPONENT
// ============================================================================

/** A memoized header effects component. */
const MemoizedHeaderEffects = React.memo(BaseHeaderEffects);

// ============================================================================
// MAIN HEADER EFFECTS COMPONENT
// ============================================================================

/** Applies scroll and resize effects to the header for dynamic UI behavior. */
export const HeaderEffects: HeaderEffectsComponent = setDisplayName(
  function HeaderEffects(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedHeaderEffects : BaseHeaderEffects;
    const element = <Component {...rest} />;
    return element;
  }
);
