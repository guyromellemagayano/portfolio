// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 3 (60%+ coverage, happy path + basic validation)
// - Risk Tier: Presentational
// - Component Type: Presentational
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HeaderAvatar } from "../HeaderAvatar";

// Individual mocks for this test file

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

// Mock utility functions
vi.mock("@guyromellemagayano/utils", () => ({
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
      ...additionalProps,
    })
  ),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  isValidLink: vi.fn((href) => {
    if (!href) return false;
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    if (hrefString === "#" || hrefString === "") return false;
    return true;
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    if (!href) return { target: "_self" };
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    const isExternal = hrefString.startsWith("http");
    const shouldOpenNewTab =
      target === "_blank" || (isExternal && target !== "_self");
    return {
      target: shouldOpenNewTab ? "_blank" : "_self",
      rel: shouldOpenNewTab ? "noopener noreferrer" : undefined,
    };
  }),
}));

// Mock @web/lib
vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  AVATAR_COMPONENT_LABELS: {
    link: "/",
    src: "/src/images/avatar.jpg",
    home: "Home",
  },
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: vi.fn(({ children, href, className, ...props }) => {
    const React = require("react");
    return React.createElement(
      "a",
      {
        "data-testid": "next-link",
        href,
        className,
        ...props,
      },
      children
    );
  }),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: vi.fn(({ src, alt, ...props }) => {
    const React = require("react");
    return React.createElement("img", {
      src,
      alt,
      "data-testid": "next-image",
      ...props,
    });
  }),
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/about"),
}));

// Mock the web utils
vi.mock("@web/utils", () => ({
  isActivePath: vi.fn(() => true), // Always return true for testing
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  clamp: vi.fn((value, min, max) => Math.min(Math.max(value, min), max)),
}));

// Mock the useComponentId hook
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    id: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

// Mock the utils
vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn((id, suffix, debugMode, additionalProps = {}) => {
    const attributes: Record<string, string> = {};
    if (id && suffix) {
      attributes[`data-${suffix}-id`] = `${id}-${suffix}`;
      attributes["data-testid"] = `${id}-${suffix}-root`;
    }
    if (debugMode === true) {
      attributes["data-debug-mode"] = "true";
    }
    return { ...attributes, ...additionalProps };
  }),
  isRenderableContent: vi.fn((children) => {
    if (children == null) return false;
    if (typeof children === "string") return children.trim() !== "";
    if (Array.isArray(children))
      return children.some((child) => child != null && child !== "");
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => {
    if (content == null) return false;
    if (typeof content === "string") return content.trim() !== "";
    if (Array.isArray(content))
      return content.some((item) => item != null && item !== "");
    return true;
  }),
  hasValidContent: vi.fn((content) => {
    if (content == null) return false;
    if (typeof content === "string") return content.trim() !== "";
    if (Array.isArray(content))
      return content.some((item) => item != null && item !== "");
    return true;
  }),
  isValidLink: vi.fn((href) => {
    if (!href) return false;
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    if (hrefString === "#" || hrefString === "") return false;
    return true;
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    if (!href) return { target: "_self" };
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    const isExternal = hrefString.startsWith("http");
    const shouldOpenNewTab =
      target === "_blank" || (isExternal && target !== "_self");
    return {
      target: shouldOpenNewTab ? "_blank" : "_self",
      rel: shouldOpenNewTab ? "noopener noreferrer" : undefined,
    };
  }),
  isValidImageSrc: vi.fn((src) => {
    if (!src) return false;
    if (typeof src === "string") {
      const trimmed = src.trim();
      if (trimmed === "" || trimmed === "#") return false;
      if (trimmed.startsWith("data:")) return true;
      if (trimmed.startsWith("/")) return true; // Allow relative paths
      try {
        new URL(trimmed);
        return true;
      } catch {
        return false;
      }
    }
    if (typeof src === "object" && src.src) {
      return typeof src.src === "string" && src.src.trim() !== "";
    }
    return false;
  }),
}));

// Mock the Header data
vi.mock("../../../_data", () => ({
  AVATAR_COMPONENT_LABELS: {
    home: "Home",
    link: "/",
    alt: "Guy Romelle Magayano",
    src: "/avatar.jpg",
  },
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: React.forwardRef<HTMLImageElement, any>(
    function MockNextImage(props, ref) {
      const { src, alt, priority, sizes, className, ...rest } = props;
      return React.createElement("img", {
        ref,
        src: typeof src === "string" ? src : src.src,
        alt,
        sizes,
        className,
        "data-testid": "next-image",
        "data-priority": priority ? "true" : "false",
        ...rest,
      });
    }
  ),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: React.forwardRef<HTMLAnchorElement, any>(
    function MockNextLink(props, ref) {
      const { children, href, className, ...rest } = props;
      return React.createElement(
        "a",
        {
          ref,
          href,
          className,
          "data-testid": "next-link",
          ...rest,
        },
        children
      );
    }
  ),
}));

// Mock the CSS module
vi.mock("../HeaderAvatar.module.css", () => ({
  default: {
    avatarLink: "_avatarLink_2f8a1b",
    avatarImage: "_avatarImage_2f8a1b",
    avatarImageDefault: "_avatarImageDefault_2f8a1b",
    avatarImageLarge: "_avatarImageLarge_2f8a1b",
  },
}));

describe("HeaderAvatar", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<HeaderAvatar />);
      expect(
        screen.getByTestId("test-id-header-avatar-link-root")
      ).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderAvatar />);
      const avatar = screen.getByTestId("test-id-header-avatar-link-root");
      expect(avatar).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<HeaderAvatar className="custom-class" />);
      const avatar = screen.getByTestId("test-id-header-avatar-link-root");
      expect(avatar).toHaveClass("custom-class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided internalId when available", () => {
      render(<HeaderAvatar debugId="custom-id" />);

      const avatar = screen.getByTestId("custom-id-header-avatar-link-root");
      expect(avatar).toBeInTheDocument();
    });

    it("uses provided debugId when available", () => {
      render(<HeaderAvatar debugId="test-id" />);

      const avatar = screen.getByTestId("test-id-header-avatar-link-root");
      expect(avatar).toBeInTheDocument();
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(<HeaderAvatar debugMode={true} />);

      const avatar = screen.getByTestId("test-id-header-avatar-link-root");
      expect(avatar).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<HeaderAvatar debugMode={false} />);

      const avatar = screen.getByTestId("test-id-header-avatar-link-root");
      expect(avatar).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<HeaderAvatar />);

      const avatar = screen.getByTestId("test-id-header-avatar-link-root");
      expect(avatar).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Avatar Sizing", () => {
    it("renders with default size when large is false", () => {
      render(<HeaderAvatar large={false} />);

      const image = screen.getByTestId("test-id-header-avatar-img-root");
      expect(image).toHaveAttribute("sizes", "2.25rem");
    });

    it("renders with large size when large is true", () => {
      render(<HeaderAvatar large={true} />);

      const image = screen.getByTestId("test-id-header-avatar-img-root");
      expect(image).toHaveAttribute("sizes", "4rem");
    });

    it("applies correct CSS classes for default size", () => {
      render(<HeaderAvatar large={false} />);

      const image = screen.getByTestId("test-id-header-avatar-img-root");
      expect(image).toHaveClass(
        "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-9 w-9"
      );
    });

    it("applies correct CSS classes for large size", () => {
      render(<HeaderAvatar large={true} />);

      const image = screen.getByTestId("test-id-header-avatar-img-root");
      expect(image).toHaveClass(
        "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-16 w-16"
      );
    });
  });

  describe("Link Properties", () => {
    it("uses default href when not provided", () => {
      render(<HeaderAvatar />);

      const link = screen.getByTestId("test-id-header-avatar-link-root");
      expect(link).toHaveAttribute("href", "/");
    });

    it("uses custom href when provided", () => {
      render(<HeaderAvatar href="/custom" />);

      const link = screen.getByTestId("test-id-header-avatar-link-root");
      expect(link).toHaveAttribute("href", "/custom");
    });

    it("applies aria-label for accessibility", () => {
      render(<HeaderAvatar />);

      const link = screen.getByTestId("test-id-header-avatar-link-root");
      expect(link).toHaveAttribute("aria-label", "Home");
    });

    it("passes through other link props", () => {
      render(<HeaderAvatar target="_blank" rel="noopener" />);

      const link = screen.getByTestId("test-id-header-avatar-link-root");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Image Properties", () => {
    it("uses default src when not provided", () => {
      render(<HeaderAvatar />);

      const image = screen.getByTestId("test-id-header-avatar-img-root");
      expect(image).toHaveAttribute("src", "/src/images/avatar.jpg");
    });

    it("uses custom src when provided", () => {
      render(<HeaderAvatar src="/custom-avatar.jpg" />);

      const image = screen.getByTestId("test-id-header-avatar-img-root");
      expect(image).toHaveAttribute("src", "/custom-avatar.jpg");
    });

    it("uses default alt when not provided", () => {
      render(<HeaderAvatar />);

      const image = screen.getByTestId("test-id-header-avatar-img-root");
      expect(image).toHaveAttribute("alt", "Guy Romelle Magayano");
    });

    it("uses custom alt when provided", () => {
      render(<HeaderAvatar alt="Custom alt text" />);

      const image = screen.getByTestId("test-id-header-avatar-img-root");
      expect(image).toHaveAttribute("alt", "Custom alt text");
    });

    it("applies priority loading", () => {
      render(<HeaderAvatar />);

      const image = screen.getByTestId("test-id-header-avatar-img-root");
      expect(image).toHaveAttribute("data-priority", "true");
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<HeaderAvatar />);

      expect(
        screen.getByTestId("test-id-header-avatar-link-root")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-header-avatar-img-root")
      ).toBeInTheDocument();
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderAvatar />);

      const link = screen.getByTestId("test-id-header-avatar-link-root");
      const image = screen.getByTestId("test-id-header-avatar-img-root");
      expect(link.tagName).toBe("A");
      expect(image.tagName).toBe("IMG");
    });

    it("renders image inside link", () => {
      render(<HeaderAvatar />);

      const link = screen.getByTestId("test-id-header-avatar-link-root");
      const image = screen.getByTestId("test-id-header-avatar-img-root");
      expect(link).toContainElement(image);
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the link component", () => {
      const ref = vi.fn();
      render(<HeaderAvatar ref={ref} />);

      expect(ref).toHaveBeenCalled();
    });

    it("forwards ref with correct element", () => {
      const ref = vi.fn();
      render(<HeaderAvatar ref={ref} />);

      const link = screen.getByTestId("test-id-header-avatar-link-root");
      expect(ref).toHaveBeenCalledWith(link);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<HeaderAvatar />);

      const link = screen.getByTestId("test-id-header-avatar-link-root");
      const image = screen.getByTestId("test-id-header-avatar-img-root");

      expect(link).toHaveAttribute("aria-label", "Home");
      expect(image).toHaveAttribute("alt", "Guy Romelle Magayano");
    });

    it("passes through aria attributes", () => {
      render(<HeaderAvatar aria-describedby="description" />);

      const link = screen.getByTestId("test-id-header-avatar-link-root");
      expect(link).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<HeaderAvatar />);

      const link = screen.getByTestId("test-id-header-avatar-link-root");
      expect(link).toHaveClass("pointer-events-auto");
    });

    it("combines custom className with CSS module classes", () => {
      render(<HeaderAvatar className="custom-class" />);

      const link = screen.getByTestId("test-id-header-avatar-link-root");
      expect(link).toHaveClass("pointer-events-auto", "custom-class");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(<HeaderAvatar />);

      const initialAvatar = screen.getByTestId(
        "test-id-header-avatar-link-root"
      );

      rerender(<HeaderAvatar />);

      const updatedAvatar = screen.getByTestId(
        "test-id-header-avatar-link-root"
      );
      expect(updatedAvatar).toBe(initialAvatar);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(<HeaderAvatar />);

      rerender(<HeaderAvatar className="new-class" />);

      const avatar = screen.getByTestId("test-id-header-avatar-link-root");
      expect(avatar).toHaveClass("new-class");
    });
  });

  describe("Memoization", () => {
    it("renders base component when isMemoized is false", () => {
      render(<HeaderAvatar isMemoized={false} />);
      expect(
        screen.getByTestId("test-id-header-avatar-link-root")
      ).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(<HeaderAvatar isMemoized={true} />);
      expect(
        screen.getByTestId("test-id-header-avatar-link-root")
      ).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex prop combinations", () => {
      render(
        <HeaderAvatar
          className="custom-class"
          debugId="custom-id"
          debugMode={true}
          href="/custom"
          target="_blank"
          alt="Custom alt"
          src="/custom-avatar.jpg"
          large={true}
        />
      );

      const avatar = screen.getByTestId("custom-id-header-avatar-link-root");
      const image = screen.getByTestId("custom-id-header-avatar-img-root");

      expect(avatar).toHaveClass("custom-class");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("data-debug-mode", "true");
      expect(avatar).toHaveAttribute("href", "/custom");
      expect(avatar).toHaveAttribute("target", "_blank");
      expect(image).toHaveAttribute("alt", "Custom alt");
      expect(image).toHaveAttribute("src", "/custom-avatar.jpg");
      expect(image).toHaveAttribute("sizes", "4rem");
    });

    it("handles undefined props gracefully", () => {
      render(
        <HeaderAvatar
          href={undefined}
          alt={undefined}
          src={undefined}
          large={undefined}
        />
      );

      const avatar = screen.getByTestId("test-id-header-avatar-link-root");
      const image = screen.getByTestId("test-id-header-avatar-img-root");

      expect(avatar).toHaveAttribute("href", "/");
      expect(image).toHaveAttribute("alt", "Guy Romelle Magayano");
      expect(image).toHaveAttribute("src", "/src/images/avatar.jpg");
      expect(image).toHaveAttribute("sizes", "2.25rem");
    });
  });

  describe("Validation Logic", () => {
    it("uses default src when src is invalid", () => {
      render(<HeaderAvatar src="" />);

      const link = screen.getByRole("link");
      const image = screen.getByTestId("test-id-header-avatar-img-root");
      expect(link).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/src/images/avatar.jpg");
    });

    it("uses default src when src is null", () => {
      render(<HeaderAvatar src={null as any} />);

      const link = screen.getByRole("link");
      const image = screen.getByTestId("test-id-header-avatar-img-root");
      expect(link).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/src/images/avatar.jpg");
    });

    it("renders with default src when src is undefined", () => {
      render(<HeaderAvatar src={undefined} />);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      // Should use default src from AVATAR_COMPONENT_LABELS
    });

    it("uses default href when href is invalid", () => {
      render(<HeaderAvatar href="" />);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/");
    });

    it("uses default href when href is null", () => {
      render(<HeaderAvatar href={null as any} />);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/");
    });

    it("renders with default href when href is undefined", () => {
      render(<HeaderAvatar href={undefined} />);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      // Should use default href from AVATAR_COMPONENT_LABELS
    });

    it("uses default href when href is a placeholder", () => {
      render(<HeaderAvatar href="#" />);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/");
    });

    it("renders when both src and href are valid", () => {
      render(<HeaderAvatar src="/valid-avatar.jpg" href="/valid-link" />);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/valid-link");
    });

    it("renders with StaticImageData object", () => {
      const mockStaticImageData = {
        src: "/avatar.jpg",
        height: 100,
        width: 100,
      };

      render(<HeaderAvatar src={mockStaticImageData as any} href="/" />);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
    });

    it("uses default src when StaticImageData has invalid src", () => {
      const mockStaticImageData = {
        src: "",
        height: 100,
        width: 100,
      };

      render(<HeaderAvatar src={mockStaticImageData as any} href="/" />);

      const link = screen.getByRole("link");
      const image = screen.getByTestId("test-id-header-avatar-img-root");
      expect(link).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/src/images/avatar.jpg");
    });
  });
});
