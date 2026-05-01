import { render } from "@testing-library/react";
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
});
