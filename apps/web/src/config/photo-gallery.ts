/**
 * @file apps/web/src/config/photo-gallery.ts
 * @author Guy Romelle Magayano
 * @description Static configuration for photo gallery content and settings.
 */

import { type StaticImageData } from "next/image";

import photoGalleryConfig from "@web/data/photo-gallery.json";
import image1 from "@web/images/photos/image-1.jpg";
import image2 from "@web/images/photos/image-2.jpg";
import image3 from "@web/images/photos/image-3.jpg";
import image4 from "@web/images/photos/image-4.jpg";
import image5 from "@web/images/photos/image-5.jpg";

// ============================================================================
// PHOTO GALLERY CONFIG TYPES
// ============================================================================

export type PhotoGalleryImageKey =
  | "image1"
  | "image2"
  | "image3"
  | "image4"
  | "image5";

type PhotoGalleryConfigData = Readonly<{
  photos: ReadonlyArray<{
    key: PhotoGalleryImageKey;
  }>;
}>;

// ============================================================================
// PHOTO GALLERY CONFIG DATA
// ============================================================================

const PHOTO_GALLERY_IMAGE_KEYS: ReadonlyArray<PhotoGalleryImageKey> = [
  "image1",
  "image2",
  "image3",
  "image4",
  "image5",
];

const PHOTO_GALLERY_IMAGE_MAP: Record<PhotoGalleryImageKey, StaticImageData> = {
  image1,
  image2,
  image3,
  image4,
  image5,
};

const isPhotoGalleryImageKey = (value: string): value is PhotoGalleryImageKey =>
  PHOTO_GALLERY_IMAGE_KEYS.includes(value as PhotoGalleryImageKey);

const createPhotoGalleryConfigData = (): PhotoGalleryConfigData => {
  const photos: ReadonlyArray<{ key: PhotoGalleryImageKey }> =
    photoGalleryConfig.photos.map((photo) => {
      if (!isPhotoGalleryImageKey(photo.key)) {
        throw new Error(`Invalid photo gallery image key: ${photo.key}`);
      }

      return { key: photo.key };
    });

  return { photos };
};

const PHOTO_GALLERY_CONFIG_DATA = createPhotoGalleryConfigData();

// ============================================================================
// PHOTO GALLERY EXPORTS
// ============================================================================

export const PHOTO_GALLERY_PHOTOS: ReadonlyArray<StaticImageData> =
  PHOTO_GALLERY_CONFIG_DATA.photos.map(
    (photo) => PHOTO_GALLERY_IMAGE_MAP[photo.key]
  );
