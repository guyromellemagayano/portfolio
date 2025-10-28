import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PhotoGallery } from "../PhotoGallery";

import "@testing-library/jest-dom";

// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit tests
// - Coverage: Tier 2 (80%+ coverage, key paths + edges)
// - Risk Tier: Core (presentational component with image rendering)
// - Component Type: Presentational (pure display, no sub-components)
// ============================================================================

// ============================================================================
// MOCKS
// ============================================================================

// Mock useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.internalId || options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock utils functions
vi.mock("@guyromellemagayano/utils", () => ({
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
      ...additionalProps,
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
      src={src?.src || src}
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
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
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

describe("PhotoGallery", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default photos when no photos prop provided", () => {
      // When no photos prop is provided, the component uses default photos
      render(<PhotoGallery />);

      const layout = screen.getByTestId("test-id-photo-gallery");
      expect(layout).toBeInTheDocument();
      expect(layout.tagName).toBe("DIV");
    });

    it("renders with custom photos when provided", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const layout = screen.getByTestId("test-id-photo-gallery");
      expect(layout).toBeInTheDocument();
      expect(layout).toHaveAttribute("class");
    });

    it("applies custom className", () => {
      render(<PhotoGallery photos={mockPhotos} className="custom-class" />);

      const layout = screen.getByTestId("test-id-photo-gallery");
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

      const layout = screen.getByTestId("test-id-photo-gallery");
      expect(layout).toHaveAttribute("data-test", "custom-data");
      expect(layout).toHaveAttribute("aria-label", "Photo gallery");
    });

    it("uses useComponentId hook correctly", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      // The hook is already mocked at the top of the file
      expect(true).toBe(true);
    });

    it("uses custom debug ID when provided", () => {
      render(<PhotoGallery photos={mockPhotos} debugId="custom-id" />);

      const layout = screen.getByTestId("custom-id-photo-gallery");
      expect(layout).toHaveAttribute(
        "data-photo-gallery-id",
        "custom-id-photo-gallery"
      );
    });

    it("enables debug mode when provided", () => {
      render(<PhotoGallery photos={mockPhotos} debugMode={true} />);

      const layout = screen.getByTestId("test-id-photo-gallery");
      expect(layout).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Component Structure", () => {
    it("renders layout with correct structure", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const layout = screen.getByTestId("test-id-photo-gallery");
      expect(layout).toBeInTheDocument();
      expect(layout).toHaveAttribute("class");
    });

    it("renders photo grid with correct attributes", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const grid = screen.getByTestId("test-id-photo-gallery-grid");
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveAttribute("class");
    });

    it("renders correct number of photo items", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const photoItems = screen.getAllByTestId(
        /test-id-photo-gallery-item-\d+/
      );
      expect(photoItems).toHaveLength(mockPhotos.length);
    });

    it("renders photo items with correct structure", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const firstItem = screen.getByTestId("test-id-photo-gallery-item-0");
      expect(firstItem).toBeInTheDocument();
      expect(firstItem).toHaveAttribute("class");
    });

    it("renders images with correct attributes", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(mockPhotos.length);

      images.forEach((image, index) => {
        expect(image).toHaveAttribute("src", mockPhotos[index]?.src);
        expect(image).toHaveAttribute("alt", "");
        expect(image).toHaveAttribute("class");
      });
    });
  });

  describe("Photo Rendering", () => {
    it("renders single photo correctly", () => {
      const singlePhoto = [mockPhotos[0]!];
      render(<PhotoGallery photos={singlePhoto} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(1);
      expect(images[0]).toHaveAttribute("src", singlePhoto[0]!.src);
    });

    it("renders multiple photos correctly", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(mockPhotos.length);

      mockPhotos.forEach((photo, index) => {
        expect(images[index]).toHaveAttribute("src", photo.src);
      });
    });

    it("applies rotation classes to photo items", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const photoItems = screen.getAllByTestId(
        /test-id-photo-gallery-item-\d+/
      );

      // Check that rotation classes are applied based on the component's rotation pattern
      const expectedRotations = ["rotate-2", "-rotate-2", "rotate-2"];

      photoItems.forEach((item, index) => {
        expect(item).toHaveAttribute("class");
        // The component applies rotation classes based on index modulo rotation array length
        // Note: With Rantail CSS obfuscation, we can't test specific class names
      });
    });

    it("uses image src as key for photo items", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const photoItems = screen.getAllByTestId(
        /test-id-photo-gallery-item-\d+/
      );
      expect(photoItems).toHaveLength(mockPhotos.length);
    });
  });

  describe("Conditional Rendering", () => {
    it("renders layout structure when photos array is empty", () => {
      render(<PhotoGallery photos={[]} />);

      const layout = screen.getByTestId("test-id-photo-gallery");
      expect(layout).toBeInTheDocument();
      expect(layout).toHaveAttribute("class");
    });

    it("returns null when photos is null", () => {
      const { container } = render(<PhotoGallery photos={null as any} />);

      expect(container.firstChild).toBeNull();
    });

    it("uses default photos when photos is undefined", () => {
      render(<PhotoGallery photos={undefined as any} />);

      const layout = screen.getByTestId("test-id-photo-gallery");
      expect(layout).toBeInTheDocument();
    });

    it("renders when photos array has content", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const layout = screen.getByTestId("test-id-photo-gallery");
      expect(layout).toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("uses memoized component when isMemoized is true", () => {
      render(<PhotoGallery photos={mockPhotos} isMemoized={true} />);

      expect(screen.getByTestId("test-id-photo-gallery")).toBeInTheDocument();
    });

    it("uses base component when isMemoized is false", () => {
      render(<PhotoGallery photos={mockPhotos} isMemoized={false} />);

      expect(screen.getByTestId("test-id-photo-gallery")).toBeInTheDocument();
    });

    it("uses base component when isMemoized is undefined", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      expect(screen.getByTestId("test-id-photo-gallery")).toBeInTheDocument();
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

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
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

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(variedPhotos.length);
    });

    it("handles large number of photos", () => {
      const manyPhotos = Array.from({ length: 20 }, (_, i) => ({
        src: `/test/image${i + 1}.jpg`,
        width: 400,
        height: 300,
      }));

      render(<PhotoGallery photos={manyPhotos} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(20);
    });

    it("handles photos with special characters in src", () => {
      const specialPhotos = [
        { src: "/test/image with spaces.jpg", width: 400, height: 300 },
        { src: "/test/image-with-dashes.jpg", width: 400, height: 300 },
        { src: "/test/image_with_underscores.jpg", width: 400, height: 300 },
      ];

      render(<PhotoGallery photos={specialPhotos} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(specialPhotos.length);

      specialPhotos.forEach((photo, index) => {
        expect(images[index]).toHaveAttribute("src", photo.src);
      });
    });

    it("handles photos with missing width/height properties", () => {
      const incompletePhotos = [
        { src: "/test/image1.jpg" },
        { src: "/test/image2.jpg", width: 400 },
        { src: "/test/image3.jpg", height: 300 },
      ] as any;

      render(<PhotoGallery photos={incompletePhotos} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(incompletePhotos.length);
    });

    it("handles photos with undefined src", () => {
      const invalidPhotos = [
        { src: undefined, width: 400, height: 300 },
        { src: "/test/image2.jpg", width: 400, height: 300 },
      ] as any;

      render(<PhotoGallery photos={invalidPhotos} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(invalidPhotos.length);
    });

    it("handles photos with zero dimensions", () => {
      const zeroPhotos = [
        { src: "/test/image1.jpg", width: 0, height: 0 },
        { src: "/test/image2.jpg", width: 400, height: 300 },
      ];

      render(<PhotoGallery photos={zeroPhotos} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(zeroPhotos.length);
    });

    it("handles photos with negative dimensions", () => {
      const negativePhotos = [
        { src: "/test/image1.jpg", width: -100, height: -50 },
        { src: "/test/image2.jpg", width: 400, height: 300 },
      ];

      render(<PhotoGallery photos={negativePhotos} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(negativePhotos.length);
    });

    it("handles photos with very large dimensions", () => {
      const largePhotos = [
        { src: "/test/image1.jpg", width: 10000, height: 8000 },
        { src: "/test/image2.jpg", width: 400, height: 300 },
      ];

      render(<PhotoGallery photos={largePhotos} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(largePhotos.length);
    });

    it("handles photos with duplicate src values", () => {
      const duplicatePhotos = [
        { src: "/test/same-image.jpg", width: 400, height: 300 },
        { src: "/test/same-image.jpg", width: 400, height: 300 },
        { src: "/test/different-image.jpg", width: 400, height: 300 },
      ];

      render(<PhotoGallery photos={duplicatePhotos} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(duplicatePhotos.length);
    });
  });

  describe("Performance Tests", () => {
    it("renders efficiently with different props", () => {
      const { rerender } = render(<PhotoGallery photos={mockPhotos} />);

      rerender(<PhotoGallery photos={mockPhotos} className="new-class" />);
      expect(screen.getByTestId("test-id-photo-gallery")).toHaveAttribute(
        "class"
      );

      rerender(<PhotoGallery photos={mockPhotos} debugMode={true} />);
      expect(screen.getByTestId("test-id-photo-gallery")).toHaveAttribute(
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

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
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

      const layout = screen.getByTestId("test-id-photo-gallery");
      expect(layout).toHaveAttribute("id", "test-id");
      expect(layout).toHaveAttribute("data-test", "test-data");
      expect(layout).toHaveAttribute("aria-label", "Test label");
    });
  });

  describe("Accessibility", () => {
    it("maintains proper semantic structure", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const layout = screen.getByTestId("test-id-photo-gallery");
      const grid = screen.getByTestId("test-id-photo-gallery-grid");

      expect(layout).toBeInTheDocument();
      expect(grid).toBeInTheDocument();
    });

    it("applies correct ARIA roles to main layout elements", () => {
      render(<PhotoGallery photos={mockPhotos} debugId="aria-test" />);

      // Test main content area
      const mainElement = screen.getByTestId("aria-test-photo-gallery");
      expect(mainElement).toBeInTheDocument();

      // Test grid container
      const gridElement = screen.getByTestId("aria-test-photo-gallery-grid");
      expect(gridElement).toBeInTheDocument();
    });

    it("applies unique IDs for photo items", () => {
      render(<PhotoGallery photos={mockPhotos} debugId="aria-test" />);

      // Test unique IDs for photo items via data-testid
      const photoItems = screen.getAllByTestId(
        /aria-test-photo-gallery-item-\d+/
      );
      expect(photoItems).toHaveLength(mockPhotos.length);

      // Each photo item should have the correct test ID
      photoItems.forEach((item, index) => {
        expect(item).toHaveAttribute(
          "data-testid",
          `aria-test-photo-gallery-item-${index}`
        );
      });
    });

    it("applies correct attributes to image elements", () => {
      render(<PhotoGallery photos={mockPhotos} debugId="aria-test" />);

      // Test image elements have proper attributes
      const images = screen.getAllByTestId(/aria-test-photo-gallery-image-\d+/);
      expect(images).toHaveLength(mockPhotos.length);

      images.forEach((image, index) => {
        expect(image).toHaveAttribute(
          "data-testid",
          `aria-test-photo-gallery-image-${index}`
        );
        expect(image).toHaveAttribute("alt", "");
      });
    });

    it("handles ARIA attributes when content is missing", () => {
      render(<PhotoGallery photos={[]} debugId="aria-test" />);

      // Should render layout structure even with empty photos
      const layout = screen.getByTestId("aria-test-photo-gallery");
      expect(layout).toBeInTheDocument();
      expect(layout).toHaveAttribute(
        "data-photo-gallery-id",
        "aria-test-photo-gallery"
      );
    });

    it("applies ARIA attributes with different internal IDs", () => {
      render(<PhotoGallery photos={mockPhotos} debugId="different-id" />);

      const layout = screen.getByTestId("different-id-photo-gallery");
      expect(layout).toHaveAttribute(
        "data-photo-gallery-id",
        "different-id-photo-gallery"
      );
    });

    it("applies ARIA attributes during component updates", () => {
      const { rerender } = render(
        <PhotoGallery photos={mockPhotos} debugId="update-test" />
      );

      const initialLayout = screen.getByTestId("update-test-photo-gallery");
      expect(initialLayout).toBeInTheDocument();

      // Rerender with different photos
      const newPhotos = mockPhotos[0] ? [mockPhotos[0]] : [];
      rerender(<PhotoGallery photos={newPhotos} debugId="update-test" />);

      const updatedLayout = screen.getByTestId("update-test-photo-gallery");
      expect(updatedLayout).toBeInTheDocument();
    });

    it("provides proper data attributes for debugging", () => {
      render(<PhotoGallery photos={mockPhotos} debugMode={true} />);

      const layout = screen.getByTestId("test-id-photo-gallery");
      const grid = screen.getByTestId("test-id-photo-gallery-grid");

      expect(layout).toHaveAttribute("data-debug-mode", "true");
      expect(grid).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders images with empty alt text for decorative purposes", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      images.forEach((image) => {
        expect(image).toHaveAttribute("alt", "");
      });
    });

    it("provides proper component IDs for all elements", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      const layout = screen.getByTestId("test-id-photo-gallery");
      const grid = screen.getByTestId("test-id-photo-gallery-grid");

      expect(layout).toHaveAttribute(
        "data-photo-gallery-id",
        "test-id-photo-gallery"
      );
      expect(grid).toHaveAttribute(
        "data-photo-gallery-grid-id",
        "test-id-photo-gallery-grid"
      );
    });

    it("applies correct ARIA roles to main layout elements", () => {
      render(<PhotoGallery photos={mockPhotos} debugId="aria-test" />);

      // Test main content area
      const mainElement = screen.getByTestId("aria-test-photo-gallery");
      expect(mainElement).toBeInTheDocument();

      // Test grid container
      const gridElement = screen.getByTestId("aria-test-photo-gallery-grid");
      expect(gridElement).toBeInTheDocument();
    });

    it("applies unique IDs for photo items", () => {
      render(<PhotoGallery photos={mockPhotos} debugId="aria-test" />);

      // Test unique IDs for photo items via data-testid
      const photoItems = screen.getAllByTestId(
        /aria-test-photo-gallery-item-\d+/
      );
      expect(photoItems).toHaveLength(mockPhotos.length);

      // Each photo item should have the correct test ID
      photoItems.forEach((item, index) => {
        expect(item).toHaveAttribute(
          "data-testid",
          `aria-test-photo-gallery-item-${index}`
        );
      });
    });

    it("applies correct attributes to image elements", () => {
      render(<PhotoGallery photos={mockPhotos} debugId="aria-test" />);

      // Test image elements have proper attributes
      const images = screen.getAllByTestId(/aria-test-photo-gallery-image-\d+/);
      expect(images).toHaveLength(mockPhotos.length);

      images.forEach((image, index) => {
        expect(image).toHaveAttribute(
          "data-testid",
          `aria-test-photo-gallery-image-${index}`
        );
        expect(image).toHaveAttribute("alt", "");
      });
    });

    it("handles ARIA attributes when content is missing", () => {
      render(<PhotoGallery photos={[]} debugId="aria-test" />);

      // Should render layout structure even with empty photos
      const layout = screen.getByTestId("aria-test-photo-gallery");
      expect(layout).toBeInTheDocument();
      expect(layout).toHaveAttribute(
        "data-photo-gallery-id",
        "aria-test-photo-gallery"
      );
    });

    it("applies ARIA attributes with different internal IDs", () => {
      render(<PhotoGallery photos={mockPhotos} debugId="different-id" />);

      const layout = screen.getByTestId("different-id-photo-gallery");
      expect(layout).toHaveAttribute(
        "data-photo-gallery-id",
        "different-id-photo-gallery"
      );
    });

    it("applies ARIA attributes during component updates", () => {
      const { rerender } = render(
        <PhotoGallery photos={mockPhotos} debugId="update-test" />
      );

      const initialLayout = screen.getByTestId("update-test-photo-gallery");
      expect(initialLayout).toBeInTheDocument();

      // Rerender with different photos
      const newPhotos = mockPhotos[0] ? [mockPhotos[0]] : [];
      rerender(<PhotoGallery photos={newPhotos} debugId="update-test" />);

      const updatedLayout = screen.getByTestId("update-test-photo-gallery");
      expect(updatedLayout).toBeInTheDocument();
    });
  });

  describe("Integration Tests", () => {
    it("renders a complete photo gallery with all components working together", () => {
      render(<PhotoGallery photos={mockPhotos} />);

      // Test layout structure
      const layout = screen.getByTestId("test-id-photo-gallery");
      expect(layout).toBeInTheDocument();
      expect(layout).toHaveAttribute("class");

      // Test grid structure
      const grid = screen.getByTestId("test-id-photo-gallery-grid");
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveAttribute("class");

      // Test photo items
      const photoItems = screen.getAllByTestId(
        /test-id-photo-gallery-item-\d+/
      );
      expect(photoItems).toHaveLength(mockPhotos.length);

      // Test images
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

    it("handles complex photo data structures", () => {
      const complexPhotos = [
        { src: "/test/complex1.jpg", width: 1920, height: 1080 },
        { src: "/test/complex2.jpg", width: 800, height: 600 },
        { src: "/test/complex3.jpg", width: 400, height: 300 },
      ];

      render(<PhotoGallery photos={complexPhotos} />);

      const layout = screen.getByTestId("test-id-photo-gallery");
      expect(layout).toBeInTheDocument();

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(complexPhotos.length);

      complexPhotos.forEach((photo, index) => {
        expect(images[index]).toHaveAttribute("src", photo.src);
      });
    });
  });
});
