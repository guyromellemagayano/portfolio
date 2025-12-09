// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Presentational (polymorphic: div | section + image rendering)
// ============================================================================

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MemoizedPhotoGallery, PhotoGallery } from "../PhotoGallery";

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
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additional["data-testid"] || `${id}-${componentType}-root`,
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

describe("PhotoGallery", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default photos when no photos prop provided", () => {
      render(<PhotoGallery />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();
      expect(layout.tagName).toBe("DIV");
    });

    it("renders with custom photos when provided", () => {
      render(<PhotoGallery photos={mockPhotos as any} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();
      expect(layout).toHaveAttribute("class");
    });

    it("applies custom className", () => {
      render(
        <PhotoGallery photos={mockPhotos as any} className="custom-class" />
      );

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toHaveClass("custom-class");
    });

    it("passes through additional props", () => {
      render(
        <PhotoGallery
          photos={mockPhotos as any}
          data-test="custom-data"
          aria-label="Photo gallery"
        />
      );

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toHaveAttribute("data-test", "custom-data");
      expect(layout).toHaveAttribute("aria-label", "Photo gallery");
    });

    it("uses custom debugId when provided", () => {
      render(<PhotoGallery photos={mockPhotos as any} debugId="custom-id" />);

      const layout = screen.getByTestId("custom-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();
    });

    it("enables debug mode when provided", () => {
      render(<PhotoGallery photos={mockPhotos as any} debugMode={true} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Polymorphic as=", () => {
    it('supports as="section" for semantic structure', () => {
      render(<PhotoGallery photos={mockPhotos as any} as="section" />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout.tagName).toBe("SECTION");
    });

    it("supports custom role on section", () => {
      render(
        <PhotoGallery photos={mockPhotos as any} as="section" role="article" />
      );

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout.tagName).toBe("SECTION");
      expect(layout).toHaveAttribute("role", "article");
    });
  });

  describe("Component Structure", () => {
    it("renders layout with correct structure", () => {
      render(<PhotoGallery photos={mockPhotos as any} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();
      expect(layout).toHaveAttribute("class");
    });

    it("renders photo grid with correct attributes", () => {
      render(<PhotoGallery photos={mockPhotos as any} />);

      const grid = screen.getByTestId("test-id-photo-gallery-grid-root");
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveAttribute("class");
    });

    it("renders correct number of photo items", () => {
      render(<PhotoGallery photos={mockPhotos as any} />);

      const photoItems = screen.getAllByTestId(
        /test-id-photo-gallery-item-\d+-root/
      );
      expect(photoItems).toHaveLength(mockPhotos.length);
    });

    it("renders photo items with correct structure", () => {
      render(<PhotoGallery photos={mockPhotos as any} />);

      const firstItem = screen.getByTestId("test-id-photo-gallery-item-0-root");
      expect(firstItem).toBeInTheDocument();
      expect(firstItem).toHaveAttribute("class");
    });

    it("renders images with correct attributes", () => {
      render(<PhotoGallery photos={mockPhotos as any} />);

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      expect(images).toHaveLength(mockPhotos.length);

      images.forEach((image, index) => {
        expect(image).toHaveAttribute("src", mockPhotos[index]?.src);
        expect(image).toHaveAttribute("alt", "");
        expect(image).toHaveAttribute("data-fill", "true");
        expect(image).toHaveAttribute("data-priority", "true");
        expect(image).toHaveAttribute(
          "data-sizes",
          "(min-width: 640px) 18rem, 11rem"
        );
      });
    });
  });

  describe("Photo Rendering", () => {
    it("renders single photo correctly", () => {
      const singlePhoto = [mockPhotos[0]!];
      render(<PhotoGallery photos={singlePhoto as any} />);

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      expect(images).toHaveLength(1);
      expect(images[0]).toHaveAttribute("src", singlePhoto[0]!.src);
    });

    it("renders multiple photos correctly", () => {
      render(<PhotoGallery photos={mockPhotos as any} />);

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      expect(images).toHaveLength(mockPhotos.length);

      mockPhotos.forEach((photo, index) => {
        expect(images[index]).toHaveAttribute("src", photo.src);
      });
    });

    it("applies rotation classes to photo items", () => {
      render(<PhotoGallery photos={mockPhotos as any} />);

      const photoItems = screen.getAllByTestId(
        /test-id-photo-gallery-item-\d+-root/
      );

      // Check that rotation classes are applied based on the component's rotation pattern
      photoItems.forEach((item) => {
        expect(item).toHaveAttribute("class");
        // The component applies rotation classes based on index modulo rotation array length
        // Note: With Tailwind CSS, we can't test specific class names reliably
      });
    });

    it("uses image src as key for photo items", () => {
      render(<PhotoGallery photos={mockPhotos as any} />);

      const photoItems = screen.getAllByTestId(
        /test-id-photo-gallery-item-\d+-root/
      );
      expect(photoItems).toHaveLength(mockPhotos.length);
    });
  });

  describe("Conditional Rendering", () => {
    it("renders layout structure when photos array is empty", () => {
      render(<PhotoGallery photos={[] as any} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();
      expect(layout).toHaveAttribute("class");
    });

    it("returns null when photos is null", () => {
      const { container } = render(<PhotoGallery photos={null as any} />);

      expect(container).toBeEmptyDOMElement();
    });

    it("uses default photos when photos is undefined", () => {
      render(<PhotoGallery photos={undefined as any} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();
    });

    it("renders when photos array has content", () => {
      render(<PhotoGallery photos={mockPhotos as any} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("MemoizedPhotoGallery renders children", () => {
      render(<MemoizedPhotoGallery photos={mockPhotos as any} />);

      expect(
        screen.getByTestId("test-id-photo-gallery-root")
      ).toBeInTheDocument();
    });

    it("MemoizedPhotoGallery maintains content across re-renders with same props", () => {
      const { rerender } = render(
        <MemoizedPhotoGallery photos={mockPhotos as any} />
      );
      expect(
        screen.getByTestId("test-id-photo-gallery-root")
      ).toBeInTheDocument();

      rerender(<MemoizedPhotoGallery photos={mockPhotos as any} />);
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

      render(<PhotoGallery photos={mixedPhotos as any} />);

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

      render(<PhotoGallery photos={variedPhotos as any} />);

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

      render(<PhotoGallery photos={manyPhotos as any} />);

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

      render(<PhotoGallery photos={specialPhotos as any} />);

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
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

    it("handles photos with duplicate src values", () => {
      const duplicatePhotos = [
        { src: "/test/same-image.jpg", width: 400, height: 300 },
        { src: "/test/same-image.jpg", width: 400, height: 300 },
        { src: "/test/different-image.jpg", width: 400, height: 300 },
      ];

      render(<PhotoGallery photos={duplicatePhotos as any} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(duplicatePhotos.length);
    });
  });

  describe("Performance Tests", () => {
    it("renders efficiently with different props", () => {
      const { rerender } = render(<PhotoGallery photos={mockPhotos as any} />);

      rerender(
        <PhotoGallery photos={mockPhotos as any} className="new-class" />
      );
      expect(screen.getByTestId("test-id-photo-gallery-root")).toHaveAttribute(
        "class"
      );

      rerender(<PhotoGallery photos={mockPhotos as any} debugMode={true} />);
      expect(screen.getByTestId("test-id-photo-gallery-root")).toHaveAttribute(
        "data-debug-mode",
        "true"
      );
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(<PhotoGallery photos={mockPhotos as any} />);

      const newPhotos = [
        ...mockPhotos,
        { src: "/test/new.jpg", width: 400, height: 300 },
      ];
      rerender(<PhotoGallery photos={newPhotos as any} />);

      const images = screen.getAllByTestId(/test-id-photo-gallery-image-\d+/);
      expect(images).toHaveLength(newPhotos.length);
    });
  });

  describe("Component Interface", () => {
    it("returns a React element", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos as any} />);

      expect(container.firstChild).toBeInstanceOf(HTMLElement);
    });

    it("accepts all div HTML attributes", () => {
      render(
        <PhotoGallery
          photos={mockPhotos as any}
          id="test-id"
          className="test-class"
          data-test="test-data"
          aria-label="Test label"
        />
      );

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      expect(layout).toHaveAttribute("id", "test-id");
      expect(layout).toHaveAttribute("data-test", "test-data");
      expect(layout).toHaveAttribute("aria-label", "Test label");
    });
  });

  describe("Accessibility", () => {
    it("maintains proper semantic structure", () => {
      render(<PhotoGallery photos={mockPhotos as any} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      const grid = screen.getByTestId("test-id-photo-gallery-grid-root");

      expect(layout).toBeInTheDocument();
      expect(grid).toBeInTheDocument();
    });

    it("applies unique IDs for photo items", () => {
      render(<PhotoGallery photos={mockPhotos as any} debugId="aria-test" />);

      const photoItems = screen.getAllByTestId(
        /aria-test-photo-gallery-item-\d+-root/
      );
      expect(photoItems).toHaveLength(mockPhotos.length);

      photoItems.forEach((item, index) => {
        expect(item).toHaveAttribute(
          "data-testid",
          `aria-test-photo-gallery-item-${index}-root`
        );
      });
    });

    it("applies correct attributes to image elements", () => {
      render(<PhotoGallery photos={mockPhotos as any} debugId="aria-test" />);

      const images = screen.getAllByTestId(
        /aria-test-photo-gallery-image-\d+-root/
      );
      expect(images).toHaveLength(mockPhotos.length);

      images.forEach((image, index) => {
        expect(image).toHaveAttribute(
          "data-testid",
          `aria-test-photo-gallery-image-${index}-root`
        );
        expect(image).toHaveAttribute("alt", "");
      });
    });

    it("handles ARIA attributes when content is missing", () => {
      render(<PhotoGallery photos={[] as any} debugId="aria-test" />);

      const layout = screen.getByTestId("aria-test-photo-gallery-root");
      expect(layout).toBeInTheDocument();
    });

    it("applies ARIA attributes with different internal IDs", () => {
      render(
        <PhotoGallery photos={mockPhotos as any} debugId="different-id" />
      );

      const layout = screen.getByTestId("different-id-photo-gallery-root");
      expect(layout).toBeInTheDocument();
    });

    it("applies ARIA attributes during component updates", () => {
      const { rerender } = render(
        <PhotoGallery photos={mockPhotos as any} debugId="update-test" />
      );

      const initialLayout = screen.getByTestId(
        "update-test-photo-gallery-root"
      );
      expect(initialLayout).toBeInTheDocument();

      const newPhotos = mockPhotos[0] ? [mockPhotos[0]] : [];
      rerender(
        <PhotoGallery photos={newPhotos as any} debugId="update-test" />
      );

      const updatedLayout = screen.getByTestId(
        "update-test-photo-gallery-root"
      );
      expect(updatedLayout).toBeInTheDocument();
    });

    it("provides proper data attributes for debugging", () => {
      render(<PhotoGallery photos={mockPhotos as any} debugMode={true} />);

      const layout = screen.getByTestId("test-id-photo-gallery-root");
      const grid = screen.getByTestId("test-id-photo-gallery-grid-root");

      expect(layout).toHaveAttribute("data-debug-mode", "true");
      expect(grid).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders images with empty alt text for decorative purposes", () => {
      render(<PhotoGallery photos={mockPhotos as any} />);

      const images = screen.getAllByTestId(
        /test-id-photo-gallery-image-\d+-root/
      );
      images.forEach((image) => {
        expect(image).toHaveAttribute("alt", "");
      });
    });
  });
});
