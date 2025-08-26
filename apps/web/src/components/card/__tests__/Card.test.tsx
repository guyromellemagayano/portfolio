import { cleanup, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { Card } from "../Card";

// Mock CSS modules
vi.mock("../Card.module.css", () => ({
  default: {
    card: "card",
  },
}));

describe("Card", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children correctly", () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>
    );

    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Card className="custom-class">
        <div>Card content</div>
      </Card>
    );

    const card = screen.getByTestId("card-root");
    expect(card).toHaveClass("custom-class");
  });

  it("renders with debug mode enabled", () => {
    render(<Card debugMode>Card content</Card>);

    const card = screen.getByTestId("card-root");
    expect(card).toHaveAttribute("data-debug-mode", "true");
  });

  it("renders with custom internal ID", () => {
    render(<Card internalId="custom-id">Card content</Card>);

    const card = screen.getByTestId("card-root");
    expect(card).toHaveAttribute("data-card-id", "custom-id");
  });

  it("renders server-side by default", () => {
    render(
      <Card>
        <div>Server rendered card</div>
      </Card>
    );

    expect(screen.getByText("Server rendered card")).toBeInTheDocument();
  });

  it("renders client-side when isClient is true", () => {
    render(
      <Card isClient={true}>
        <div>Client rendered card</div>
      </Card>
    );

    expect(screen.getByText("Client rendered card")).toBeInTheDocument();
  });

  it("renders memoized client-side when both isClient and isMemoized are true", () => {
    render(
      <Card isClient={true} isMemoized={true}>
        <div>Memoized client card</div>
      </Card>
    );

    expect(screen.getByText("Memoized client card")).toBeInTheDocument();
  });
});
