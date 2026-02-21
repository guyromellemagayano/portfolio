/* eslint-disable simple-import-sort/imports */

/**
 * @file apps/web/src/components/photo-gallery/PhotoGallery.tsx
 * @author Guy Romelle Magayano
 * @description Main PhotoGallery component implementation.
 */

"use client";

import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from "react";

import { useTranslations } from "next-intl";
import Image, { type StaticImageData } from "next/image";

import { PHOTO_GALLERY_PHOTOS } from "@web/config/photo-gallery";
import { cn } from "@web/utils/helpers";

// ============================================================================
// PHOTO GALLERY COMPONENT
// ============================================================================

export type PhotoGalleryElementType = "div" | "section";
export type PhotoGalleryProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<PhotoGalleryElementType>,
  "as"
> &
  P & {
    as?: PhotoGalleryElementType;
    photos?: ReadonlyArray<StaticImageData>;
    "aria-label"?: string;
  };

export function PhotoGallery<P extends Record<string, unknown> = {}>(
  props: PhotoGalleryProps<P>
) {
  const {
    as: Component = "section",
    photos = PHOTO_GALLERY_PHOTOS,
    className,
    "aria-label": ariaLabel,
    role,
    ...rest
  } = props;

  // Internationalization
  const photoGalleryI18n = useTranslations("components.photoGallery.labels");

  // Photo gallery ARIA labels
  const PHOTO_GALLERY_I18N = {
    photoGallery: photoGalleryI18n("photoGallery"),
    photoGalleryImages: photoGalleryI18n("photoGalleryImages"),
  };

  const galleryAriaLabel = ariaLabel || PHOTO_GALLERY_I18N.photoGallery;
  const imagesAriaLabel = ariaLabel
    ? `${ariaLabel} images`
    : PHOTO_GALLERY_I18N.photoGalleryImages;

  // Define the rotations for the photos
  const rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ] as const;

  if (!photos) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<PhotoGalleryElementType>)}
      className={cn("mt-16 sm:mt-20", className)}
      role={role || "region"}
      aria-label={galleryAriaLabel}
    >
      <div
        role="list"
        className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8"
        aria-label={imagesAriaLabel}
      >
        {photos.map((image, index) => (
          <div
            key={image.src}
            role="listitem"
            className={cn(
              "relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800",
              rotations[index % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden="true"
              fill
              priority
            />
          </div>
        ))}
      </div>
    </Component>
  );
}

PhotoGallery.displayName = "PhotoGallery";
