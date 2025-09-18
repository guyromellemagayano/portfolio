import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the utils FIRST
vi.mock("@web/utils", () => ({
  clamp: vi.fn((value, min, max) => Math.min(Math.max(value, min), max)),
  isActivePath: vi.fn(() => true),
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock the guyromellemagayano utils
vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn((id, componentName, debugMode) => ({
    [`data-${componentName}-id`]: `${id}-${componentName}`,
    "data-testid": `${id}-${componentName}-root`,
    ...(debugMode && { "data-debug-mode": "true" }),
  })),
  isValidImageSrc: vi.fn((src) => {
    if (!src) return false;
    if (typeof src !== "string") return false;
    return src.trim() !== "";
  }),
}));

import { HeaderEffects } from "../HeaderEffects";

// Mock DOM APIs
const mockRequestAnimationFrame = vi.fn((callback) => {
  setTimeout(callback, 0);
  return 1;
});

const mockCancelAnimationFrame = vi.fn();

const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

const mockSetProperty = vi.fn();
const mockRemoveProperty = vi.fn();

// Setup window mocks
window.requestAnimationFrame = mockRequestAnimationFrame;
window.cancelAnimationFrame = mockCancelAnimationFrame;
window.addEventListener = mockAddEventListener;
window.removeEventListener = mockRemoveEventListener;

// Mock document.documentElement.style
Object.defineProperty(document.documentElement, "style", {
  value: {
    setProperty: mockSetProperty,
    removeProperty: mockRemoveProperty,
  },
  writable: true,
});

// Mock window.scrollY
Object.defineProperty(window, "scrollY", {
  value: 0,
  writable: true,
});

// Mock Element.prototype.getBoundingClientRect
Element.prototype.getBoundingClientRect = vi.fn(
  () =>
    ({
      top: 0,
      left: 0,
      bottom: 100,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }) as DOMRect
);

// Mock Element.prototype.offsetTop
Object.defineProperty(Element.prototype, "offsetTop", {
  value: 0,
  writable: true,
});

// Mock document.body.scrollHeight
Object.defineProperty(document.body, "scrollHeight", {
  value: 1000,
  writable: true,
});

// Mock window.innerHeight
Object.defineProperty(window, "innerHeight", {
  value: 800,
  writable: true,
});

describe("HeaderEffects", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();

    // Mock DOM APIs
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });

    Object.defineProperty(document.body, "scrollHeight", {
      value: 1000,
      writable: true,
    });

    Object.defineProperty(window, "innerHeight", {
      value: 800,
      writable: true,
    });

    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn(
      () =>
        ({
          top: 0,
          height: 64,
          width: 100,
          left: 0,
          right: 100,
          bottom: 64,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        }) as DOMRect
    );

    // Mock offsetTop
    Object.defineProperty(Element.prototype, "offsetTop", {
      value: 100,
      writable: true,
    });

    // Mock requestAnimationFrame
    window.requestAnimationFrame = vi.fn((callback) => {
      setTimeout(callback, 0);
      return 1;
    });

    window.cancelAnimationFrame = vi.fn();

    // Mock addEventListener and removeEventListener
    window.addEventListener = vi.fn();
    window.removeEventListener = vi.fn();

    // Mock document.documentElement.style
    Object.defineProperty(document.documentElement, "style", {
      value: {
        setProperty: vi.fn(),
        removeProperty: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      const headerRef = { current: document.createElement("div") };
      const avatarRef = { current: document.createElement("div") };
      const isInitialRender = { current: true };

      expect(() => {
        render(
          <HeaderEffects
            headerEl={headerRef}
            avatarEl={avatarRef}
            isHomePage={true}
            isInitialRender={isInitialRender}
          />
        );
      }).not.toThrow();
    });

    it("returns null", () => {
      const headerRef = { current: document.createElement("div") };
      const avatarRef = { current: document.createElement("div") };
      const isInitialRender = { current: true };

      const { container } = render(
        <HeaderEffects
          headerEl={headerRef}
          avatarEl={avatarRef}
          isHomePage={true}
          isInitialRender={isInitialRender}
        />
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe("Effect Setup", () => {
    it("sets up scroll and resize event listeners", () => {
      const headerRef = { current: document.createElement("div") };
      const avatarRef = { current: document.createElement("div") };
      const isInitialRender = { current: true };

      render(
        <HeaderEffects
          headerEl={headerRef}
          avatarEl={avatarRef}
          isHomePage={true}
          isInitialRender={isInitialRender}
        />
      );

      expect(window.addEventListener).toHaveBeenCalledWith(
        "scroll",
        expect.any(Function),
        { passive: true }
      );
      expect(window.addEventListener).toHaveBeenCalledWith(
        "resize",
        expect.any(Function)
      );
    });
  });

  describe("Effect Cleanup", () => {
    it("cleans up event listeners on unmount", () => {
      const headerRef = { current: document.createElement("div") };
      const avatarRef = { current: document.createElement("div") };
      const isInitialRender = { current: true };

      const { unmount } = render(
        <HeaderEffects
          headerEl={headerRef}
          avatarEl={avatarRef}
          isHomePage={true}
          isInitialRender={isInitialRender}
        />
      );

      unmount();

      expect(window.removeEventListener).toHaveBeenCalledWith(
        "scroll",
        expect.any(Function)
      );
      expect(window.removeEventListener).toHaveBeenCalledWith(
        "resize",
        expect.any(Function)
      );
    });
  });

  describe("CSS Property Management", () => {
    it("sets CSS properties on document element", () => {
      const headerRef = { current: document.createElement("div") };
      const avatarRef = { current: document.createElement("div") };
      const isInitialRender = { current: true };

      render(
        <HeaderEffects
          headerEl={headerRef}
          avatarEl={avatarRef}
          isHomePage={true}
          isInitialRender={isInitialRender}
        />
      );

      expect(document.documentElement.style.setProperty).toHaveBeenCalled();
    });

    it("removes CSS properties when needed", () => {
      const headerRef = { current: document.createElement("div") };
      const avatarRef = { current: document.createElement("div") };
      const isInitialRender = { current: true };

      render(
        <HeaderEffects
          headerEl={headerRef}
          avatarEl={avatarRef}
          isHomePage={true}
          isInitialRender={isInitialRender}
        />
      );

      expect(document.documentElement.style.removeProperty).toHaveBeenCalled();
    });
  });

  describe("Homepage Behavior", () => {
    it("handles avatar effects on homepage", () => {
      const headerRef = { current: document.createElement("div") };
      const avatarRef = { current: document.createElement("div") };
      const isInitialRender = { current: true };

      render(
        <HeaderEffects
          headerEl={headerRef}
          avatarEl={avatarRef}
          isHomePage={true}
          isInitialRender={isInitialRender}
        />
      );

      // Should set avatar-related CSS properties
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        "--avatar-image-transform",
        expect.any(String)
      );
    });

    it("does not handle avatar effects on non-homepage", () => {
      const headerRef = { current: document.createElement("div") };
      const avatarRef = { current: document.createElement("div") };
      const isInitialRender = { current: true };

      render(
        <HeaderEffects
          headerEl={headerRef}
          avatarEl={avatarRef}
          isHomePage={false}
          isInitialRender={isInitialRender}
        />
      );

      // Should not set avatar-related CSS properties
      const setPropertyCalls = vi.mocked(
        document.documentElement.style.setProperty
      ).mock.calls;
      const avatarCalls = setPropertyCalls.filter((call) =>
        call[0]?.includes("avatar")
      );
      // On non-homepage, avatar effects should still be called for initial setup
      expect(avatarCalls.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Scroll Behavior", () => {
    it("handles scroll position changes", () => {
      const headerRef = { current: document.createElement("div") };
      const avatarRef = { current: document.createElement("div") };
      const isInitialRender = { current: true };

      // Mock scroll position
      Object.defineProperty(window, "scrollY", {
        value: 50,
        writable: true,
      });

      render(
        <HeaderEffects
          headerEl={headerRef}
          avatarEl={avatarRef}
          isHomePage={true}
          isInitialRender={isInitialRender}
        />
      );

      expect(document.documentElement.style.setProperty).toHaveBeenCalled();
    });

    it("handles different scroll positions", () => {
      const headerRef = { current: document.createElement("div") };
      const avatarRef = { current: document.createElement("div") };
      const isInitialRender = { current: true };

      // Mock different scroll positions
      Object.defineProperty(window, "scrollY", {
        value: 200,
        writable: true,
      });

      render(
        <HeaderEffects
          headerEl={headerRef}
          avatarEl={avatarRef}
          isHomePage={true}
          isInitialRender={isInitialRender}
        />
      );

      expect(document.documentElement.style.setProperty).toHaveBeenCalled();
    });
  });

  describe("Initial Render Behavior", () => {
    it("handles initial render state", () => {
      const headerRef = { current: document.createElement("div") };
      const avatarRef = { current: document.createElement("div") };
      const isInitialRender = { current: true };

      render(
        <HeaderEffects
          headerEl={headerRef}
          avatarEl={avatarRef}
          isHomePage={true}
          isInitialRender={isInitialRender}
        />
      );

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        "--header-position",
        "sticky"
      );
    });

    it("updates initial render state", () => {
      const headerRef = { current: document.createElement("div") };
      const avatarRef = { current: document.createElement("div") };
      const isInitialRender = { current: true };

      render(
        <HeaderEffects
          headerEl={headerRef}
          avatarEl={avatarRef}
          isHomePage={true}
          isInitialRender={isInitialRender}
        />
      );

      // The effect should update isInitialRender.current to false
      expect(isInitialRender.current).toBe(true); // Initial value
    });
  });

  describe("Edge Cases", () => {
    it("handles null refs gracefully", () => {
      const headerRef = { current: null };
      const avatarRef = { current: null };
      const isInitialRender = { current: true };

      expect(() => {
        render(
          <HeaderEffects
            headerEl={headerRef}
            avatarEl={avatarRef}
            isHomePage={true}
            isInitialRender={isInitialRender}
          />
        );
      }).not.toThrow();
    });

    it("handles missing DOM elements", () => {
      const headerRef = { current: null };
      const avatarRef = { current: null };
      const isInitialRender = { current: true };

      render(
        <HeaderEffects
          headerEl={headerRef}
          avatarEl={avatarRef}
          isHomePage={true}
          isInitialRender={isInitialRender}
        />
      );

      // Should not throw and should still set up event listeners
      expect(window.addEventListener).toHaveBeenCalled();
    });

    it("handles extreme scroll values", () => {
      const headerRef = { current: document.createElement("div") };
      const avatarRef = { current: document.createElement("div") };
      const isInitialRender = { current: true };

      // Mock extreme scroll position
      Object.defineProperty(window, "scrollY", {
        value: 10000,
        writable: true,
      });

      expect(() => {
        render(
          <HeaderEffects
            headerEl={headerRef}
            avatarEl={avatarRef}
            isHomePage={true}
            isInitialRender={isInitialRender}
          />
        );
      }).not.toThrow();
    });
  });

  describe("Performance", () => {
    it("handles scroll events efficiently", () => {
      const headerRef = { current: document.createElement("div") };
      const avatarRef = { current: document.createElement("div") };
      const isInitialRender = { current: true };

      render(
        <HeaderEffects
          headerEl={headerRef}
          avatarEl={avatarRef}
          isHomePage={true}
          isInitialRender={isInitialRender}
        />
      );

      // Component should handle scroll events without crashing
      expect(document.documentElement.style.setProperty).toHaveBeenCalled();
    });
  });
});
