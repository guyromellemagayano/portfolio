import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbTrail,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  cn,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Fieldset,
  Form,
  FormActions,
  Input,
  InputField,
  Label,
  Legend,
  Link,
  RadioGroup,
  RadioGroupItem,
  Section,
  Separator,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  VisuallyHidden,
} from "../index";

describe("foundational ui components", () => {
  it("composes styled controls from @portfolio/components primitives", () => {
    render(
      <div>
        <Button variant="secondary">Save</Button>
        <Button loading>Saving</Button>
        <Button pressed variant="outline">
          Pin
        </Button>
        <Button
          analytics={{ event: "save_click", placement: "toolbar" }}
          variant="ghost"
        >
          Track save
        </Button>
        <Button aria-labelledby="menu-label" size="icon">
          <span aria-hidden="true">...</span>
          <VisuallyHidden id="menu-label">Open menu</VisuallyHidden>
        </Button>
        <Link href="https://example.com" newTab>
          Docs
        </Link>
        <Badge variant="outline">Stable</Badge>
        <Input aria-label="Name" />
        <Textarea aria-label="Bio" />
        <Checkbox aria-label="Accept terms" />
        <Switch aria-label="Email updates" />
        <RadioGroup aria-label="Plan" defaultValue="pro">
          <RadioGroupItem value="pro" />
        </RadioGroup>
        <Label htmlFor="name">Name</Label>
      </div>
    );

    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute(
      "type",
      "button"
    );
    expect(screen.getByRole("button", { name: "Saving" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Saving" })).toHaveAttribute(
      "aria-busy",
      "true"
    );
    expect(screen.getByRole("button", { name: "Saving" })).toHaveAttribute(
      "data-loading",
      ""
    );
    expect(screen.getByRole("button", { name: "Pin" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: "Track save" })).toHaveAttribute(
      "data-analytics-event",
      "save_click"
    );
    expect(screen.getByRole("button", { name: "Track save" })).toHaveAttribute(
      "data-analytics-placement",
      "toolbar"
    );
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "data-slot",
      "button"
    );
    const hiddenLabel = document.querySelector('[data-slot="visually-hidden"]');
    expect(hiddenLabel).toHaveTextContent("Open menu");
    expect(hiddenLabel).toHaveClass("sr-only");
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "rel",
      "noopener noreferrer"
    );
    expect(screen.getByText("Stable")).toHaveAttribute("data-slot", "badge");
    expect(screen.getByLabelText("Name")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Bio").tagName).toBe("TEXTAREA");
    expect(
      screen.getByRole("checkbox", { name: "Accept terms" })
    ).toHaveAttribute("data-slot", "checkbox");
    expect(
      screen.getByRole("switch", { name: "Email updates" })
    ).toHaveAttribute("data-slot", "switch");
    expect(screen.getByRole("radiogroup", { name: "Plan" })).toHaveAttribute(
      "data-slot",
      "radio-group"
    );
  });

  it("renders structured display primitives with shadcn-style slots", () => {
    render(
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Project</CardTitle>
            <CardDescription>Design system card</CardDescription>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
        <Alert>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>Something changed.</AlertDescription>
        </Alert>
        <Avatar>
          <AvatarImage alt="Guy" src="/avatar.png" />
          <AvatarFallback>GM</AvatarFallback>
        </Avatar>
        <Separator />
        <Section
          description="Reusable product surface."
          heading="Services"
          id="services"
        >
          <p>Service content</p>
        </Section>
        <Skeleton data-testid="loading-block" />
      </div>
    );

    expect(screen.getByText("Project")).toHaveAttribute(
      "data-slot",
      "card-title"
    );
    expect(screen.getByRole("alert")).toHaveAttribute("data-slot", "alert");
    expect(screen.getByAltText("Guy")).toHaveAttribute(
      "data-slot",
      "avatar-image"
    );
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "horizontal"
    );
    expect(screen.getByRole("heading", { name: "Services" })).toHaveAttribute(
      "data-slot",
      "section-heading"
    );
    expect(screen.getByText("Reusable product surface.")).toHaveClass(
      "text-muted-foreground"
    );
    const serviceSection = screen
      .getByText("Service content")
      .closest("section");
    expect(serviceSection).toHaveAttribute(
      "aria-labelledby",
      "services-heading"
    );
    expect(serviceSection).toHaveAttribute("data-slot", "section");
    expect(screen.getByTestId("loading-block")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("renders breadcrumb semantics and low-boilerplate trails", () => {
    render(
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <BreadcrumbTrail
          aria-label="Project breadcrumb"
          items={[
            {
              href: "/",
              label: "Home",
              linkProps: {
                analytics: {
                  event: "breadcrumb_click",
                  placement: "project_page",
                },
              },
            },
            { href: "/work", label: "Work" },
            { label: "Portfolio rebuild" },
          ]}
        />
      </div>
    );

    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" })
    ).toHaveAttribute("data-slot", "breadcrumb");
    expect(screen.getAllByRole("link", { name: "Home" })[0]).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByText("Current page")).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(
      document.querySelector('[data-slot="breadcrumb-separator"]')
    ).toHaveAttribute("aria-hidden", "true");

    const projectBreadcrumb = screen.getByRole("navigation", {
      name: "Project breadcrumb",
    });
    expect(projectBreadcrumb).toHaveAttribute("data-slot", "breadcrumb");
    expect(screen.getAllByRole("link", { name: "Home" })[1]).toHaveAttribute(
      "data-analytics-event",
      "breadcrumb_click"
    );
    expect(screen.getByText("Portfolio rebuild")).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("keeps field and table accessibility relationships intact", () => {
    render(
      <div>
        <Field id="email" invalid required>
          <FieldLabel>Email</FieldLabel>
          <Input />
          <FieldDescription>Use a work email.</FieldDescription>
          <FieldError>Invalid email.</FieldError>
        </Field>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Portfolio</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );

    expect(screen.getByText("Email")).toHaveAttribute("for", "email-control");
    expect(screen.getByText("Email")).toHaveAttribute("id", "email-label");
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "id",
      "email-control"
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute("required");
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-describedby",
      "email-description email-error"
    );
    expect(screen.getByText("Use a work email.")).toHaveAttribute(
      "id",
      "email-description"
    );
    expect(screen.getByRole("alert")).toHaveAttribute("id", "email-error");
    expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "scope",
      "col"
    );
    expect(screen.getByRole("cell", { name: "Portfolio" })).toBeInTheDocument();
  });

  it("renders form grouping semantics with styled slots", () => {
    render(
      <Form aria-label="Contact request">
        <Fieldset disabled>
          <Legend>Project details</Legend>
          <InputField id="budget" label="Budget" required />
        </Fieldset>
        <FormActions>
          <Button>Submit</Button>
        </FormActions>
      </Form>
    );

    expect(
      screen.getByRole("form", { name: "Contact request" })
    ).toHaveAttribute("data-slot", "form");
    expect(
      screen.getByRole("group", { name: "Project details" })
    ).toHaveAttribute("data-slot", "fieldset");
    expect(
      screen.getByRole("group", { name: "Project details" })
    ).toBeDisabled();
    expect(screen.getByRole("group", { name: "Project details" })).toHaveClass(
      "disabled:opacity-50"
    );
    expect(screen.getByRole("textbox", { name: "Budget" })).toBeDisabled();
    expect(screen.getByText("Project details")).toHaveAttribute(
      "data-slot",
      "legend"
    );
    expect(
      screen.getByRole("button", { name: "Submit" }).parentElement
    ).toHaveAttribute("data-slot", "form-actions");
  });

  it("merges class names predictably", () => {
    const hidden = Boolean(Number.NaN);

    expect(cn("px-2", "px-4", hidden ? "hidden" : undefined)).toBe("px-4");
  });
});
