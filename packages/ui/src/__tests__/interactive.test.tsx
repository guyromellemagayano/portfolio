import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Checkbox,
  CheckboxField,
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
  InputField,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  RadioGroupOption,
  Select,
  SelectContent,
  SelectField,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Switch,
  SwitchField,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextareaField,
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
    expect(screen.getByText("Close profile editor")).toHaveAttribute(
      "data-slot",
      "visually-hidden"
    );
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
    expect(screen.getByText("Close filters")).toHaveAttribute(
      "data-slot",
      "visually-hidden"
    );
  });

  it("renders low-boilerplate accessible alert dialog content", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent
          description="This action permanently removes the selected project."
          headerProps={{ id: "alert-generated-header" }}
          title="Delete project"
          titleProps={{ className: "custom-title" }}
        >
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    expect(
      screen.getByRole("alertdialog", { name: "Delete project" })
    ).toHaveAccessibleDescription(
      "This action permanently removes the selected project."
    );
    expect(document.getElementById("alert-generated-header")).toHaveAttribute(
      "data-slot",
      "alert-dialog-header"
    );
    expect(screen.getByText("Delete project")).toHaveClass("custom-title");
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("renders accessible accordion primitives and panels", () => {
    render(
      <div>
        <Accordion collapsible defaultValue="scope" type="single">
          <AccordionItem value="scope">
            <AccordionTrigger>Project scope</AccordionTrigger>
            <AccordionContent>
              Discovery, delivery, and launch support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion defaultValue="timeline" type="single">
          <AccordionPanel
            description="Typical launch windows are planned up front."
            title="Delivery timeline"
            value="timeline"
          >
            <p>Most focused launches take two to four weeks.</p>
          </AccordionPanel>
        </Accordion>
      </div>
    );

    expect(
      screen.getByRole("button", { name: "Project scope" })
    ).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Project scope")).toHaveAttribute(
      "data-slot",
      "accordion-trigger"
    );
    expect(
      screen.getByText("Discovery, delivery, and launch support.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Delivery timeline" })
    ).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Delivery timeline")).toHaveAttribute(
      "data-slot",
      "accordion-panel-title"
    );
    expect(
      screen.getByText("Typical launch windows are planned up front.")
    ).toHaveAttribute("data-slot", "accordion-panel-description");
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

  it("renders low-boilerplate accessible choice field helpers", () => {
    render(
      <div>
        <CheckboxField
          description="Required before continuing."
          error="Accept the terms to continue."
          id="terms-helper"
          label="Accept terms"
          required
        />
        <SwitchField
          description="Receive product updates."
          id="updates-helper"
          label="Email updates"
          required
        />
        <Field id="plan-helper" required>
          <FieldLabel>Plan</FieldLabel>
          <RadioGroup defaultValue="pro">
            <RadioGroupOption
              description="For production teams."
              id="plan-helper-pro"
              label="Pro"
              value="pro"
            />
          </RadioGroup>
          <FieldDescription>Select one plan.</FieldDescription>
        </Field>
      </div>
    );

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    const switchControl = screen.getByRole("switch", {
      name: "Email updates",
    });
    const radio = screen.getByRole("radio", { name: "Pro" });

    expect(checkbox).toHaveAttribute("id", "terms-helper-control");
    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      "terms-helper-description terms-helper-error"
    );
    expect(checkbox).toHaveAccessibleDescription(
      "Required before continuing. Accept the terms to continue."
    );
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAttribute("aria-required", "true");

    expect(switchControl).toHaveAttribute("id", "updates-helper-control");
    expect(switchControl).toHaveAccessibleDescription(
      "Receive product updates."
    );
    expect(switchControl).toHaveAttribute("aria-required", "true");

    expect(radio).toHaveAttribute("id", "plan-helper-pro");
    expect(radio).toHaveAccessibleDescription("For production teams.");
  });

  it("renders low-boilerplate accessible text field helpers", () => {
    render(
      <div>
        <InputField
          description="Use a work email."
          error="Enter a valid email."
          id="email-helper"
          inputProps={{ type: "email" }}
          label="Email"
          required
        />
        <TextareaField
          description="Share the project context."
          id="message-helper"
          label="Message"
          textareaProps={{ rows: 4 }}
        />
        <SelectField
          description="Choose the work type."
          error="Select one option."
          id="role-helper"
          label="Role"
          placeholder="Choose a role"
          required
          selectProps={{ defaultValue: "engineering" }}
        >
          <SelectItem value="engineering">Engineering</SelectItem>
        </SelectField>
      </div>
    );

    const email = screen.getByRole("textbox", { name: "Email" });
    const message = screen.getByRole("textbox", { name: "Message" });
    const role = screen.getByRole("combobox", { name: "Role" });

    expect(email).toHaveAttribute("id", "email-helper-control");
    expect(email).toHaveAttribute(
      "aria-describedby",
      "email-helper-description email-helper-error"
    );
    expect(email).toHaveAccessibleDescription(
      "Use a work email. Enter a valid email."
    );
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAttribute("required");

    expect(message).toHaveAttribute("id", "message-helper-control");
    expect(message).toHaveAccessibleDescription("Share the project context.");
    expect(message).toHaveAttribute("rows", "4");

    expect(role).toHaveAttribute("id", "role-helper-control");
    expect(role).toHaveAttribute(
      "aria-describedby",
      "role-helper-description role-helper-error"
    );
    expect(role).toHaveAccessibleDescription(
      "Choose the work type. Select one option."
    );
    expect(role).toHaveAttribute("aria-invalid", "true");
    expect(role).toHaveAttribute("aria-required", "true");
  });
});
