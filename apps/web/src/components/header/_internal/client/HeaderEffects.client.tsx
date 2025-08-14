"use client";

import { useEffect } from "react";

import type { HeaderEffectsProps } from "@web/components/header";
import { clamp } from "@web/lib/helpers";

/** Runs the sticky/shrink effects and CSS var updates (rAF throttled). */
export const HeaderEffects = function (props: HeaderEffectsProps) {
  const { headerEl, avatarEl, isHomePage } = props;

  useEffect(() => {
    const setProperty = (prop: string, value: string) =>
      document.documentElement.style.setProperty(prop, value);
    const removeProperty = (prop: string) =>
      document.documentElement.style.removeProperty(prop);

    let isInitial = true;
    let downDelay = avatarEl.current?.offsetTop ?? 0;
    const upDelay = 64;

    function updateHeaderStyles() {
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

    function updateAvatarStyles() {
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

    function updateStyles() {
      // Recompute downDelay in case layout shifted after hydration
      downDelay = avatarEl.current?.offsetTop ?? 0;
      updateHeaderStyles();
      updateAvatarStyles();
      isInitial = false;
    }

    // rAF throttle
    let raf = 0;
    const onScrollResize = () => {
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
  }, [headerEl, avatarEl, isHomePage]);

  return null;
};

HeaderEffects.displayName = "HeaderEffects";
