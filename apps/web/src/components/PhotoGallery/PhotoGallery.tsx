import React from "react";

import Image from "next/image";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { PHOTO_GALLERY_COMPONENT_PHOTOS } from "./PhotoGallery.data";

// ============================================================================
// PHOTO GALLERY COMPONENT TYPES & INTERFACES
// ============================================================================

export interface PhotoGalleryProps
  extends React.ComponentProps<"div">,
    Omit<CommonComponentProps, "as"> {
  /** Photo gallery photos */
  photos?: typeof PHOTO_GALLERY_COMPONENT_PHOTOS;
}
export type PhotoGalleryComponent = React.FC<PhotoGalleryProps>;

// ============================================================================
// BASE PHOTO GALLERY COMPONENT
// ============================================================================

const BasePhotoGallery: PhotoGalleryComponent = setDisplayName(
  function BasePhotoGallery(props) {
    const {
      photos = PHOTO_GALLERY_COMPONENT_PHOTOS,
      className,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

    let rotations = [
      "rotate-2",
      "-rotate-2",
      "rotate-2",
      "rotate-2",
      "-rotate-2",
    ];

    if (!photos) return null;

    const element = (
      <div
        {...rest}
        className={cn("mt-16 sm:mt-20", className)}
        {...createComponentProps(componentId, "photo-gallery", isDebugMode)}
      >
        <div
          className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8"
          {...createComponentProps(
            componentId,
            "photo-gallery-grid",
            isDebugMode
          )}
        >
          {photos.map((image, index) => (
            <div
              key={image.src}
              className={cn(
                `relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800 ${rotations[index % rotations.length]}`,
                rotations[index % rotations.length]
              )}
              {...createComponentProps(
                componentId,
                `photo-gallery-item-${index}`,
                isDebugMode
              )}
            >
              <Image
                src={image}
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                className="absolute inset-0 h-full w-full object-cover"
                fill
                priority
                {...createComponentProps(
                  componentId,
                  `photo-gallery-image-${index}`,
                  isDebugMode
                )}
              />
            </div>
          ))}
        </div>
      </div>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED BASE PHOTO GALLERY COMPONENT
// ============================================================================

const MemoizedPhotoGallery = React.memo(BasePhotoGallery);

// ============================================================================
// MAIN PHOTO GALLERY COMPONENT
// ============================================================================

export const PhotoGallery: PhotoGalleryComponent = setDisplayName(
  function PhotoGallery(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedPhotoGallery : BasePhotoGallery;
    const element = <Component {...rest} />;
    return element;
  }
);
