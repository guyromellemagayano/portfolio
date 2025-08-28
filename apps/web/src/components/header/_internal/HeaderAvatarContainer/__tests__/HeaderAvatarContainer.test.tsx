import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HeaderAvatarContainer } from "../HeaderAvatarContainer";

// Mock the useComponentId hook
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

// Mock the utils
vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

// Mock the cn helper
vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock the CSS module
vi.mock("../HeaderAvatarContainer.module.css", () => ({
  default: {
    avatarContainer: "avatar-container",
  },
}));

describe("HeaderAvatarContainer", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<HeaderAvatarContainer />);
      expect(
        screen.getByTestId("header-avatar-container-root")
      ).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderAvatarContainer />);
      const container = screen.getByTestId("header-avatar-container-root");
      expect(container).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<HeaderAvatarContainer className="custom-class" />);
      const container = screen.getByTestId("header-avatar-container-root");
      expect(container).toHaveClass("custom-class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided internalId when available", () => {
      render(<HeaderAvatarContainer internalId="custom-id" />);

      const container = screen.getByTestId("header-avatar-container-root");
      expect(container).toHaveAttribute(
        "data-header-avatar-container-id",
        "custom-id"
      );
    });

    it("generates ID when internalId is not provided", () => {
      render(<HeaderAvatarContainer />);

      const container = screen.getByTestId("header-avatar-container-root");
      expect(container).toHaveAttribute(
        "data-header-avatar-container-id",
        "test-id"
      );
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(<HeaderAvatarContainer debugMode={true} />);

      const container = screen.getByTestId("header-avatar-container-root");
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<HeaderAvatarContainer debugMode={false} />);

      const container = screen.getByTestId("header-avatar-container-root");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<HeaderAvatarContainer />);

      const container = screen.getByTestId("header-avatar-container-root");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<HeaderAvatarContainer />);

      const container = screen.getByTestId("header-avatar-container-root");
      expect(container.tagName).toBe("DIV");
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderAvatarContainer />);

      const container = screen.getByTestId("header-avatar-container-root");
      expect(container).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the container component", () => {
      const ref = vi.fn();
      render(<HeaderAvatarContainer ref={ref} />);

      expect(ref).toHaveBeenCalled();
    });

    it("forwards ref with correct element", () => {
      const ref = vi.fn();
      render(<HeaderAvatarContainer ref={ref} />);

      const container = screen.getByTestId("header-avatar-container-root");
      expect(ref).toHaveBeenCalledWith(container);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<HeaderAvatarContainer />);

      const container = screen.getByTestId("header-avatar-container-root");
      expect(container).toBeInTheDocument();
    });

    it("passes through aria attributes", () => {
      render(
        <HeaderAvatarContainer aria-label="Avatar container" role="img" />
      );

      const container = screen.getByTestId("header-avatar-container-root");
      expect(container).toHaveAttribute("aria-label", "Avatar container");
      expect(container).toHaveAttribute("role", "img");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<HeaderAvatarContainer />);

      const container = screen.getByTestId("header-avatar-container-root");
      expect(container).toHaveClass("avatar-container");
    });

    it("combines custom className with CSS module classes", () => {
      render(<HeaderAvatarContainer className="custom-class" />);

      const container = screen.getByTestId("header-avatar-container-root");
      expect(container).toHaveClass("avatar-container", "custom-class");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(<HeaderAvatarContainer />);

      const initialContainer = screen.getByTestId(
        "header-avatar-container-root"
      );

      rerender(<HeaderAvatarContainer />);

      const updatedContainer = screen.getByTestId(
        "header-avatar-container-root"
      );
      expect(updatedContainer).toBe(initialContainer);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(<HeaderAvatarContainer />);

      rerender(<HeaderAvatarContainer className="new-class" />);

      const container = screen.getByTestId("header-avatar-container-root");
      expect(container).toHaveClass("new-class");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex prop combinations", () => {
      render(
        <HeaderAvatarContainer
          className="custom-class"
          internalId="custom-id"
          debugMode={true}
          aria-label="Test container"
          data-testid="custom-testid"
        />
      );

      const container = screen.getByTestId("header-avatar-container-root");
      expect(container).toHaveClass("custom-class");
      expect(container).toHaveAttribute(
        "data-header-avatar-container-id",
        "custom-id"
      );
      expect(container).toHaveAttribute("data-debug-mode", "true");
      expect(container).toHaveAttribute("aria-label", "Test container");
    });
  });
});
