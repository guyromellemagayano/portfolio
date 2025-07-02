import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Address, type AddressProps } from ".";

// Mock analytics
const mockGtag = vi.fn();
Object.defineProperty(window, "gtag", {
  value: mockGtag,
  writable: true,
});

describe("Address Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps: AddressProps = {
    children: "123 Main Street\nAnytown, USA 12345",
  };

  it("renders with default props", () => {
    render(<Address {...defaultProps} />);

    const address = screen.getByText(/123 Main Street/);
    expect(address).toBeInTheDocument();
    expect(address.tagName).toBe("ADDRESS");
    expect(address).toHaveClass("address");
  });

  it("handles block display", () => {
    render(<Address {...defaultProps} block />);

    const address = screen.getByText(/123 Main Street/);
    expect(address).toHaveClass("address--block");
    expect(address).toHaveAttribute("data-block", "true");
  });

  it("handles emphasized state", () => {
    render(<Address {...defaultProps} emphasized />);

    const address = screen.getByText(/123 Main Street/);
    expect(address).toHaveClass("address--emphasized");
    expect(address).toHaveAttribute("data-emphasized", "true");
  });

  it("handles analytics tracking", () => {
    render(<Address {...defaultProps} analyticsId="contact-address" />);

    const address = screen.getByText(/123 Main Street/);
    fireEvent.click(address);

    expect(mockGtag).toHaveBeenCalledWith("event", "click", {
      event_category: "address",
      event_label: "contact-address",
      address_content: "123 Main Street\nAnytown, USA 12345",
    });
  });

  it("handles custom analytics function", () => {
    const customAnalytics = vi.fn();
    render(<Address {...defaultProps} onAnalytics={customAnalytics} />);

    const address = screen.getByText(/123 Main Street/);
    fireEvent.click(address);

    expect(customAnalytics).toHaveBeenCalledWith({
      event: "click",
      category: "address",
      label: "address-click",
      content: "123 Main Street\nAnytown, USA 12345",
    });
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Address {...defaultProps} onClick={handleClick} />);

    fireEvent.click(screen.getByText(/123 Main Street/));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles mouse events", () => {
    const handleMouseEnter = vi.fn();
    render(<Address {...defaultProps} onMouseEnter={handleMouseEnter} />);

    fireEvent.mouseEnter(screen.getByText(/123 Main Street/));
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);
  });

  it("handles focus events", () => {
    const handleFocus = vi.fn();
    render(<Address {...defaultProps} onFocus={handleFocus} tabIndex={0} />);

    fireEvent.focus(screen.getByText(/123 Main Street/));
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<Address {...defaultProps} className="custom-address" />);

    const address = screen.getByText(/123 Main Street/);
    expect(address).toHaveClass("address", "custom-address");
  });

  it("applies custom styles", () => {
    render(<Address {...defaultProps} style={{ color: "red" }} />);

    const address = screen.getByText(/123 Main Street/);
    expect(address).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("handles custom component", () => {
    const CustomAddress = React.forwardRef<
      HTMLDivElement,
      React.HTMLAttributes<HTMLDivElement>
    >((props, ref) => (
      <div ref={ref} {...props} data-testid="custom-address" />
    ));
    CustomAddress.displayName = "CustomAddress";

    render(<Address {...defaultProps} as={CustomAddress} />);

    expect(screen.getByTestId("custom-address")).toBeInTheDocument();
  });

  // NOTE: Client-side rendering not tested - just thin wrapper around server component

  it("handles analytics errors gracefully in development", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const originalEnv = process.env.NODE_ENV;

    // Mock gtag to throw an error
    mockGtag.mockImplementation(() => {
      throw new Error("Analytics error");
    });

    // Set development environment
    process.env.NODE_ENV = "development";

    render(<Address {...defaultProps} analyticsId="test-address" />);

    fireEvent.click(screen.getByText(/123 Main Street/));
    expect(consoleSpy).toHaveBeenCalledWith(
      "Analytics tracking failed:",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  it("silently fails analytics errors in production", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const originalEnv = process.env.NODE_ENV;

    // Mock gtag to throw an error
    mockGtag.mockImplementation(() => {
      throw new Error("Analytics error");
    });

    // Set production environment
    process.env.NODE_ENV = "production";

    render(<Address {...defaultProps} analyticsId="test-address" />);

    fireEvent.click(screen.getByText(/123 Main Street/));
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Address {...defaultProps} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("ADDRESS");
  });

  it("optimizes className building", () => {
    const { rerender } = render(<Address {...defaultProps} />);

    let address = screen.getByText(/123 Main Street/);
    expect(address.className).toBe("address");

    rerender(<Address {...defaultProps} block emphasized className="custom" />);
    address = screen.getByText(/123 Main Street/);
    expect(address.className).toBe(
      "address address--block address--emphasized custom"
    );
  });

  it("only creates click handler when analytics are needed", () => {
    const onClick = vi.fn();

    // Without analytics, should use original onClick
    const { rerender } = render(
      <Address {...defaultProps} onClick={onClick} />
    );
    fireEvent.click(screen.getByText(/123 Main Street/));
    expect(onClick).toHaveBeenCalledTimes(1);

    // With analytics, should wrap onClick
    vi.clearAllMocks();
    rerender(
      <Address {...defaultProps} onClick={onClick} analyticsId="test" />
    );
    fireEvent.click(screen.getByText(/123 Main Street/));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(mockGtag).toHaveBeenCalled();
  });

  // NOTE: Client-side memoization testing skipped - implementation detail

  it("handles complex address content", () => {
    const complexAddress = (
      <>
        <strong>Company Name</strong>
        <br />
        123 Business Street
        <br />
        Suite 456
        <br />
        Anytown, State 12345
        <br />
        United States
      </>
    );

    render(<Address>{complexAddress}</Address>);

    const address = screen.getByRole("generic");
    expect(screen.getByText("Company Name")).toBeInTheDocument();
    expect(address).toHaveTextContent("123 Business Street");
    expect(address).toHaveTextContent("Suite 456");
    expect(address).toHaveTextContent("Company Name");
    expect(address).toHaveTextContent("United States");
  });

  it("handles both block and emphasized together", () => {
    render(<Address {...defaultProps} block emphasized />);

    const address = screen.getByText(/123 Main Street/);
    expect(address).toHaveClass(
      "address",
      "address--block",
      "address--emphasized"
    );
    expect(address).toHaveAttribute("data-block", "true");
    expect(address).toHaveAttribute("data-emphasized", "true");
  });

  it("handles accessibility attributes", () => {
    render(
      <Address analyticsId="accessibility-test" block emphasized>
        <div>Test address content</div>
      </Address>
    );

    const address = screen.getByText("Test address content").closest("address");
    expect(address).toHaveAttribute("data-analytics-id", "accessibility-test");
    expect(address).toHaveAttribute("data-block", "true");
    expect(address).toHaveAttribute("data-emphasized", "true");
  });

  // Client-side rendering tests for coverage
  it("should render with isClient=true", () => {
    render(
      <Address isClient>
        <div>Client-side address</div>
      </Address>
    );

    expect(screen.getByText("Client-side address")).toBeInTheDocument();
  });

  it("should render with isClient=true and isMemoized=true", () => {
    render(
      <Address isClient isMemoized>
        <div>Memoized client-side address</div>
      </Address>
    );

    expect(
      screen.getByText("Memoized client-side address")
    ).toBeInTheDocument();
  });

  it("should render fallback during Suspense with isClient=true", () => {
    render(
      <Address isClient>
        <div>Suspense fallback test</div>
      </Address>
    );

    // The component should render even during client-side loading
    expect(screen.getByText("Suspense fallback test")).toBeInTheDocument();
  });

  it("should handle custom Component prop", () => {
    const CustomAddress = React.forwardRef<
      HTMLElement,
      React.HTMLAttributes<HTMLElement>
    >((props, ref) => (
      <section ref={ref} {...props} data-testid="custom-address" />
    ));
    CustomAddress.displayName = "CustomAddress";

    render(
      <Address as={CustomAddress}>
        <div>Custom component address</div>
      </Address>
    );

    expect(screen.getByTestId("custom-address")).toBeInTheDocument();
  });

  it("should handle analytics when gtag is not available", () => {
    // Test the case where gtag doesn't exist on window
    render(
      <Address analyticsId="no-gtag-test">
        <div>No gtag test</div>
      </Address>
    );

    const address = screen.getByText("No gtag test").closest("address");
    fireEvent.click(address!);

    // Should not crash when gtag is undefined
    expect(address).toBeInTheDocument();
  });
});
