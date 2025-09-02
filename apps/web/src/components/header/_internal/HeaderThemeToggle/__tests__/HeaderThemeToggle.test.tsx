import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HeaderThemeToggle } from "../HeaderThemeToggle";

// Mock the hooks
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
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: vi.fn(() => ({
    resolvedTheme: "light",
    setTheme: vi.fn(),
  })),
}));

// Mock the Icon component
vi.mock("@web/components/icon", () => ({
  Icon: {
    Sun: ({ className, ...props }: any) => (
      <svg data-testid="sun-icon" className={className} {...props} />
    ),
    Moon: ({ className, ...props }: any) => (
      <svg data-testid="moon-icon" className={className} {...props} />
    ),
  },
}));

// Mock the data
vi.mock("../../../_data", () => ({
  THEME_TOGGLE_LABELS: {
    toggleTheme: "Toggle theme",
  },
}));

// Mock CSS modules
vi.mock("../HeaderThemeToggle.module.css", () => ({
  default: {
    headerThemeToggleButton: "header-theme-toggle-button",
    headerThemeToggleSunIcon: "header-theme-toggle-sun-icon",
    headerThemeToggleMoonIcon: "header-theme-toggle-moon-icon",
  },
}));

describe("HeaderThemeToggle", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<HeaderThemeToggle />);
      expect(
        screen.getByTestId("header-theme-toggle-root")
      ).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderThemeToggle />);
      const button = screen.getByTestId("header-theme-toggle-root");
      expect(button).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<HeaderThemeToggle className="custom-class" />);
      const button = screen.getByTestId("header-theme-toggle-root");
      expect(button).toHaveClass("custom-class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided internalId when available", () => {
      render(<HeaderThemeToggle _internalId="custom-id" />);

      const button = screen.getByTestId("header-theme-toggle-root");
      expect(button).toHaveAttribute(
        "data-header-theme-toggle-id",
        "custom-id-header-theme-toggle"
      );
    });

    it("uses provided _internalId when available", () => {
      render(<HeaderThemeToggle _internalId="test-id" />);

      const button = screen.getByTestId("header-theme-toggle-root");
      expect(button).toHaveAttribute(
        "data-header-theme-toggle-id",
        "test-id-header-theme-toggle"
      );
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(<HeaderThemeToggle _debugMode={true} />);

      const button = screen.getByTestId("header-theme-toggle-root");
      expect(button).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<HeaderThemeToggle debugMode={false} />);

      const button = screen.getByTestId("header-theme-toggle-root");
      expect(button).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<HeaderThemeToggle />);

      const button = screen.getByTestId("header-theme-toggle-root");
      expect(button).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Theme Icons", () => {
    it("renders sun icon", () => {
      render(<HeaderThemeToggle />);

      expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
    });

    it("renders moon icon", () => {
      render(<HeaderThemeToggle />);

      expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
    });

    it("applies correct CSS classes to icons", () => {
      render(<HeaderThemeToggle />);

      const sunIcon = screen.getByTestId("sun-icon");
      const moonIcon = screen.getByTestId("moon-icon");

      expect(sunIcon).toHaveClass("header-theme-toggle-sun-icon");
      expect(moonIcon).toHaveClass("header-theme-toggle-moon-icon");
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<HeaderThemeToggle />);

      expect(
        screen.getByTestId("header-theme-toggle-root")
      ).toBeInTheDocument();
      expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
      expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderThemeToggle />);

      const button = screen.getByTestId("header-theme-toggle-root");
      expect(button.tagName).toBe("BUTTON");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the button component", () => {
      const ref = vi.fn();
      render(<HeaderThemeToggle ref={ref} />);

      expect(ref).toHaveBeenCalled();
    });

    it("forwards ref with correct element", () => {
      const ref = vi.fn();
      render(<HeaderThemeToggle ref={ref} />);

      const button = screen.getByTestId("header-theme-toggle-root");
      expect(ref).toHaveBeenCalledWith(button);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<HeaderThemeToggle />);

      const button = screen.getByTestId("header-theme-toggle-root");
      expect(button).toHaveAttribute("aria-label");
    });

    it("passes through aria attributes", () => {
      render(<HeaderThemeToggle aria-describedby="description" />);

      const button = screen.getByTestId("header-theme-toggle-root");
      expect(button).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<HeaderThemeToggle />);

      const button = screen.getByTestId("header-theme-toggle-root");
      expect(button).toHaveClass("header-theme-toggle-button");
    });

    it("combines custom className with CSS module classes", () => {
      render(<HeaderThemeToggle className="custom-class" />);

      const button = screen.getByTestId("header-theme-toggle-root");
      expect(button).toHaveClass("header-theme-toggle-button", "custom-class");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(<HeaderThemeToggle />);

      const initialButton = screen.getByTestId("header-theme-toggle-root");

      rerender(<HeaderThemeToggle />);

      const updatedButton = screen.getByTestId("header-theme-toggle-root");
      expect(updatedButton).toBe(initialButton);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(<HeaderThemeToggle />);

      rerender(<HeaderThemeToggle className="new-class" />);

      const button = screen.getByTestId("header-theme-toggle-root");
      expect(button).toHaveClass("new-class");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex prop combinations", () => {
      render(
        <HeaderThemeToggle
          className="custom-class"
          _internalId="test-id"
          _debugMode={true}
          aria-label="Custom theme toggle"
        />
      );

      const button = screen.getByTestId("header-theme-toggle-root");
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("custom-class");
      expect(button).toHaveAttribute(
        "data-header-theme-toggle-id",
        "test-id-header-theme-toggle"
      );
      expect(button).toHaveAttribute("data-debug-mode", "true");
      // Component overrides aria-label with computed theme value
      expect(button).toHaveAttribute("aria-label", "Switch to dark theme");
    });
  });
});
