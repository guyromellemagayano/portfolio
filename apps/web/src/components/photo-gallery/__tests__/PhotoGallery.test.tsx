/**
 * @file PhotoGallery.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the PhotoGallery component.
 */

import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PhotoGallery } from "../PhotoGallery";

import "@testing-library/jest-dom";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: vi.fn((_namespace: string) => {
    const translations: Record<string, string> = {
      photoGallery: "Photo gallery",
      photoGalleryImages: "Photo gallery images",
    };

    return (key: string) => translations[key] ?? key;
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
  StaticImageData: {},
}));

// Mock @web/utils/helpers
vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes: string[]) => classes.filter(Boolean).join(" ")),
}));

// Mock image imports
vi.mock("@web/images/photos/image-1.jpg", () => ({
  default: { src: "/images/photos/image-1.jpg", width: 400, height: 300 },
}));

vi.mock("@web/images/photos/image-2.jpg", () => ({
  default: { src: "/images/photos/image-2.jpg", width: 400, height: 300 },
}));

vi.mock("@web/images/photos/image-3.jpg", () => ({
  default: { src: "/images/photos/image-3.jpg", width: 400, height: 300 },
}));

vi.mock("@web/images/photos/image-4.jpg", () => ({
  default: { src: "/images/photos/image-4.jpg", width: 400, height: 300 },
}));

vi.mock("@web/images/photos/image-5.jpg", () => ({
  default: { src: "/images/photos/image-5.jpg", width: 400, height: 300 },
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const mockPhotos = [
  { src: "/test/image1.jpg", width: 400, height: 300 },
  { src: "/test/image2.jpg", width: 400, height: 300 },
  { src: "/test/image3.jpg", width: 400, height: 300 },
] as any;

describe("PhotoGallery", () => {
  describe("Basic Rendering", () => {
    it("renders with default photos when no photos prop provided", () => {
      const { container } = render(<PhotoGallery />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
      expect(wrapper.tagName).toBe("SECTION");
      expect(wrapper).toHaveClass("mt-16", "sm:mt-20");
      expect(wrapper).toHaveAttribute("role", "region");
      expect(wrapper).toHaveAttribute("aria-label", "Photo gallery");
    });

    it("renders with custom photos when provided", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();

      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(mockPhotos.length);
    });

    it("applies custom className", () => {
      const { container } = render(
        <PhotoGallery photos={mockPhotos} className="custom-class" />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass("custom-class", "mt-16", "sm:mt-20");
    });

    it("passes through additional props", () => {
      const { container } = render(
        <PhotoGallery
          photos={mockPhotos}
          data-test="custom-data"
          aria-label="Custom gallery label"
        />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveAttribute("data-test", "custom-data");
      expect(wrapper).toHaveAttribute("aria-label", "Custom gallery label");
    });
  });

  describe("Polymorphic Element Types", () => {
    it("renders as section by default", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.tagName).toBe("SECTION");
      expect(wrapper).toHaveAttribute("role", "region");
    });

    it("renders as div when as prop is div", () => {
      const { container } = render(
        <PhotoGallery photos={mockPhotos} as="div" />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.tagName).toBe("DIV");
      expect(wrapper).toHaveAttribute("role", "region");
    });

    it("renders as section when as prop is section", () => {
      const { container } = render(
        <PhotoGallery photos={mockPhotos} as="section" />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.tagName).toBe("SECTION");
      expect(wrapper).toHaveAttribute("role", "region");
    });

    it("supports custom role on section", () => {
      const { container } = render(
        <PhotoGallery photos={mockPhotos} as="section" role="article" />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.tagName).toBe("SECTION");
      expect(wrapper).toHaveAttribute("role", "article");
    });
  });

  describe("Component Structure", () => {
    it("renders wrapper with correct structure", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass("mt-16", "sm:mt-20");
      expect(wrapper).toHaveAttribute("role", "region");
      expect(wrapper).toHaveAttribute("aria-label", "Photo gallery");

      const flexContainer = wrapper.querySelector("div[role='list']");
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer).toHaveClass(
        "-my-4",
        "flex",
        "justify-center",
        "gap-5",
        "overflow-hidden",
        "py-4",
        "sm:gap-8"
      );
      expect(flexContainer).toHaveAttribute("role", "list");
      expect(flexContainer).toHaveAttribute(
        "aria-label",
        "Photo gallery images"
      );
    });

    it("renders correct number of photo items", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos} />);

      const photoContainers = container.querySelectorAll(
        "div[role='listitem'][class*='relative'][class*='aspect-9/10']"
      );
      expect(photoContainers).toHaveLength(mockPhotos.length);

      photoContainers.forEach((item) => {
        expect(item).toHaveAttribute("role", "listitem");
      });
    });

    it("renders images with correct attributes", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos} />);

      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(mockPhotos.length);

      images.forEach((image, index) => {
        expect(image).toHaveAttribute("src", mockPhotos[index]?.src);
        expect(image).toHaveAttribute("alt", "");
        expect(image).toHaveAttribute("aria-hidden", "true");
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
      const { container } = render(<PhotoGallery photos={singlePhoto} />);

      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(1);
      expect(images[0]).toHaveAttribute("src", singlePhoto[0]!.src);
    });

    it("renders multiple photos correctly", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos} />);

      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(mockPhotos.length);

      mockPhotos.forEach((photo: { src: string }, index: number) => {
        expect(images[index]).toHaveAttribute("src", photo.src);
      });
    });

    it("applies rotation classes to photo items", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos} />);

      const photoContainers = container.querySelectorAll(
        "div[role='listitem'][class*='relative'][class*='aspect-9/10']"
      );

      photoContainers.forEach((item) => {
        expect(item).toHaveAttribute("class");
        expect(item).toHaveAttribute("role", "listitem");
        const classList = item.className;
        // Check that rotation classes are applied (rotate-2 or -rotate-2)
        expect(
          classList.includes("rotate-2") || classList.includes("-rotate-2")
        ).toBe(true);
      });
    });

    it("uses image src as key for photo items", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos} />);

      const photoContainers = container.querySelectorAll(
        "div[role='listitem'][class*='relative'][class*='aspect-9/10']"
      );
      expect(photoContainers).toHaveLength(mockPhotos.length);
    });
  });

  describe("Conditional Rendering", () => {
    it("renders wrapper structure when photos array is empty", () => {
      const { container } = render(<PhotoGallery photos={[]} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();

      const flexContainer = wrapper.querySelector("div");
      expect(flexContainer).toBeInTheDocument();

      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(0);
    });

    it("returns null when photos is null", () => {
      const { container } = render(<PhotoGallery photos={null as any} />);

      expect(container).toBeEmptyDOMElement();
    });

    it("uses default photos when photos is undefined", () => {
      const { container } = render(<PhotoGallery photos={undefined as any} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();

      // Default photos should render (from config)
      const images = container.querySelectorAll("img");
      expect(images.length).toBeGreaterThan(0);
    });

    it("renders when photos array has content", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();

      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(mockPhotos.length);
    });
  });

  describe("Edge Cases", () => {
    it("handles photos with different image formats", () => {
      const mixedPhotos = [
        { src: "/test/image1.jpg", width: 400, height: 300 },
        { src: "/test/image2.png", width: 400, height: 300 },
        { src: "/test/image3.webp", width: 400, height: 300 },
      ] as any;

      const { container } = render(<PhotoGallery photos={mixedPhotos} />);

      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(mixedPhotos.length);

      mixedPhotos.forEach((photo: { src: string }, index: number) => {
        expect(images[index]).toHaveAttribute("src", photo.src);
      });
    });

    it("handles photos with different dimensions", () => {
      const variedPhotos = [
        { src: "/test/small.jpg", width: 200, height: 150 },
        { src: "/test/large.jpg", width: 800, height: 600 },
        { src: "/test/square.jpg", width: 300, height: 300 },
      ] as any;

      const { container } = render(<PhotoGallery photos={variedPhotos} />);

      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(variedPhotos.length);
    });

    it("handles large number of photos", () => {
      const manyPhotos = Array.from({ length: 20 }, (_, i) => ({
        src: `/test/image${i + 1}.jpg`,
        width: 400,
        height: 300,
      })) as any;

      const { container } = render(<PhotoGallery photos={manyPhotos} />);

      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(20);
    });

    it("handles photos with duplicate src values", () => {
      const duplicatePhotos = [
        { src: "/test/same-image.jpg", width: 400, height: 300 },
        { src: "/test/same-image.jpg", width: 400, height: 300 },
        { src: "/test/different-image.jpg", width: 400, height: 300 },
      ] as any;

      const { container } = render(<PhotoGallery photos={duplicatePhotos} />);

      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(duplicatePhotos.length);
    });
  });

  describe("Performance Tests", () => {
    it("renders efficiently with different props", () => {
      const { rerender, container } = render(
        <PhotoGallery photos={mockPhotos} />
      );

      rerender(<PhotoGallery photos={mockPhotos} className="new-class" />);
      let wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass("new-class");

      rerender(<PhotoGallery photos={mockPhotos} as="section" />);
      wrapper = container.firstChild as HTMLElement;
      expect(wrapper.tagName).toBe("SECTION");
    });

    it("handles prop changes efficiently", () => {
      const { rerender, container } = render(
        <PhotoGallery photos={mockPhotos} />
      );

      const newPhotos = [
        ...mockPhotos,
        { src: "/test/new.jpg", width: 400, height: 300 },
      ] as any;
      rerender(<PhotoGallery photos={newPhotos} />);

      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(newPhotos.length);
    });
  });

  describe("Component Interface", () => {
    it("returns a React element", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos} />);

      expect(container.firstChild).toBeInstanceOf(HTMLElement);
    });

    it("accepts all div HTML attributes", () => {
      const { container } = render(
        <PhotoGallery
          photos={mockPhotos}
          id="test-id"
          className="test-class"
          data-test="test-data"
          aria-label="Test label"
        />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveAttribute("id", "test-id");
      expect(wrapper).toHaveAttribute("data-test", "test-data");
      expect(wrapper).toHaveAttribute("aria-label", "Test label");
    });
  });

  describe("Accessibility", () => {
    it("renders images with empty alt text and aria-hidden for decorative purposes", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos} />);

      const images = container.querySelectorAll("img");
      images.forEach((image) => {
        expect(image).toHaveAttribute("alt", "");
        expect(image).toHaveAttribute("aria-hidden", "true");
      });
    });

    it("maintains proper semantic structure", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveAttribute("role", "region");
      expect(wrapper).toHaveAttribute("aria-label", "Photo gallery");

      const flexContainer = wrapper.querySelector("div[role='list']");
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer).toHaveAttribute("role", "list");
      expect(flexContainer).toHaveAttribute(
        "aria-label",
        "Photo gallery images"
      );
    });

    it("applies correct ARIA roles to gallery structure", () => {
      const { container } = render(<PhotoGallery photos={mockPhotos} />);

      const region = container.firstChild as HTMLElement;
      expect(region).toHaveAttribute("role", "region");
      expect(region).toHaveAttribute("aria-label", "Photo gallery");

      const list = region.querySelector("div[role='list']");
      expect(list).toHaveAttribute("role", "list");
      expect(list).toHaveAttribute("aria-label", "Photo gallery images");

      const listItems = container.querySelectorAll("div[role='listitem']");
      expect(listItems).toHaveLength(mockPhotos.length);
    });

    it("supports custom aria-label", () => {
      const { container } = render(
        <PhotoGallery photos={mockPhotos} aria-label="Custom photo gallery" />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveAttribute("aria-label", "Custom photo gallery");

      const flexContainer = wrapper.querySelector("div[role='list']");
      expect(flexContainer).toHaveAttribute(
        "aria-label",
        "Custom photo gallery images"
      );
    });
  });
});
