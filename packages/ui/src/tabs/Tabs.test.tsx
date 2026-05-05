import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tabs, TabsContent, TabsList, TabsPanels, TabsTrigger } from ".";

describe("Tabs", () => {
  it("renders tab primitives with accessible selected state", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="one">
        <TabsList aria-label="Sections">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel one</TabsContent>
        <TabsContent value="two">Panel two</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("tabpanel", { name: "One" })).toHaveTextContent(
      "Panel one"
    );

    await user.click(screen.getByRole("tab", { name: "Two" }));

    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("tabpanel", { name: "Two" })).toHaveTextContent(
      "Panel two"
    );
  });

  it("generates low-boilerplate panels from data", () => {
    render(
      <TabsPanels
        panels={[
          {
            content: "Generated panel",
            label: "Generated",
            value: "generated",
          },
        ]}
      />
    );

    expect(document.querySelector('[data-slot="tabs-panels"]')).toHaveAttribute(
      "data-slot",
      "tabs-panels"
    );
    expect(screen.getByRole("tab", { name: "Generated" })).toHaveAttribute(
      "data-slot",
      "tabs-trigger"
    );
    expect(screen.getByText("Generated panel")).toBeInTheDocument();
  });
});
