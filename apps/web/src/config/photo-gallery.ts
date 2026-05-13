/**
 * @file apps/web/src/config/photo-gallery.ts
 * @author Guy Romelle Magayano
 * @description Static configuration for photo gallery content and settings.
 */

import photoGalleryConfig from "@web/data/photo-gallery.json";
import image1 from "@web/images/photos/image-1.jpg";
import image2 from "@web/images/photos/image-2.jpg";
import image3 from "@web/images/photos/image-3.jpg";
import image4 from "@web/images/photos/image-4.jpg";
import image5 from "@web/images/photos/image-5.jpg";
import {
  assertExactKeys,
  assertUniqueValues,
  expectArray,
  expectEnum,
  expectRecord,
} from "@web/lib/json-data";
import { type ImageSource } from "@web/lib/media";

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

const PHOTO_GALLERY_IMAGE_KEYS: ReadonlyArray<PhotoGalleryImageKey> = [
  "image1",
  "image2",
  "image3",
  "image4",
  "image5",
];

const PHOTO_GALLERY_IMAGE_MAP: Record<PhotoGalleryImageKey, ImageSource> = {
  image1,
  image2,
  image3,
  image4,
  image5,
};

const PHOTO_GALLERY_CONFIG_KEYS = ["photos"] as const;
const PHOTO_GALLERY_PHOTO_KEYS = ["key"] as const;

const createPhotoGalleryConfigData = (): PhotoGalleryConfigData => {
  const path = "data/photo-gallery.json";
  const record = expectRecord(photoGalleryConfig, path);

  assertExactKeys(record, PHOTO_GALLERY_CONFIG_KEYS, path);

  const photos: ReadonlyArray<{ key: PhotoGalleryImageKey }> = expectArray(
    record.photos,
    `${path}.photos`
  ).map((photo, index) => {
    const photoPath = `${path}.photos[${index}]`;
    const photoRecord = expectRecord(photo, photoPath);

    assertExactKeys(photoRecord, PHOTO_GALLERY_PHOTO_KEYS, photoPath);

    return {
      key: expectEnum(
        photoRecord.key,
        PHOTO_GALLERY_IMAGE_KEYS,
        `${photoPath}.key`
      ),
    };
  });

  assertUniqueValues(
    photos.map((photo) => photo.key),
    "photo gallery image key",
    `${path}.photos`
  );

  return { photos };
};

const PHOTO_GALLERY_CONFIG_DATA = createPhotoGalleryConfigData();

export const PHOTO_GALLERY_PHOTOS: ReadonlyArray<ImageSource> =
  PHOTO_GALLERY_CONFIG_DATA.photos.map(
    (photo) => PHOTO_GALLERY_IMAGE_MAP[photo.key]
  );
