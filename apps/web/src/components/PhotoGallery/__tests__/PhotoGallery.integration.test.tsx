// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Integration
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Presentational (polymorphic + image rendering)
// ============================================================================

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PhotoGallery } from "../PhotoGallery";

import "@testing-library/jest-dom";

// ============================================================================
// MOCKS
// ============================================================================

// Mock useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options: any = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/components", () => ({}));

// Mock utils functions
vi.mock("@guyromellemagayano/utils", () => ({
  createComponentProps: vi.fn(
    (
      id: string,
      componentType: string,
      debugMode: boolean,
      additional: any = {}
    ) => ({
      "data-testid": `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      [`data-${componentType.replace(/-/g, "-")}-id`]: `${id}-${componentType}`,
      ...additional,
    })
  ),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: vi.fn(({ src, alt, className, sizes, fill, priority, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "object" && src?.src ? src.src : src}
      alt={alt}
      className={className}
      data-sizes={sizes}
      data-fill={fill ? "true" : undefined}
      data-priority={priority ? "true" : undefined}
      {...props}
    />
  )),
}));

// Mock @web/utils
vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes: string[]) => classes.filter(Boolean).join(" ")),
}));

// Mock data - using StaticImageData format
vi.mock("../PhotoGallery.data", () => ({
  PHOTO_GALLERY_COMPONENT_PHOTOS: [
    { src: "/images/photos/image-1.jpg", width: 400, height: 300 },
    { src: "/images/photos/image-2.jpg", width: 400, height: 300 },
    { src: "/images/photos/image-3.jpg", width: 400, height: 300 },
    { src: "/images/photos/image-4.jpg", width: 400, height: 300 },
    { src: "/images/photos/image-5.jpg", width: 400, height: 300 },
  ],
}));

// ============================================================================
// TEST SETUP
// ============================================================================

const mockPhotos = [
  { src: "/test/image1.jpg", width: 400, height: 300 },
  { src: "/test/image2.jpg", width: 400, height: 300 },
  { src: "/test/image3.jpg", width: 400, height: 300 },
];

// ============================================================================
// TESTS
// ============================================================================

describe("PhotoGallery (integration)", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders a complete photo gallery with all components working together", () => {
    render(<PhotoGallery photos={mockPhotos as any} />);

    const layout = screen.getByTestId("test-id-photo-gallery");
    expect(layout).toBeInTheDocument();
    expect(layout).toHaveAttribute("class");

    const grid = screen.getByTestId("test-id-photo-gallery-grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveAttribute("class");

    const photoItems = screen.getAllByTestId(
      /test-id-photo-gallery-item-\d+/
    );
    expect(photoItems).toHaveLength(mockPhotos.length);

    const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
    expect(images).toHaveLength(mockPhotos.length);

    mockPhotos.forEach((photo, index) => {
      expect(images[index]).toHaveAttribute("src", photo.src);
      expect(images[index]).toHaveAttribute("class");
    });
  });

  it("works with different photo configurations", () => {
    const configs = [
      { photos: mockPhotos[0] ? [mockPhotos[0]] : [], expectedCount: 1 },
      { photos: mockPhotos.slice(0, 2), expectedCount: 2 },
      { photos: mockPhotos, expectedCount: 3 },
    ];

    configs.forEach(({ photos, expectedCount }) => {
      const { unmount } = render(<PhotoGallery photos={photos as any} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(expectedCount);

      unmount();
    });
  });

  it("renders end-to-end with default photos when no prop provided", () => {
    render(<PhotoGallery />);

    const layout = screen.getByTestId("test-id-photo-gallery");
    expect(layout).toBeInTheDocument();

    const grid = screen.getByTestId("test-id-photo-gallery-grid");
    expect(grid).toBeInTheDocument();

    // Default photos should render (5 photos from mock)
    const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
    expect(images.length).toBeGreaterThan(0);
  });

  it("integrates polymorphic as prop with photo rendering", () => {
    render(<PhotoGallery photos={mockPhotos as any} as="section" />);

    const layout = screen.getByTestId("test-id-photo-gallery");
    expect(layout.tagName).toBe("SECTION");

    const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
    expect(images).toHaveLength(mockPhotos.length);
  });

  it("integrates debug mode with all component elements", () => {
    render(<PhotoGallery photos={mockPhotos as any} debugMode={true} />);

    const layout = screen.getByTestId("test-id-photo-gallery");
    expect(layout).toHaveAttribute("data-debug-mode", "true");

    const grid = screen.getByTestId("test-id-photo-gallery-grid");
    expect(grid).toHaveAttribute("data-debug-mode", "true");

    const photoItems = screen.getAllByTestId(
      /test-id-photo-gallery-item-\d+/
    );
    photoItems.forEach((item) => {
      expect(item).toHaveAttribute("data-debug-mode", "true");
    });
  });

  it("integrates custom debugId with all component elements", () => {
    render(<PhotoGallery photos={mockPhotos as any} debugId="custom-id" />);

    const layout = screen.getByTestId("custom-id-photo-gallery");
    expect(layout).toBeInTheDocument();

    const grid = screen.getByTestId("custom-id-photo-gallery-grid");
    expect(grid).toBeInTheDocument();

    const photoItems = screen.getAllByTestId(
      /custom-id-photo-gallery-item-\d+/
    );
    expect(photoItems).toHaveLength(mockPhotos.length);
  });
});

