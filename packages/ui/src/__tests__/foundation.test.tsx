import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  BadgeList,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbTrail,
  Button,
  Callout,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  cn,
  CodeBlock,
  Combobox,
  ComboboxField,
  CopyButton,
  DescriptionDetails,
  DescriptionList,
  DescriptionListItem,
  DescriptionTerm,
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateIcon,
  EmptyStateTitle,
  FeatureItem,
  FeatureList,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Fieldset,
  Figure,
  FigureCaption,
  FigureImage,
  Form,
  FormActions,
  FormErrorSummary,
  FormStatus,
  getAnalyticsAttributes,
  InlineCode,
  Input,
  InputField,
  Label,
  Legend,
  Link,
  LiveRegion,
  Pagination,
  PaginationContent,
  PaginationControls,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Prose,
  RadioGroup,
  RadioGroupItem,
  SearchField,
  SearchInput,
  Section,
  Separator,
  Skeleton,
  SkeletonCard,
  SkeletonText,
  SkipLink,
  SkipLinkTarget,
  Stat,
  StatGroup,
  StatusBadge,
  StatusMessage,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableLoading,
  TableRow,
  Textarea,
  Timeline,
  TimelineItem,
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
          <CardFooter>Footer actions</CardFooter>
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
        <Separator orientation="vertical" />
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
    expect(screen.getByText("Footer actions")).toHaveAttribute(
      "data-slot",
      "card-footer"
    );
    expect(screen.getByRole("alert")).toHaveAttribute("data-slot", "alert");
    expect(screen.getByAltText("Guy")).toHaveAttribute(
      "data-slot",
      "avatar-image"
    );
    expect(screen.getAllByRole("separator")[0]).toHaveAttribute(
      "aria-orientation",
      "horizontal"
    );
    expect(screen.getAllByRole("separator")[1]).toHaveAttribute(
      "aria-orientation",
      "vertical"
    );
    expect(screen.getAllByRole("separator")[1]).toHaveClass("h-full");
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

  it("renders editorial content helpers with semantic structure", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(
      <div>
        <Prose as="article" aria-label="Article body">
          <p>
            Use <InlineCode>pnpm test</InlineCode> before release.
          </p>
        </Prose>
        <CodeBlock code="pnpm test" language="bash" />
        <CopyButton text="copied text" />
        <Callout
          actions={<Button>Review</Button>}
          description="Check the release notes before publishing."
          icon={<span>!</span>}
          intent="warning"
          title="Release note"
        />
        <Timeline>
          <TimelineItem
            description="Prepared the package release."
            time="2026"
            timeProps={{ dateTime: "2026" }}
            title="Release prep"
          />
        </Timeline>
        <StatGroup aria-label="Project stats">
          <Stat description="Production launches" label="Projects" value="12" />
        </StatGroup>
        <FeatureList
          items={[
            {
              description: "Accessible defaults.",
              icon: <span>*</span>,
              title: "Semantic helpers",
            },
          ]}
        />
        <Figure
          alt="Portfolio UI preview"
          caption="A generated preview of the package surface."
          src="/preview.png"
        />
        <Figure>
          <FigureImage alt="Manual preview" src="/manual.png" />
          <FigureCaption>Manual caption.</FigureCaption>
        </Figure>
      </div>
    );

    expect(
      screen.getByRole("article", { name: "Article body" })
    ).toHaveAttribute("data-slot", "prose");
    expect(
      screen.getAllByText("pnpm test", { selector: "code" })[0]
    ).toHaveAttribute("data-slot", "inline-code");
    expect(screen.getByText("bash")).toHaveAttribute(
      "data-slot",
      "code-block-language"
    );
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(writeText).toHaveBeenCalledWith("pnpm test");
    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("copied text");
    expect(screen.getByRole("note")).toHaveAttribute("data-intent", "warning");
    expect(screen.getByText("!").parentElement).toHaveAttribute(
      "data-slot",
      "callout-icon"
    );
    expect(
      screen.getByRole("button", { name: "Review" }).parentElement
    ).toHaveAttribute("data-slot", "callout-actions");
    expect(screen.getByText("2026").tagName).toBe("TIME");
    expect(screen.getByText("Release prep")).toHaveAttribute(
      "data-slot",
      "timeline-title"
    );
    expect(screen.getByRole("list", { name: "Project stats" })).toHaveAttribute(
      "data-slot",
      "stat-group"
    );
    expect(screen.getByText("12")).toHaveAttribute("data-slot", "stat-value");
    expect(screen.getByText("Semantic helpers")).toHaveAttribute(
      "data-slot",
      "feature-title"
    );
    expect(screen.getByAltText("Portfolio UI preview")).toHaveAttribute(
      "loading",
      "lazy"
    );
    expect(
      screen.getByText("A generated preview of the package surface.")
    ).toHaveAttribute("data-slot", "figure-caption");
    expect(screen.getByText("Manual caption.")).toHaveAttribute(
      "data-slot",
      "figure-caption"
    );
  });

  it("renders empty state semantics with generated accessible wiring", () => {
    render(
      <EmptyState
        actions={<Button>Start project</Button>}
        actionsProps={{ className: "mt-2" }}
        description="Create the first project when you are ready."
        icon={<span data-testid="empty-state-icon-glyph">+</span>}
        id="projects-empty"
        title="No projects yet"
      />
    );

    const emptyState = screen.getByRole("region", {
      name: "No projects yet",
    });
    expect(emptyState).toHaveAttribute("data-slot", "empty-state");
    expect(emptyState).toHaveAttribute(
      "aria-labelledby",
      "projects-empty-title"
    );
    expect(emptyState).toHaveAttribute(
      "aria-describedby",
      "projects-empty-description"
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "No projects yet" })
    ).toHaveAttribute("data-slot", "empty-state-title");
    expect(
      screen.getByText("Create the first project when you are ready.")
    ).toHaveAttribute("data-slot", "empty-state-description");
    expect(
      screen.getByTestId("empty-state-icon-glyph").parentElement
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      screen.getByTestId("empty-state-icon-glyph").parentElement
    ).toHaveAttribute("data-slot", "empty-state-icon");
    expect(
      screen.getByRole("button", { name: "Start project" }).parentElement
    ).toHaveAttribute("data-slot", "empty-state-actions");
    expect(
      screen.getByRole("button", { name: "Start project" }).parentElement
    ).toHaveClass("mt-2");
  });

  it("supports manual empty state composition with explicit naming", () => {
    render(
      <EmptyState
        aria-describedby="manual-empty-description"
        aria-labelledby="manual-empty-title"
      >
        <EmptyStateIcon aria-hidden={false}>
          <span>!</span>
        </EmptyStateIcon>
        <EmptyStateHeader>
          <EmptyStateTitle as="h3" id="manual-empty-title">
            Nothing matched
          </EmptyStateTitle>
          <EmptyStateDescription id="manual-empty-description">
            Try fewer filters or clear the current search.
          </EmptyStateDescription>
        </EmptyStateHeader>
        <EmptyStateActions>
          <Button variant="outline">Clear filters</Button>
        </EmptyStateActions>
      </EmptyState>
    );

    const emptyState = screen.getByRole("region", {
      name: "Nothing matched",
    });
    expect(emptyState).toHaveAttribute(
      "aria-describedby",
      "manual-empty-description"
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "Nothing matched" })
    ).toHaveAttribute("data-slot", "empty-state-title");
    expect(screen.getByText("!").parentElement).toHaveAttribute(
      "aria-hidden",
      "false"
    );
    expect(
      screen.getByRole("button", { name: "Clear filters" }).parentElement
    ).toHaveAttribute("data-slot", "empty-state-actions");
  });

  it("renders low-boilerplate display, loading, and form status helpers", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    const onValueChange = vi.fn();

    render(
      <div>
        <Card
          description="Generated card description."
          footer={<Button>Open</Button>}
          title="Generated card"
        >
          Card body.
        </Card>
        <Alert
          actions={<Button>Retry</Button>}
          description="The request failed."
          icon={<span>!</span>}
          title="Could not save"
        />
        <Section
          actions={<Button>View all</Button>}
          description="Current package state."
          eyebrow="Packages"
          heading="UI updates"
          id="ui-updates"
        >
          <p>Section body.</p>
        </Section>
        <TableContainer>
          <Table>
            <TableBody>
              <TableEmpty colSpan={2}>No projects.</TableEmpty>
              <TableLoading colSpan={2} />
            </TableBody>
          </Table>
        </TableContainer>
        <SkeletonText lines={2} />
        <SkeletonCard />
        <BadgeList aria-label="Statuses">
          <StatusBadge status="success">Live</StatusBadge>
        </BadgeList>
        <Avatar name="Guy Romelle Magayano" src="/avatar.png" />
        <Avatar>
          <AvatarImage alt="Manual avatar" src="/manual-avatar.png" />
          <AvatarFallback>MA</AvatarFallback>
        </Avatar>
        <Form aria-label="Settings form">
          <FormErrorSummary errors={["Email is required."]} />
          <FormStatus intent="success">Saved.</FormStatus>
          <SearchField
            id="search"
            inputProps={{
              onClear,
              readOnly: true,
              value: "portfolio",
            }}
            label="Search"
          />
          <ComboboxField
            comboboxProps={{
              onValueChange,
              options: [
                { label: "Engineering", value: "engineering" },
                { label: "Design", value: "design" },
              ],
              placeholder: "Choose team",
            }}
            id="team"
            label="Team"
          />
        </Form>
      </div>
    );

    expect(screen.getByText("Generated card")).toHaveAttribute(
      "data-slot",
      "card-title"
    );
    expect(
      screen.getByText("Card body.").closest('[data-slot="card-content"]')
    ).toBeInTheDocument();
    const alerts = screen.getAllByRole("alert");
    expect(alerts[0]).toHaveTextContent("Could not save");
    expect(
      screen.getByRole("button", { name: "Retry" }).parentElement
    ).toHaveAttribute("data-slot", "alert-actions");
    expect(screen.getByText("Packages")).toHaveAttribute(
      "data-slot",
      "section-eyebrow"
    );
    expect(screen.getByText("View all").parentElement).toHaveAttribute(
      "data-slot",
      "section-actions"
    );
    expect(screen.getByText("No projects.")).toHaveAttribute(
      "data-slot",
      "table-empty"
    );
    expect(screen.getByLabelText("Loading table rows")).toHaveAttribute(
      "aria-busy",
      "true"
    );
    expect(
      document.querySelector('[data-slot="skeleton-text"]')
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      document.querySelector('[data-slot="skeleton-card"]')
    ).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("list", { name: "Statuses" })).toHaveAttribute(
      "data-slot",
      "badge-list"
    );
    expect(screen.getByText("Live")).toHaveAttribute("data-status", "success");
    expect(screen.getByAltText("Guy Romelle Magayano")).toHaveAttribute(
      "data-slot",
      "avatar-image"
    );
    expect(screen.getByText("GR")).toHaveAttribute(
      "data-slot",
      "avatar-fallback"
    );
    expect(alerts[1]).toHaveTextContent("Email is required.");
    expect(screen.getByText("Saved.")).toHaveAttribute(
      "data-slot",
      "form-status"
    );
    await user.click(screen.getByRole("button", { name: "Clear search" }));
    expect(onClear).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("option", { name: "Engineering" }));
    expect(onValueChange).toHaveBeenCalledWith("engineering");
  });

  it("covers alternate helper branches without extra consumer wiring", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    const onInputChange = vi.fn();
    const onValueChange = vi.fn();

    render(
      <div>
        <Prose readable={false} data-testid="compact-prose">
          <p>Compact editorial body.</p>
        </Prose>
        <Callout intent="error">Critical issue.</Callout>
        <Callout intent="info" role="status">
          Informational body.
        </Callout>
        <FeatureList
          aria-label="Ordered features"
          items={[
            { key: "custom-title", title: <span>Custom title</span> },
            { description: false, icon: false, title: 2 },
          ]}
          ordered
        >
          <FeatureItem title="Manual feature">Manual feature body.</FeatureItem>
        </FeatureList>
        <Figure decorative src="/decorative.png" />
        <StatGroup aria-label="Custom stats" role="group">
          <Stat role="presentation">Custom stat body.</Stat>
        </StatGroup>
        <Timeline>
          <TimelineItem
            marker={<span>1</span>}
            markerProps={{ "aria-hidden": false }}
          >
            Manual milestone.
          </TimelineItem>
        </Timeline>
        <FormErrorSummary
          errors={[<span key="budget-error">Budget required.</span>]}
          title="Fix these fields"
        />
        <SearchInput
          aria-label="Hidden clear search"
          clearLabel="Clear hidden search"
          readOnly
          showClear={false}
          value="portfolio"
        />
        <SearchInput
          aria-label="Numeric search"
          clearLabel="Clear numeric search"
          onClear={onClear}
          readOnly
          value={0}
        />
        <Combobox
          emptyMessage="No teams found."
          inputProps={{
            "aria-controls": "controlled-team-list",
            "aria-label": "Controlled team",
            onChange: onInputChange,
          }}
          onValueChange={onValueChange}
          options={[
            { disabled: true, label: "Design", value: "design" },
            {
              description: "Builds systems",
              label: "Engineering",
              searchText: "engineering team",
              value: "engineering",
            },
          ]}
          value="design"
        />
      </div>
    );

    expect(screen.getByTestId("compact-prose")).not.toHaveClass("max-w-3xl");
    expect(
      screen.getByText("Critical issue.").closest('[data-slot="callout"]')
    ).toHaveAttribute("role", "alert");
    expect(
      screen.getByText("Informational body.").closest('[data-slot="callout"]')
    ).toHaveAttribute("role", "status");
    expect(screen.getByRole("list", { name: "Ordered features" }).tagName).toBe(
      "OL"
    );
    expect(screen.getByText("Manual feature body.")).toBeInTheDocument();
    expect(
      document.querySelector('img[src="/decorative.png"]')
    ).toHaveAttribute("alt", "");
    expect(screen.getByRole("group", { name: "Custom stats" })).toHaveAttribute(
      "data-slot",
      "stat-group"
    );
    expect(
      screen.getByText("Custom stat body.").closest('[data-slot="stat"]')
    ).toHaveAttribute("role", "presentation");
    expect(screen.getByText("1").parentElement).toHaveAttribute(
      "aria-hidden",
      "false"
    );
    expect(
      screen
        .getByText("Fix these fields")
        .closest('[data-slot="form-error-summary-title"]')
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Clear hidden search" })
    ).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "Clear numeric search" })
    );
    expect(onClear).toHaveBeenCalledTimes(1);

    const controlledTeam = screen.getByRole("combobox", {
      name: "Controlled team",
    });
    expect(controlledTeam).toHaveAttribute(
      "aria-controls",
      "controlled-team-list"
    );
    expect(screen.getByRole("option", { name: "Design" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await user.click(screen.getByRole("option", { name: "Design" }));
    expect(onValueChange).not.toHaveBeenCalled();
    fireEvent.change(controlledTeam, { target: { value: "zzz" } });
    expect(onInputChange).toHaveBeenCalled();
    expect(screen.getByText("No teams found.")).toBeInTheDocument();

    expect(getAnalyticsAttributes(undefined)).toEqual({});
    expect(
      getAnalyticsAttributes({
        " ": "ignored",
        campaignId: 123,
        customNull: null,
        event: "component_seen",
      })
    ).toEqual({
      "data-analytics-campaign-id": "123",
      "data-analytics-event": "component_seen",
    });
  });

  it("renders description lists from item data with native terms and details", () => {
    render(
      <DescriptionList
        aria-label="Project facts"
        items={[
          {
            description: "Astro and React",
            term: "Stack",
            termProps: {
              analytics: {
                event: "description_term_seen",
                placement: "project_facts",
              },
            },
          },
          {
            description: <Badge variant="outline">Live</Badge>,
            detailsProps: { className: "text-foreground" },
            itemProps: { className: "border-t pt-3" },
            key: "status",
            term: <span>Status</span>,
          },
          {
            description: "Guy Romelle Magayano",
            term: <span>Owner</span>,
          },
        ]}
        orientation="inline"
      />
    );

    const descriptionList = screen.getByLabelText("Project facts");
    expect(descriptionList.tagName).toBe("DL");
    expect(descriptionList).toHaveAttribute("data-slot", "description-list");
    expect(screen.getByText("Stack").tagName).toBe("DT");
    expect(screen.getByText("Stack")).toHaveAttribute(
      "data-slot",
      "description-term"
    );
    expect(screen.getByText("Stack")).toHaveAttribute(
      "data-analytics-event",
      "description_term_seen"
    );
    expect(screen.getByText("Astro and React").tagName).toBe("DD");
    expect(screen.getByText("Astro and React")).toHaveAttribute(
      "data-slot",
      "description-details"
    );
    expect(screen.getByText("Stack").parentElement).toHaveAttribute(
      "data-orientation",
      "inline"
    );
    expect(
      screen.getByText("Status").closest('[data-slot="description-list-item"]')
    ).toHaveClass("border-t");
    expect(screen.getByText("Live").closest("dd")).toHaveClass(
      "text-foreground"
    );
    expect(screen.getByText("Owner").closest("dt")).toHaveAttribute(
      "data-slot",
      "description-term"
    );
  });

  it("supports manual description list composition", () => {
    render(
      <DescriptionList aria-label="Manual facts">
        <DescriptionListItem>
          <DescriptionTerm>Role</DescriptionTerm>
          <DescriptionDetails>Lead engineer</DescriptionDetails>
        </DescriptionListItem>
      </DescriptionList>
    );

    const descriptionList = screen.getByLabelText("Manual facts");
    expect(descriptionList.tagName).toBe("DL");
    expect(screen.getByText("Role").tagName).toBe("DT");
    expect(screen.getByText("Lead engineer").tagName).toBe("DD");
    expect(screen.getByText("Role").parentElement).toHaveAttribute(
      "data-orientation",
      "stacked"
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

  it("renders pagination semantics and low-boilerplate controls", () => {
    render(
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="/work?page=1" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/work?page=1">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink current href="/work?page=2">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationNext href="/work?page=3" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <PaginationControls
          aria-label="Search pages"
          next={{ disabled: true }}
          pages={[
            {
              href: "/search?page=1",
              label: "1",
              linkProps: {
                analytics: {
                  event: "pagination_click",
                  placement: "search_results",
                },
              },
            },
            { current: true, href: "/search?page=2", label: "2" },
            { type: "ellipsis" },
          ]}
          previous={{ href: "/search?page=1" }}
        />
      </div>
    );

    expect(
      screen.getByRole("navigation", { name: "Pagination" })
    ).toHaveAttribute("data-slot", "pagination");
    expect(
      screen.getAllByRole("link", { name: "Previous page" })[0]
    ).toHaveAttribute("data-slot", "pagination-previous");
    expect(
      screen.getAllByRole("link", { name: "Next page" })[0]
    ).toHaveAttribute("data-slot", "pagination-next");
    expect(
      document.querySelector(
        '[data-slot="pagination-link"][aria-current="page"]'
      )
    ).toHaveTextContent("2");
    expect(screen.getAllByText("More pages")).toHaveLength(2);

    const searchPagination = screen.getByRole("navigation", {
      name: "Search pages",
    });
    expect(searchPagination).toHaveAttribute("data-slot", "pagination");
    expect(screen.getAllByRole("link", { name: "1" })[1]).toHaveAttribute(
      "data-analytics-event",
      "pagination_click"
    );
    expect(
      document.querySelector(
        '[data-slot="pagination-next"][aria-disabled="true"]'
      )
    ).toHaveAttribute("data-disabled", "");
  });

  it("renders skip link navigation with a focus target", () => {
    render(
      <div>
        <SkipLink analytics={{ event: "skip_link", placement: "shell" }} />
        <SkipLink targetId="portfolio-main">Jump to portfolio</SkipLink>
        <SkipLinkTarget>
          <h1>Home</h1>
        </SkipLinkTarget>
        <SkipLinkTarget id="portfolio-main">
          <h2>Portfolio</h2>
        </SkipLinkTarget>
      </div>
    );

    const defaultSkipLink = screen.getByRole("link", {
      name: "Skip to content",
    });
    expect(defaultSkipLink).toHaveAttribute("href", "#main-content");
    expect(defaultSkipLink).toHaveAttribute("data-slot", "skip-link");
    expect(defaultSkipLink).toHaveAttribute(
      "data-analytics-event",
      "skip_link"
    );
    expect(defaultSkipLink).toHaveClass("sr-only");
    expect(defaultSkipLink).toHaveClass("focus:not-sr-only");
    expect(
      screen.getByRole("link", { name: "Jump to portfolio" })
    ).toHaveAttribute("href", "#portfolio-main");

    expect(screen.getAllByRole("main")[0]).toHaveAttribute(
      "id",
      "main-content"
    );
    expect(screen.getAllByRole("main")[0]).toHaveAttribute("tabindex", "-1");
    expect(screen.getAllByRole("main")[0]).toHaveAttribute(
      "data-slot",
      "skip-link-target"
    );
    expect(screen.getAllByRole("main")[1]).toHaveAttribute(
      "id",
      "portfolio-main"
    );
  });

  it("renders live regions and status messages with announcement defaults", () => {
    render(
      <div>
        <LiveRegion analytics={{ event: "profile_saved", placement: "form" }}>
          Saved.
        </LiveRegion>
        <LiveRegion role="alert" visuallyHidden>
          Failed.
        </LiveRegion>
        <StatusMessage intent="success">Profile saved.</StatusMessage>
        <StatusMessage intent="error">Could not save profile.</StatusMessage>
        <StatusMessage intent="loading">Saving profile.</StatusMessage>
      </div>
    );

    const liveRegion = screen.getByText("Saved.");
    expect(liveRegion).toHaveAttribute("role", "status");
    expect(liveRegion).toHaveAttribute("aria-live", "polite");
    expect(liveRegion).toHaveAttribute("aria-atomic", "true");
    expect(liveRegion).toHaveAttribute("data-slot", "live-region");
    expect(liveRegion).toHaveAttribute("data-analytics-event", "profile_saved");

    const alertRegion = screen.getByText("Failed.");
    expect(alertRegion).toHaveAttribute("role", "alert");
    expect(alertRegion).toHaveAttribute("aria-live", "assertive");
    expect(alertRegion).toHaveClass("sr-only");

    const successMessage = screen.getByText("Profile saved.");
    expect(successMessage).toHaveAttribute("role", "status");
    expect(successMessage).toHaveAttribute("data-slot", "status-message");
    expect(successMessage).toHaveAttribute("data-intent", "success");

    const errorMessage = screen.getByText("Could not save profile.");
    expect(errorMessage).toHaveAttribute("role", "alert");
    expect(errorMessage).toHaveAttribute("aria-live", "assertive");
    expect(errorMessage).toHaveAttribute("data-intent", "error");

    const loadingMessage = screen.getByText("Saving profile.");
    expect(loadingMessage).toHaveAttribute("aria-busy", "true");
    expect(loadingMessage).toHaveAttribute("data-intent", "loading");
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
          <TableCaption>Recent projects</TableCaption>
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
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableFooter>
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
    expect(screen.getByText("Recent projects")).toHaveAttribute(
      "data-slot",
      "table-caption"
    );
    expect(screen.getByText("Total").closest("tfoot")).toHaveAttribute(
      "data-slot",
      "table-footer"
    );
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
