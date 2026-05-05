import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Combobox, ComboboxField } from ".";

const teamOptions = [
  { disabled: true, label: "Design", value: "design" },
  {
    description: "Builds systems",
    label: "Engineering",
    searchText: "engineering team",
    value: "engineering",
  },
] as const;

describe("Combobox", () => {
  it("filters options and emits value changes for enabled options", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <Combobox
        emptyMessage="No teams found."
        inputProps={{
          "aria-controls": "team-list",
          "aria-label": "Team",
        }}
        onValueChange={handleValueChange}
        options={teamOptions}
        placeholder="Choose team"
      />
    );

    const input = screen.getByRole("combobox", { name: "Team" });

    expect(input).toHaveAttribute("aria-controls", "team-list");
    expect(screen.getByRole("listbox")).toHaveAttribute("id", "team-list");

    await user.type(input, "engine");

    expect(screen.queryByRole("option", { name: "Design" })).toBeNull();
    expect(
      screen.getByRole("option", { name: "Engineering Builds systems" })
    ).toHaveAttribute("aria-selected", "false");

    await user.click(
      screen.getByRole("option", { name: "Engineering Builds systems" })
    );

    expect(handleValueChange).toHaveBeenCalledWith("engineering");
    expect(input).toHaveValue("engineering team");
  });

  it("ignores disabled options and preserves the selected value", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <Combobox
        inputProps={{ "aria-label": "Controlled team" }}
        onValueChange={handleValueChange}
        options={teamOptions}
        value="design"
      />
    );

    const disabledOption = screen.getByRole("option", { name: "Design" });

    expect(
      screen.getByRole("combobox", { name: "Controlled team" })
    ).toHaveValue("Design");
    expect(disabledOption).toHaveAttribute("aria-disabled", "true");
    expect(disabledOption).toHaveAttribute("aria-selected", "true");

    await user.click(disabledOption);

    expect(handleValueChange).not.toHaveBeenCalled();
    expect(
      screen.getByRole("combobox", { name: "Controlled team" })
    ).toHaveValue("Design");
  });

  it("renders a low-boilerplate field wrapper", () => {
    render(
      <ComboboxField
        comboboxProps={{
          inputProps: { "aria-label": "Team" },
          options: teamOptions,
          placeholder: "Choose team",
        }}
        description="Pick the team that owns the work."
        error="Choose a team."
        id="team"
        label="Team"
        required
      />
    );

    const input = screen.getByRole("combobox", { name: "Team" });

    expect(input).toHaveAttribute("id", "team-control");
    expect(input).toHaveAccessibleDescription(
      "Pick the team that owns the work. Choose a team."
    );
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("required");
  });
});
