/**
 * @file PhotoGallery.tsx
 * @author Guy Romelle Magayano
 * @description Photo gallery component.
 */

"use client";

// eslint-disable-next-line simple-import-sort/imports
import React from "react";

import { useTranslations } from "next-intl";
import Image, { type StaticImageData } from "next/image";

import { type CommonComponentProps } from "@guyromellemagayano/components";

import image1 from "@web/images/photos/image-1.jpg";
import image2 from "@web/images/photos/image-2.jpg";
import image3 from "@web/images/photos/image-3.jpg";
import image4 from "@web/images/photos/image-4.jpg";
import image5 from "@web/images/photos/image-5.jpg";
import { cn } from "@web/utils/helpers";

// ============================================================================
// PHOTO GALLERY DATA
// ============================================================================

const PHOTO_GALLERY_COMPONENT_PHOTOS: StaticImageData[] = [
  image1,
  image2,
  image3,
  image4,
  image5,
];

// ============================================================================
// PHOTO GALLERY COMPONENT
// ============================================================================

type PhotoGalleryElementType = "div" | "section";

export type PhotoGalleryProps<
  T extends React.ElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "as"> &
  P &
  Omit<CommonComponentProps, "as"> & {
    as?: T;
    photos?: typeof PHOTO_GALLERY_COMPONENT_PHOTOS;
    "aria-label"?: string;
  };

export function PhotoGallery<
  T extends PhotoGalleryElementType,
  P extends Record<string, unknown> = {},
>(props: PhotoGalleryProps<T, P>) {
  const {
    as: Component = "section",
    photos = PHOTO_GALLERY_COMPONENT_PHOTOS,
    className,
    "aria-label": ariaLabel,
    role,
    ...rest
  } = props;

  // Internationalization
  const tAria = useTranslations("photoGallery.ariaLabels");

  // Photo gallery ARIA labels
  const PHOTO_GALLERY_I18N = React.useMemo(
    () => ({
      photoGallery: tAria("photoGallery"),
      photoGalleryImages: tAria("photoGalleryImages"),
    }),
    [tAria]
  );

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
      {...(rest as React.ComponentPropsWithoutRef<T>)}
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
