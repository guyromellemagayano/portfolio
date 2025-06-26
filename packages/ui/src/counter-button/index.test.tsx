import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  CounterButton,
  type CounterButtonProps,
  MemoizedCounterButton,
} from ".";

// Mock analytics
const mockGtag = vi.fn();
Object.defineProperty(window, "gtag", {
  value: mockGtag,
  writable: true,
});

describe("CounterButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps: CounterButtonProps = {
    label: "Test Counter",
  };

  describe("Basic Functionality", () => {
    it("renders with default props", () => {
      render(<CounterButton {...defaultProps} />);

      const button = screen.getByRole("button", { name: /test counter: 0/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Count: 0");
    });

    it("renders with initial value", () => {
      render(<CounterButton {...defaultProps} initialValue={5} />);

      const button = screen.getByRole("button", { name: /test counter: 5/i });
      expect(button).toHaveTextContent("Count: 5");
    });

    it("increments count on click", async () => {
      const user = userEvent.setup();
      render(<CounterButton {...defaultProps} />);

      const button = screen.getByRole("button");

      await user.click(button);
      expect(button).toHaveTextContent("Count: 1");

      await user.click(button);
      expect(button).toHaveTextContent("Count: 2");
    });

    it("calls onCountChange when count changes", async () => {
      const user = userEvent.setup();
      const onCountChange = vi.fn();
      render(<CounterButton {...defaultProps} onCountChange={onCountChange} />);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(onCountChange).toHaveBeenCalledWith(1);
    });
  });

  describe("Min/Max Constraints", () => {
    it("respects maximum value", async () => {
      const user = userEvent.setup();
      render(<CounterButton {...defaultProps} max={2} />);

      const button = screen.getByRole("button");

      await user.click(button); // 1
      await user.click(button); // 2
      await user.click(button); // Should stay at 2

      expect(button).toHaveTextContent("Count: 2");
      expect(button).toBeDisabled();
    });

    it("respects minimum value with negative step", async () => {
      const user = userEvent.setup();
      render(
        <CounterButton {...defaultProps} initialValue={2} min={0} step={-1} />
      );

      const button = screen.getByRole("button");

      await user.click(button); // 1
      await user.click(button); // 0
      await user.click(button); // Should stay at 0

      expect(button).toHaveTextContent("Count: 0");
      expect(button).toBeDisabled();
    });

    it("handles custom step increments", async () => {
      const user = userEvent.setup();
      render(<CounterButton {...defaultProps} step={5} />);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(button).toHaveTextContent("Count: 5");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<CounterButton {...defaultProps} />);

      const button = screen.getByRole("button");
      const label = screen.getByText("Test Counter");
      const description = screen.getByText(/current value: 0/i);

      expect(button).toHaveAttribute("aria-label", "Test Counter: 0");
      expect(button).toHaveAttribute("aria-describedby");
      expect(label).toHaveAttribute("for");
      expect(description).toBeInTheDocument();
    });

    it("supports custom aria-label", () => {
      render(<CounterButton {...defaultProps} aria-label="Custom label" />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Custom label");
    });

    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<CounterButton {...defaultProps} />);

      const button = screen.getByRole("button");

      await user.tab();
      expect(button).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(button).toHaveTextContent("Count: 1");

      await user.keyboard(" ");
      expect(button).toHaveTextContent("Count: 2");
    });
  });

  describe("Styling and Variants", () => {
    it("applies variant classes", () => {
      render(<CounterButton {...defaultProps} variant="secondary" />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("counter-button--secondary");
    });

    it("applies size classes", () => {
      render(<CounterButton {...defaultProps} size="large" />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("counter-button--large");
    });

    it("applies custom className", () => {
      render(<CounterButton {...defaultProps} className="custom-class" />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("applies disabled state classes", () => {
      render(<CounterButton {...defaultProps} disabled />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("counter-button--disabled");
      expect(button).toBeDisabled();
    });
  });

  describe("Error Handling and Edge Cases", () => {
    it("handles disabled state", async () => {
      const user = userEvent.setup();
      const onCountChange = vi.fn();
      render(
        <CounterButton
          {...defaultProps}
          disabled
          onCountChange={onCountChange}
        />
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(onCountChange).not.toHaveBeenCalled();
      expect(button).toHaveTextContent("Count: 0");
    });

    it("displays min/max in description when provided", () => {
      render(<CounterButton {...defaultProps} min={0} max={10} />);

      const description = screen.getByText(
        /current value: 0, minimum: 0, maximum: 10/i
      );
      expect(description).toBeInTheDocument();
    });

    it("doesn't display default min/max values", () => {
      render(<CounterButton {...defaultProps} />);

      const description = screen.getByText("Current value: 0");
      expect(description).not.toHaveTextContent("minimum");
      expect(description).not.toHaveTextContent("maximum");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<CounterButton {...defaultProps} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe("BUTTON");
    });
  });

  describe("Memoization", () => {
    it("exports memoized version", () => {
      expect(MemoizedCounterButton).toBeDefined();

      render(<MemoizedCounterButton {...defaultProps} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("memoized version works correctly", () => {
      render(<MemoizedCounterButton {...defaultProps} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Count: 0");

      // Verify it's actually memoized by checking the component type
      expect(MemoizedCounterButton.$$typeof).toBeDefined();
    });
  });

  describe("Performance", () => {
    it("handles rapid clicks without issues", async () => {
      const user = userEvent.setup();
      const onCountChange = vi.fn();
      render(<CounterButton {...defaultProps} onCountChange={onCountChange} />);

      const button = screen.getByRole("button");

      // Simulate rapid clicking
      for (let i = 0; i < 10; i++) {
        await user.click(button);
      }

      expect(button).toHaveTextContent("Count: 10");
      expect(onCountChange).toHaveBeenCalledTimes(10);
    });
  });
});
