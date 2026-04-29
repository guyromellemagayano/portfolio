import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Audio,
  Heading,
  Img,
  Math,
  Picture,
  Source,
  Svg,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Track,
  Video,
} from "../index";

describe("heading primitives", () => {
  it("renders h1 through h6 levels through the single Heading primitive", () => {
    render(
      <div>
        <Heading>Heading 1</Heading>
        <Heading as="h2">Heading 2</Heading>
        <Heading as="h3">Heading 3</Heading>
        <Heading as="h4">Heading 4</Heading>
        <Heading as="h5">Heading 5</Heading>
        <Heading as="h6">Heading 6</Heading>
      </div>
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Heading 1"
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Heading 3"
    );
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(
      "Heading 6"
    );
  });
});

describe("table primitives", () => {
  it("preserves table relationships and spanning attributes", () => {
    render(
      <Table>
        <Thead>
          <Tr>
            <Th id="name" scope="col">
              Name
            </Th>
            <Th colSpan={2} id="details" scope="col">
              Details
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th rowSpan={2} scope="row">
              Project
            </Th>
            <Td headers="name">Portfolio</Td>
            <Td headers="details">Active</Td>
          </Tr>
        </Tbody>
      </Table>
    );

    expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "scope",
      "col"
    );
    expect(
      screen.getByRole("columnheader", { name: "Details" })
    ).toHaveAttribute("colspan", "2");
    expect(screen.getByRole("rowheader", { name: "Project" })).toHaveAttribute(
      "rowspan",
      "2"
    );
    expect(screen.getByRole("cell", { name: "Portfolio" })).toHaveAttribute(
      "headers",
      "name"
    );
  });
});

describe("media and embedded primitives", () => {
  it("preserves media, SVG, and MathML attributes", () => {
    render(
      <div>
        <Picture>
          <Source srcSet="/image.avif" type="image/avif" />
          <Img alt="Preview" src="/image.png" />
        </Picture>
        <Audio controls data-testid="audio">
          <Source src="/audio.mp3" type="audio/mpeg" />
        </Audio>
        <Video controls data-testid="video">
          <Track
            default
            kind="captions"
            label="English"
            src="/captions.vtt"
            srcLang="en"
          />
        </Video>
        <Svg aria-label="Circle" role="img" viewBox="0 0 10 10">
          <circle cx="5" cy="5" r="5" />
        </Svg>
        <Math data-testid="math">
          <span>x</span>
        </Math>
      </div>
    );

    expect(screen.getByAltText("Preview")).toHaveAttribute("decoding", "async");
    expect(screen.getByTestId("audio")).toHaveAttribute("controls");
    expect(screen.getByTestId("video").querySelector("track")).toHaveAttribute(
      "srclang",
      "en"
    );
    expect(screen.getByRole("img", { name: "Circle" })).toHaveAttribute(
      "viewBox",
      "0 0 10 10"
    );
    expect(screen.getByTestId("math").tagName.toLowerCase()).toBe("math");
  });
});
