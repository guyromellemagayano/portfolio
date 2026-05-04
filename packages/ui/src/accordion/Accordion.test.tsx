import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from ".";

afterEach(() => {
  cleanup();
});

describe("Accordion", () => {
  it("renders accessible single-item accordion primitives and toggles content", async () => {
    const user = userEvent.setup();

    render(
      <Accordion collapsible type="single">
        <AccordionItem
          className="custom-item"
          data-testid="scope-item"
          value="scope"
        >
          <AccordionTrigger className="custom-trigger">
            Project scope
          </AccordionTrigger>
          <AccordionContent
            className="custom-content"
            innerProps={{
              className: "custom-inner",
              id: "scope-content-inner",
            }}
          >
            Discovery, delivery, and launch support.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByRole("button", { name: "Project scope" });
    const contentRoot = document.getElementById(
      trigger.getAttribute("aria-controls") ?? ""
    );
    const item = screen.getByTestId("scope-item");

    expect(item).toHaveAttribute("data-slot", "accordion-item");
    expect(item).toHaveClass("border-b", "custom-item");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("data-slot", "accordion-trigger");
    expect(trigger).toHaveClass("custom-trigger");
    expect(trigger.closest('[data-slot="accordion-header"]')).not.toBeNull();
    expect(
      trigger.querySelector('[data-slot="accordion-trigger-icon"]')
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      trigger.querySelector('[data-slot="accordion-trigger-indicator"]')
    ).toBeInTheDocument();
    expect(contentRoot).toHaveAttribute("data-slot", "accordion-content");
    expect(contentRoot).toHaveClass("custom-content");

    await user.click(trigger);

    const inner = document.getElementById("scope-content-inner");

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(item).toHaveAttribute("data-state", "open");
    expect(
      screen.getByText("Discovery, delivery, and launch support.")
    ).toBeVisible();
    expect(inner).toHaveAttribute("data-slot", "accordion-content-inner");
    expect(inner).toHaveClass("custom-inner");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(item).toHaveAttribute("data-state", "closed");
  });

  it("supports custom slots, refs, disabled state, custom icons, and hidden indicators", () => {
    const itemRef = React.createRef<HTMLDivElement>();
    const triggerRef = React.createRef<HTMLButtonElement>();
    const contentRef = React.createRef<HTMLDivElement>();
    const innerProps = {
      "data-slot": "custom-accordion-inner",
    } as React.ComponentPropsWithoutRef<"div">;

    render(
      <Accordion defaultValue="custom" type="single">
        <AccordionItem
          ref={itemRef}
          data-slot="custom-accordion-item"
          value="custom"
        >
          <AccordionTrigger
            ref={triggerRef}
            data-slot="custom-accordion-trigger"
            icon={<span data-testid="custom-icon">+</span>}
          >
            Custom indicator
          </AccordionTrigger>
          <AccordionContent
            ref={contentRef}
            data-slot="custom-accordion-content"
            innerProps={innerProps}
          >
            Custom icon content.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="disabled">
          <AccordionTrigger disabled icon={null}>
            Disabled indicator
          </AccordionTrigger>
          <AccordionContent>Disabled content.</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const customTrigger = screen.getByRole("button", {
      name: "Custom indicator +",
    });
    const disabledTrigger = screen.getByRole("button", {
      name: "Disabled indicator",
    });

    expect(itemRef.current).toHaveAttribute(
      "data-slot",
      "custom-accordion-item"
    );
    expect(triggerRef.current).toBe(customTrigger);
    expect(contentRef.current).toHaveAttribute(
      "data-slot",
      "custom-accordion-content"
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(
      customTrigger.querySelector('[data-slot="accordion-trigger-icon"]')
    ).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="custom-accordion-inner"]')
    ).toHaveTextContent("Custom icon content.");
    expect(disabledTrigger).toBeDisabled();
    expect(
      disabledTrigger.querySelector('[data-slot="accordion-trigger-indicator"]')
    ).not.toBeInTheDocument();
  });

  it("opens multiple items independently with keyboard interaction", async () => {
    const user = userEvent.setup();

    render(
      <Accordion type="multiple">
        <AccordionPanel title="Discovery" value="discovery">
          <p>Research and architecture notes.</p>
        </AccordionPanel>
        <AccordionPanel title="Delivery" value="delivery">
          <p>Implementation and release support.</p>
        </AccordionPanel>
      </Accordion>
    );

    const discovery = screen.getByRole("button", { name: "Discovery" });
    const delivery = screen.getByRole("button", { name: "Delivery" });

    discovery.focus();
    await user.keyboard("{Enter}");
    await user.click(delivery);

    expect(discovery).toHaveAttribute("aria-expanded", "true");
    expect(delivery).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Research and architecture notes.")).toBeVisible();
    expect(
      screen.getByText("Implementation and release support.")
    ).toBeVisible();
  });

  it("composes AccordionPanel title, description, and forwarded props", async () => {
    const user = userEvent.setup();
    const panelRef = React.createRef<HTMLDivElement>();
    const contentInnerProps = {
      className: "panel-inner",
      id: "panel-inner",
    } as React.ComponentPropsWithoutRef<"div">;
    const descriptionProps = {
      className: "panel-description",
      "data-slot": "panel-description",
    } as React.ComponentPropsWithoutRef<"p">;
    const titleProps = {
      className: "panel-title",
      "data-slot": "panel-title",
    } as React.ComponentPropsWithoutRef<"span">;

    render(
      <Accordion collapsible defaultValue="timeline" type="single">
        <AccordionPanel
          ref={panelRef}
          className="panel-item"
          contentProps={{
            className: "panel-content",
            innerProps: contentInnerProps,
          }}
          data-slot="panel-item"
          description="Typical launch windows are planned up front."
          descriptionProps={descriptionProps}
          title="Delivery timeline"
          titleProps={titleProps}
          triggerProps={{
            className: "panel-trigger",
            id: "panel-trigger",
            icon: <span aria-hidden="true">v</span>,
          }}
          value="timeline"
        >
          <p>Most focused launches take two to four weeks.</p>
        </AccordionPanel>
      </Accordion>
    );

    const trigger = screen.getByRole("button", { name: "Delivery timeline" });

    expect(panelRef.current).toHaveAttribute("data-slot", "panel-item");
    expect(panelRef.current).toHaveClass("border-b", "panel-item");
    expect(trigger).toHaveAttribute("id", "panel-trigger");
    expect(trigger).toHaveClass("panel-trigger");
    expect(screen.getByText("Delivery timeline")).toHaveAttribute(
      "data-slot",
      "panel-title"
    );
    expect(screen.getByText("Delivery timeline")).toHaveClass("panel-title");
    expect(
      screen.getByText("Typical launch windows are planned up front.")
    ).toHaveAttribute("data-slot", "panel-description");
    expect(
      screen.getByText("Typical launch windows are planned up front.")
    ).toHaveClass("text-muted-foreground", "panel-description");
    expect(document.getElementById("panel-inner")).toHaveClass("panel-inner");
    expect(
      screen
        .getByText("Most focused launches take two to four weeks.")
        .closest('[data-slot="accordion-content"]')
    ).toHaveClass("panel-content");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(panelRef.current).toHaveAttribute("data-state", "closed");
  });

  it("omits optional AccordionPanel description when it is not provided", () => {
    render(
      <Accordion defaultValue="support" type="single">
        <AccordionPanel title="Support" value="support">
          <p>Post-launch support.</p>
        </AccordionPanel>
      </Accordion>
    );

    expect(screen.getByRole("button", { name: "Support" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(
      document.querySelector('[data-slot="accordion-panel-description"]')
    ).not.toBeInTheDocument();
    expect(screen.getByText("Post-launch support.")).toBeVisible();
  });
});
