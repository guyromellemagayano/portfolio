import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../index";

describe("interactive ui components", () => {
  it("renders low-boilerplate accessible dialog content", () => {
    render(
      <Dialog open>
        <DialogContent
          closeLabel="Close profile editor"
          description="Update the account details shown on your public profile."
          title="Edit profile"
        >
          <p>Profile form fields</p>
        </DialogContent>
      </Dialog>
    );

    expect(
      screen.getByRole("dialog", { name: "Edit profile" })
    ).toHaveAccessibleDescription(
      "Update the account details shown on your public profile."
    );
    expect(
      screen.getByRole("button", { name: "Close profile editor" })
    ).toBeInTheDocument();
  });

  it("renders low-boilerplate accessible sheet content", () => {
    render(
      <Sheet open>
        <SheetContent
          closeLabel="Close filters"
          description="Refine the visible project list."
          title="Project filters"
        >
          <p>Filter controls</p>
        </SheetContent>
      </Sheet>
    );

    expect(
      screen.getByRole("dialog", { name: "Project filters" })
    ).toHaveAccessibleDescription("Refine the visible project list.");
    expect(
      screen.getByRole("button", { name: "Close filters" })
    ).toBeInTheDocument();
  });

  it("renders dialog and alert dialog surfaces", () => {
    render(
      <div>
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogDescription>Dialog description</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete item</AlertDialogTitle>
              <AlertDialogDescription>Confirm deletion.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );

    expect(
      document.querySelector('[data-slot="dialog-content"]')
    ).toHaveTextContent("Dialog title");
    expect(
      document.querySelector('[data-slot="alert-dialog-content"]')
    ).toHaveTextContent("Delete item");
  });

  it("renders menu, popover, sheet, tabs, tooltip, and select primitives", () => {
    render(
      <TooltipProvider>
        <DropdownMenu open>
          <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Popover open>
          <PopoverTrigger>Open popover</PopoverTrigger>
          <PopoverContent>Popover content</PopoverContent>
        </Popover>
        <Sheet open>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet title</SheetTitle>
              <SheetDescription>Sheet description</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">One</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Panel one</TabsContent>
        </Tabs>
        <Tooltip open>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
        <Field id="choice" invalid required>
          <FieldLabel>Choice</FieldLabel>
          <Select defaultValue="one" open>
            <SelectTrigger>
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one">One</SelectItem>
            </SelectContent>
          </Select>
          <FieldDescription>Choose one option.</FieldDescription>
          <FieldError>Choice is required.</FieldError>
        </Field>
      </TooltipProvider>
    );

    expect(
      document.querySelector('[data-slot="dropdown-menu-content"]')
    ).toHaveAttribute("data-slot", "dropdown-menu-content");
    expect(
      document.querySelector('[data-slot="popover-content"]')
    ).toHaveTextContent("Popover content");
    expect(
      document.querySelector('[data-slot="popover-content"]')
    ).toHaveAttribute("data-slot", "popover-content");
    expect(
      document.querySelector('[data-slot="sheet-content"]')
    ).toHaveAttribute("data-slot", "sheet-content");
    expect(
      document.querySelector('[data-slot="tabs-trigger"]')
    ).toHaveAttribute("data-slot", "tabs-trigger");
    expect(
      document.querySelector('[data-slot="tooltip-content"]')
    ).toHaveAttribute("data-slot", "tooltip-content");
    expect(
      document.querySelector('[data-slot="select-trigger"]')
    ).toHaveAttribute("data-slot", "select-trigger");
    expect(
      document.querySelector('[data-slot="select-trigger"]')
    ).toHaveAttribute("id", "choice-control");
    expect(
      document.querySelector('[data-slot="select-trigger"]')
    ).toHaveAttribute("aria-describedby", "choice-description choice-error");
    expect(
      document.querySelector('[data-slot="select-trigger"]')
    ).toHaveAttribute("aria-invalid", "true");
    expect(
      document.querySelector('[data-slot="select-trigger"]')
    ).toHaveAttribute("aria-required", "true");
  });

  it("wires field accessibility state into choice controls", () => {
    render(
      <div>
        <Field id="terms" invalid required>
          <FieldLabel>Accept terms</FieldLabel>
          <Checkbox />
          <FieldDescription>Required before continuing.</FieldDescription>
          <FieldError>Accept the terms to continue.</FieldError>
        </Field>
        <Field id="updates" required>
          <FieldLabel>Email updates</FieldLabel>
          <Switch />
          <FieldDescription>Receive product updates.</FieldDescription>
        </Field>
        <Field id="plan" invalid required>
          <FieldLabel>Plan</FieldLabel>
          <RadioGroup defaultValue="pro">
            <div>
              <RadioGroupItem id="plan-pro" value="pro" />
              <label htmlFor="plan-pro">Pro</label>
            </div>
          </RadioGroup>
          <FieldDescription>Select one plan.</FieldDescription>
          <FieldError>A plan is required.</FieldError>
        </Field>
      </div>
    );

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    const switchControl = screen.getByRole("switch", {
      name: "Email updates",
    });
    const radioGroup = screen.getByRole("radiogroup", { name: "Plan" });

    expect(checkbox).toHaveAttribute("id", "terms-control");
    expect(checkbox).toHaveAttribute("aria-labelledby", "terms-label");
    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      "terms-description terms-error"
    );
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAttribute("aria-required", "true");
    expect(checkbox).toHaveAttribute("data-invalid", "");
    expect(checkbox).toHaveAttribute("data-required", "");

    expect(switchControl).toHaveAttribute("id", "updates-control");
    expect(switchControl).toHaveAttribute("aria-labelledby", "updates-label");
    expect(switchControl).toHaveAttribute(
      "aria-describedby",
      "updates-description"
    );
    expect(switchControl).toHaveAttribute("aria-required", "true");

    expect(radioGroup).toHaveAttribute("id", "plan-control");
    expect(radioGroup).toHaveAttribute("aria-labelledby", "plan-label");
    expect(radioGroup).toHaveAttribute(
      "aria-describedby",
      "plan-description plan-error"
    );
    expect(radioGroup).toHaveAttribute("aria-invalid", "true");
    expect(radioGroup).toHaveAttribute("aria-required", "true");
  });
});
