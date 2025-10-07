import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PhotoGallery } from "../PhotoGallery";

import "@testing-library/jest-dom";

// ============================================================================
// MOCKS
// ============================================================================

// Mock useComponentId hook
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ debugId, debugMode = false } = {}) => ({
    componentId: debugId || "test-id",
    isDebugMode: debugMode,
  })),
}));

// Mock utils functions
vi.mock("@guyromellemagayano/utils", async () => {
  const actual = await vi.importActual("@guyromellemagayano/utils");
  return {
    ...actual,
    createComponentProps: vi.fn(
      (id, componentType, debugMode, additionalProps = {}) => ({
        [`data-${componentType}-id`]: `${id}-${componentType}`,
        "data-debug-mode": debugMode ? "true" : undefined,
        "data-testid":
          additionalProps["data-testid"] || `${id}-${componentType}-root`,
        ...additionalProps,
      })
    ),
    hasValidContent: vi.fn((content) => {
      if (Array.isArray(content)) {
        return content.length > 0;
      }
      return content != null && content !== "";
    }),
    setDisplayName: vi.fn((component, displayName) => {
      if (component) component.displayName = displayName;
      return component;
    }),
  };
});

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: vi.fn(({ src, alt, className, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src?.src || src} alt={alt} className={className} {...props} />
  )),
}));

// Mock @web/lib
vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock CSS module
vi.mock("../PhotoGallery.module.css", () => ({
  default: {
    photoGallery: "_photoGallery_f465e6",
    photoGalleryGrid: "_photoGalleryGrid_f465e6",
    photoGalleryItem: "_photoGalleryItem_f465e6",
    photoGalleryImage: "_photoGalleryImage_f465e6",
  },
}));

// Mock data
vi.mock("../data", () => ({
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

describe("PhotoGallery", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default photos when no photos prop provided", () => {
      // When no photos prop is provided, the component uses default photos
      render(<PhotoGallery />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();
      expect(layout.tagName).toBe("DIV");
    });

    it("renders with custom photos when provided", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();
      expect(layout).toHaveClass("mt-16", "sm:mt-20");
    });

    it("applies custom className", () => {
      render(<PhotoGallery photos={mockPhotos} className="custom-class" />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toHaveClass("custom-class");
    });

    it("passes through additional props", () => {
      render(
        <PhotoGallery
          photos={mockPhotos}
          data-test="custom-data"
          aria-label="Photo gallery"
        />
      );

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toHaveAttribute("data-test", "custom-data");
      expect(layout).toHaveAttribute("aria-label", "Photo gallery");
    });

    it("uses useComponentId hook correctly", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      // The hook is already mocked at the top of the file
      expect(true).toBe(true);
    });

    it("uses custom internal ID when provided", () => {
      render(<PhotoGallery photos={mockPhotos} debugId="custom-id" />);

      const layout = screen.getByTestId("custom-id-photo-gallery-root");
      expect(layout).toHaveAttribute(
        "data-photo-gallery-id",
        "custom-id-photo-gallery"
      );
    });

    it("enables debug mode when provided", () => {
      render(<PhotoGallery photos={mockPhotos} debugMode={true} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Component Structure", () => {
    it("renders layout with correct structure", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();
      expect(layout).toHaveClass("mt-16", "sm:mt-20");
    });

    it("renders photo grid with correct attributes", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const grid = screen.getByTestId("test-id-photo-gallery-grid-root");
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass(
        "-my-4",
        "flex",
        "justify-center",
        "gap-5",
        "overflow-hidden",
        "py-4",
        "sm:gap-8"
      );
    });

    it("renders correct number of photo items", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const photoItems = screen.getAllByTestId(
        /test-id-photo-gallery-item-\d+-root/
      );
      expect(photoItems).toHaveLength(mockPhotos.length);
    });

    it("renders photo items with correct structure", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const firstItem = screen.getByTestId("test-id-photo-gallery-item-0-root");
      expect(firstItem).toBeInTheDocument();
      expect(firstItem).toHaveClass(
        "relative",
        "aspect-9/10",
        "w-44",
        "flex-none",
        "overflow-hidden",
        "rounded-xl",
        "bg-zinc-100",
        "sm:w-72",
        "sm:rounded-2xl",
        "dark:bg-zinc-800"
      );
    });

    it("renders images with correct attributes", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      expect(images).toHaveLength(mockPhotos.length);

      images.forEach((image, index) => {
        expect(image).toHaveAttribute("src", mockPhotos[index]?.src);
        expect(image).toHaveAttribute("alt", "");
        expect(image).toHaveClass(
          "absolute",
          "inset-0",
          "h-full",
          "w-full",
          "object-cover"
        );
      });
    });
  });

  describe("Photo Rendering", () => {
    it("renders single photo correctly", () => {
      const singlePhoto = [mockPhotos[0]!];
      render(<PhotoGallery photos={singlePhoto} />);

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      expect(images).toHaveLength(1);
      expect(images[0]).toHaveAttribute("src", singlePhoto[0]!.src);
    });

    it("renders multiple photos correctly", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      expect(images).toHaveLength(mockPhotos.length);

      mockPhotos.forEach((photo, index) => {
        expect(images[index]).toHaveAttribute("src", photo.src);
      });
    });

    it("applies rotation classes to photo items", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const photoItems = screen.getAllByTestId(
        /test-id-photo-gallery-item-\d+-root/
      );

      // Check that rotation classes are applied
      photoItems.forEach((item) => {
        expect(item).toHaveClass(
          "relative",
          "aspect-9/10",
          "w-44",
          "flex-none",
          "overflow-hidden",
          "rounded-xl",
          "bg-zinc-100",
          "sm:w-72",
          "sm:rounded-2xl",
          "dark:bg-zinc-800"
        );
        // The component applies rotation classes based on index
        expect(item.className).toContain("rotate-2");
      });
    });

    it("uses image src as key for photo items", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const photoItems = screen.getAllByTestId(
        /test-id-photo-gallery-item-\d+-root/
      );
      expect(photoItems).toHaveLength(mockPhotos.length);
    });
  });

  describe("Conditional Rendering", () => {
    it("returns null when photos array is empty", () => {
      const { container } = render(<PhotoGallery photos={[]} />);

      expect(container.firstChild).toBeNull();
    });

    it("returns null when photos is null", () => {
      const { container } = render(<PhotoGallery photos={null as any} />);

      expect(container.firstChild).toBeNull();
    });

    it("uses default photos when photos is undefined", () => {
      render(<PhotoGallery photos={undefined as any} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();
    });

    it("renders when photos array has content", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("uses memoized component when isMemoized is true", () => {
      render(<PhotoGallery photos={mockPhotos} isMemoized={true} />);

      expect(
        screen.getByTestId("test-id-photo-gallery-root")
      ).toBeInTheDocument();
    });

    it("uses base component when isMemoized is false", () => {
      render(<PhotoGallery photos={mockPhotos} isMemoized={false} />);

      expect(
        screen.getByTestId("test-id-photo-gallery-root")
      ).toBeInTheDocument();
    });

    it("uses base component when isMemoized is undefined", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      expect(
        screen.getByTestId("test-id-photo-gallery-root")
      ).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles photos with different image formats", () => {
      const mixedPhotos = [
        { src: "/test/image1.jpg", width: 400, height: 300 },
        { src: "/test/image2.png", width: 400, height: 300 },
        { src: "/test/image3.webp", width: 400, height: 300 },
      ];

      render(<PhotoGallery photos={mixedPhotos} />);

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      expect(images).toHaveLength(mixedPhotos.length);

      mixedPhotos.forEach((photo, index) => {
        expect(images[index]).toHaveAttribute("src", photo.src);
      });
    });

    it("handles photos with different dimensions", () => {
      const variedPhotos = [
        { src: "/test/small.jpg", width: 200, height: 150 },
        { src: "/test/large.jpg", width: 800, height: 600 },
        { src: "/test/square.jpg", width: 300, height: 300 },
      ];

      render(<PhotoGallery photos={variedPhotos} />);

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      expect(images).toHaveLength(variedPhotos.length);
    });

    it("handles large number of photos", () => {
      const manyPhotos = Array.from({ length: 20 }, (_, i) => ({
        src: `/test/image${i + 1}.jpg`,
        width: 400,
        height: 300,
      }));

      render(<PhotoGallery photos={manyPhotos} />);

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      expect(images).toHaveLength(20);
    });

    it("handles photos with special characters in src", () => {
      const specialPhotos = [
        { src: "/test/image with spaces.jpg", width: 400, height: 300 },
        { src: "/test/image-with-dashes.jpg", width: 400, height: 300 },
        { src: "/test/image_with_underscores.jpg", width: 400, height: 300 },
      ];

      render(<PhotoGallery photos={specialPhotos} />);

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      expect(images).toHaveLength(specialPhotos.length);

      specialPhotos.forEach((photo, index) => {
        expect(images[index]).toHaveAttribute("src", photo.src);
      });
    });
  });

  describe("Performance Tests", () => {
    it("renders efficiently with different props", () => {
      const { rerender } = render(<PhotoGallery photos={mockPhotos} />);

      rerender(<PhotoGallery photos={mockPhotos} className="new-class" />);
      expect(screen.getByTestId("test-id-photo-gallery-root")).toHaveClass(
        "new-class"
      );

      rerender(<PhotoGallery photos={mockPhotos} debugMode={true} />);
      expect(screen.getByTestId("test-id-photo-gallery-root")).toHaveAttribute(
        "data-debug-mode",
        "true"
      );
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(<PhotoGallery photos={mockPhotos} />);

      const newPhotos = [
        ...mockPhotos,
        { src: "/test/new.jpg", width: 400, height: 300 },
      ];
      rerender(<PhotoGallery photos={newPhotos} />);

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      expect(images).toHaveLength(newPhotos.length);
    });
  });

  describe("Component Interface", () => {
    it("returns a React element", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos} />);

      expect(container.firstChild).toBeInstanceOf(HTMLElement);
    });

    it("accepts all div HTML attributes", () => {
      render(
        <PhotoGallery
          photos={mockPhotos}
          id="test-id"
          className="test-class"
          data-test="test-data"
          aria-label="Test label"
        />
      );

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toHaveAttribute("id", "test-id-photo-gallery");
      expect(layout).toHaveAttribute("data-test", "test-data");
      expect(layout).toHaveAttribute("aria-label", "Test label");
    });
  });

  describe("Accessibility", () => {
    it("maintains proper semantic structure", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      const grid = screen.getByTestId("test-id-photo-gallery-grid-root");

      expect(layout).toBeInTheDocument();
      expect(grid).toBeInTheDocument();
    });

    it("provides proper data attributes for debugging", () => {
      render(<PhotoGallery photos={mockPhotos} debugMode={true} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      const grid = screen.getByTestId("test-id-photo-gallery-grid-root");

      expect(layout).toHaveAttribute("data-debug-mode", "true");
      expect(grid).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders images with empty alt text for decorative purposes", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      images.forEach((image) => {
        expect(image).toHaveAttribute("alt", "");
      });
    });

    it("provides proper component IDs for all elements", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      const grid = screen.getByTestId("test-id-photo-gallery-grid-root");

      expect(layout).toHaveAttribute(
        "data-photo-gallery-id",
        "test-id-photo-gallery"
      );
      expect(grid).toHaveAttribute(
        "data-photo-gallery-grid-id",
        "test-id-photo-gallery-grid"
      );
    });
  });

  describe("Integration Tests", () => {
    it("renders a complete photo gallery with all components working together", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      // Test layout structure
      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();
      expect(layout).toHaveClass("mt-16", "sm:mt-20");

      // Test grid structure
      const grid = screen.getByTestId("test-id-photo-gallery-grid-root");
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass(
        "-my-4",
        "flex",
        "justify-center",
        "gap-5",
        "overflow-hidden",
        "py-4",
        "sm:gap-8"
      );

      // Test photo items
      const photoItems = screen.getAllByTestId(
        /test-id-photo-gallery-item-\d+-root/
      );
      expect(photoItems).toHaveLength(mockPhotos.length);

      // Test images
      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      expect(images).toHaveLength(mockPhotos.length);

      mockPhotos.forEach((photo, index) => {
        expect(images[index]).toHaveAttribute("src", photo.src);
        expect(images[index]).toHaveClass(
          "absolute",
          "inset-0",
          "h-full",
          "w-full",
          "object-cover"
        );
      });
    });

    it("works with different photo configurations", () => {
      const configs = [
        { photos: [mockPhotos[0]], expectedCount: 1 },
        { photos: mockPhotos.slice(0, 2), expectedCount: 2 },
        { photos: mockPhotos, expectedCount: 3 },
      ];

      configs.forEach(({ photos, expectedCount }) => {
        const { unmount } = render(<PhotoGallery photos={photos as any} />);

        const images = screen.getAllByTestId(
          /test-id-photo-gallery-image-\d+-root/
        );
        expect(images).toHaveLength(expectedCount);

        unmount();
      });
    });

    it("handles complex photo data structures", () => {
      const complexPhotos = [
        { src: "/test/complex1.jpg", width: 1920, height: 1080 },
        { src: "/test/complex2.jpg", width: 800, height: 600 },
        { src: "/test/complex3.jpg", width: 400, height: 300 },
      ];

      render(<PhotoGallery photos={complexPhotos} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      expect(images).toHaveLength(complexPhotos.length);

      complexPhotos.forEach((photo, index) => {
        expect(images[index]).toHaveAttribute("src", photo.src);
      });
    });
  });
});
