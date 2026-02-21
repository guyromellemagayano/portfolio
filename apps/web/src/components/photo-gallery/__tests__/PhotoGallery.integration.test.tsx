/**
 * @file apps/web/src/components/photo-gallery/__tests__/PhotoGallery.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the PhotoGallery component.
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

describe("PhotoGallery (Integration)", () => {
  it("renders a complete photo gallery with all components working together", () => {
    const { container } = render(<PhotoGallery photos={mockPhotos} />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("mt-16", "sm:mt-20");
    expect(wrapper.tagName).toBe("SECTION");
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
    expect(flexContainer).toHaveAttribute("aria-label", "Photo gallery images");

    const photoContainers = container.querySelectorAll(
      "div[role='listitem'][class*='relative'][class*='aspect-9/10']"
    );
    expect(photoContainers).toHaveLength(mockPhotos.length);

    const images = container.querySelectorAll("img");
    expect(images).toHaveLength(mockPhotos.length);

    mockPhotos.forEach((photo: { src: string }, index: number) => {
      expect(images[index]).toHaveAttribute("src", photo.src);
      expect(images[index]).toHaveAttribute("alt", "");
      expect(images[index]).toHaveAttribute("aria-hidden", "true");
      expect(images[index]).toHaveAttribute("data-fill", "true");
      expect(images[index]).toHaveAttribute("data-priority", "true");
    });
  });

  it("works with different photo configurations", () => {
    const configs = [
      { photos: mockPhotos[0] ? [mockPhotos[0]] : [], expectedCount: 1 },
      { photos: mockPhotos.slice(0, 2), expectedCount: 2 },
      { photos: mockPhotos, expectedCount: 3 },
    ];

    configs.forEach(({ photos, expectedCount }) => {
      const { container, unmount } = render(
        <PhotoGallery photos={photos as any} />
      );

      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(expectedCount);

      unmount();
    });
  });

  it("renders end-to-end with default photos when no prop provided", () => {
    const { container } = render(<PhotoGallery />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();

    const flexContainer = wrapper.querySelector("div");
    expect(flexContainer).toBeInTheDocument();

    // Default photos should render (from config)
    const images = container.querySelectorAll("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("integrates polymorphic as prop with photo rendering", () => {
    const { container } = render(
      <PhotoGallery photos={mockPhotos} as="section" />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.tagName).toBe("SECTION");
    expect(wrapper).toHaveAttribute("role", "region");
    expect(wrapper).toHaveAttribute("aria-label", "Photo gallery");

    const images = container.querySelectorAll("img");
    expect(images).toHaveLength(mockPhotos.length);
  });

  it("integrates ARIA attributes with component structure", () => {
    const { container } = render(
      <PhotoGallery photos={mockPhotos} aria-label="Custom gallery" />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute("role", "region");
    expect(wrapper).toHaveAttribute("aria-label", "Custom gallery");

    const list = wrapper.querySelector("div[role='list']");
    expect(list).toHaveAttribute("role", "list");
    expect(list).toHaveAttribute("aria-label", "Custom gallery images");

    const listItems = container.querySelectorAll("div[role='listitem']");
    expect(listItems).toHaveLength(mockPhotos.length);

    const images = container.querySelectorAll("img");
    images.forEach((image) => {
      expect(image).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("integrates className merging with component structure", () => {
    const { container } = render(
      <PhotoGallery photos={mockPhotos} className="custom-gallery" />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-gallery", "mt-16", "sm:mt-20");

    const images = container.querySelectorAll("img");
    expect(images).toHaveLength(mockPhotos.length);
  });

  it("handles empty photos array gracefully", () => {
    const { container } = render(<PhotoGallery photos={[]} />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();

    const flexContainer = wrapper.querySelector("div");
    expect(flexContainer).toBeInTheDocument();

    const images = container.querySelectorAll("img");
    expect(images).toHaveLength(0);
  });

  it("handles null photos prop correctly", () => {
    const { container } = render(<PhotoGallery photos={null as any} />);

    expect(container).toBeEmptyDOMElement();
  });
});
