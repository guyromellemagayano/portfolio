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
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  Label,
  Link,
  Separator,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from "../index";

describe("foundational ui components", () => {
  it("composes styled controls from @portfolio/components primitives", () => {
    render(
      <div>
        <Button variant="secondary">Save</Button>
        <Link href="https://example.com" newTab>
          Docs
        </Link>
        <Badge variant="outline">Stable</Badge>
        <Input aria-label="Name" />
        <Textarea aria-label="Bio" />
        <Label htmlFor="name">Name</Label>
      </div>
    );

    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute(
      "type",
      "button"
    );
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "rel",
      "noopener noreferrer"
    );
    expect(screen.getByText("Stable")).toHaveAttribute("data-slot", "badge");
    expect(screen.getByLabelText("Name")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Bio").tagName).toBe("TEXTAREA");
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
    expect(screen.getByTestId("loading-block")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("keeps field and table accessibility relationships intact", () => {
    render(
      <div>
        <Field
          controlId="email"
          descriptionId="email-help"
          errorId="email-error"
          invalid
        >
          <FieldLabel>Email</FieldLabel>
          <Input
            aria-describedby="email-help email-error"
            aria-invalid="true"
            id="email"
          />
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

    expect(screen.getByText("Email")).toHaveAttribute("for", "email");
    expect(screen.getByText("Use a work email.")).toHaveAttribute(
      "id",
      "email-help"
    );
    expect(screen.getByRole("alert")).toHaveAttribute("id", "email-error");
    expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "scope",
      "col"
    );
    expect(screen.getByRole("cell", { name: "Portfolio" })).toBeInTheDocument();
  });

  it("merges class names predictably", () => {
    const hidden = Boolean(Number.NaN);

    expect(cn("px-2", "px-4", hidden ? "hidden" : undefined)).toBe("px-4");
  });
});
