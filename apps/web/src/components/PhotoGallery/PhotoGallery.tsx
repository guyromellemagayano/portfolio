import React from "react";

import Image from "next/image";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasValidContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { PHOTO_GALLERY_COMPONENT_PHOTOS } from "./_data";
import styles from "./PhotoGallery.module.css";

// ============================================================================
// PHOTO GALLERY COMPONENT TYPES & INTERFACES
// ============================================================================

interface PhotoGalleryProps
  extends React.ComponentProps<"div">,
    Omit<CommonComponentProps, "as"> {
  /** Photo gallery photos */
  photos?: typeof PHOTO_GALLERY_COMPONENT_PHOTOS;
}
type PhotoGalleryComponent = React.FC<PhotoGalleryProps>;

// ============================================================================
// BASE PHOTO GALLERY COMPONENT
// ============================================================================

/** The base photo gallery component. */
const BasePhotoGallery: PhotoGalleryComponent = setDisplayName(
  function BasePhotoGallery(props) {
    const { photos, className, _internalId, _debugMode, ...rest } = props;

    let rotations = [
      "rotate-2",
      "-rotate-2",
      "rotate-2",
      "rotate-2",
      "-rotate-2",
    ];

    const element = hasValidContent(photos) ? (
      <div
        {...rest}
        className={cn(styles.photoGallery, className)}
        {...createComponentProps(_internalId, "photo-gallery", _debugMode)}
      >
        <div
          className={styles.photoGalleryGrid}
          {...createComponentProps(
            _internalId,
            "photo-gallery-grid",
            _debugMode
          )}
        >
          {photos?.map((image, index) => (
            <div
              key={image.src}
              className={cn(
                styles.photoGalleryItem,
                rotations[index % rotations.length]
              )}
              {...createComponentProps(
                _internalId,
                `photo-gallery-item-${index}`,
                _debugMode
              )}
            >
              <Image
                src={image}
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                className={styles.photoGalleryImage}
                fill
                priority
                {...createComponentProps(
                  _internalId,
                  `photo-gallery-image-${index}`,
                  _debugMode
                )}
              />
            </div>
          ))}
        </div>
      </div>
    ) : null;

    return element;
  }
);

// ============================================================================
// MEMOIZED BASE PHOTO GALLERY COMPONENT
// ============================================================================

/** A memoized photo gallery component. */
const MemoizedPhotoGallery = React.memo(BasePhotoGallery);

// ============================================================================
// MAIN PHOTO GALLERY COMPONENT
// ============================================================================

/** A photo gallery component that displays a grid of photos with optional rotation effects. */
const PhotoGallery: PhotoGalleryComponent = setDisplayName(
  function PhotoGallery(props) {
    const {
      photos = PHOTO_GALLERY_COMPONENT_PHOTOS,
      isMemoized = false,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    if (!hasValidContent(photos)) return null;

    const updatedProps = {
      ...rest,
      photos,
      _internalId: id,
      _debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedPhotoGallery : BasePhotoGallery;
    const element = <Component {...updatedProps} />;
    return element;
  }
);

export default PhotoGallery;
