// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Integration
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Compound (variants orchestration)
// ============================================================================

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Form } from "../Form";

// Mocks
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

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, name) => {
    if (component) component.displayName = name;
    return component;
  }),
  createComponentProps: vi.fn(
    (
      id: string,
      componentType: string,
      debugMode: boolean,
      additional: any = {}
    ) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}-root`,
      "data-testid": `${id}-${componentType}-root`,
      "data-debug-mode": debugMode ? "true" : undefined,
      ...additional,
    })
  ),
}));

vi.mock("@web/components", () => ({
  Button: vi.fn(({ children, ...props }) => (
    <button data-testid="grm-button" {...props}>
      {children}
    </button>
  )),
  Icon: vi.fn(({ name, debugId, debugMode, ...props }) => {
    const componentId = debugId || "test-id";
    const iconComponentType = `icon-${name}`;
    const dataAttrName = `data-${iconComponentType}-id`;
    return (
      <svg
        data-testid={`${componentId}-${iconComponentType}-root`}
        {...{ [dataAttrName]: `${componentId}-${iconComponentType}-root` }}
        data-debug-mode={debugMode ? "true" : undefined}
        {...props}
      />
    );
  }),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes: string[]) => classes.filter(Boolean).join(" ")),
}));

vi.mock("../Form.i18n", async (orig) => {
  const mod = await orig<typeof import("../Form.i18n")>();
  return { ...mod };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Form (Integration)", () => {
  it("renders default form with form controls end-to-end", () => {
    render(
      <Form>
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </Form>
    );

    const root = screen.getByTestId("test-id-form-default-root");
    expect(root).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("renders newsletter variant with heading and form controls", () => {
    render(<Form variant="newsletter" />);

    const root = screen.getByTestId("test-id-form-newsletter-root");
    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute("role", "form");
    expect(root).toHaveAttribute("action", "/thank-you");
    expect(root).toHaveClass(
      "rounded-2xl",
      "border",
      "border-zinc-100",
      "p-6",
      "dark:border-zinc-700/40"
    );

    // Check heading
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Stay up to date");
    expect(screen.getByTestId("test-id-icon-mail-root")).toBeInTheDocument();

    // Check description
    expect(
      screen.getByText(
        "Get notified when I publish something new, and unsubscribe at any time."
      )
    ).toBeInTheDocument();

    // Check form controls
    expect(
      screen.getByRole("textbox", { name: "Email address" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Join" })).toBeInTheDocument();
  });

  it("renders newsletter variant with custom action and merged className", () => {
    render(
      <Form
        variant="newsletter"
        action="/custom-action"
        className="custom-class"
      >
        <div>Custom content</div>
      </Form>
    );

    const root = screen.getByTestId("test-id-form-newsletter-root");
    expect(root).toHaveAttribute("action", "/custom-action");
    expect(root).toHaveClass("custom-class", "rounded-2xl");
  });

  it("renders default variant with form semantics", () => {
    render(
      <Form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <button type="submit">Submit</button>
      </Form>
    );

    const root = screen.getByTestId("test-id-form-default-root");
    expect(root).toBeInTheDocument();
    expect(root.tagName).toBe("FORM");
    expect(root).toHaveAttribute("role", "form");
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("renders newsletter variant with debug mode", () => {
    render(<Form variant="newsletter" debugMode={true} />);

    const root = screen.getByTestId("test-id-form-newsletter-root");
    expect(root).toHaveAttribute("data-debug-mode", "true");
  });

  it("renders default variant with custom debug ID", () => {
    render(
      <Form debugId="custom-form-id">
        <input type="text" />
      </Form>
    );

    const root = screen.getByTestId("custom-form-id-form-default-root");
    expect(root).toBeInTheDocument();
  });
});
