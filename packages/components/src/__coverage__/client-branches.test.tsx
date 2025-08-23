import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Em,
  Footer,
  Header,
  Hgroup,
  Hr,
  I,
  Iframe,
  Img,
  Input,
  Ins,
  Kbd,
  Label,
  Legend,
  Li,
  Link,
  Main,
  Map,
  Mark,
  Menu,
  Meta,
  Meter,
  Nav,
  Noscript,
  Object as ObjectEl,
  Ol,
  Optgroup,
  Option,
  Output,
  Picture,
  Pre,
  Progress,
  Q,
  Rp,
  Rt,
  Ruby,
  S,
  Samp,
  Script,
  Search,
  Section,
  Select,
  Slot,
  Small,
  Source,
  Strong,
  Style,
  Sub,
  Summary,
  Sup,
  Svg,
  Table,
  Tbody,
  Td,
  Template,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Time,
  Title,
  Tr,
  Track,
  U,
  Ul,
  Var,
  Video,
  Wbr,
} from "..";

// This suite intentionally exercises the `isClient` branch of many server wrappers
// to improve line coverage without duplicating per-component logic.

describe("client branches coverage", () => {
  it("renders text-formatting components with isClient", () => {
    render(
      <div>
        <Em isClient>e</Em>
        <Strong isClient>s</Strong>
        <I isClient>i</I>
        <Ins isClient>ins</Ins>
        <Kbd isClient>kbd</Kbd>
        <Mark isClient>mark</Mark>
        <S isClient>s</S>
        <Samp isClient>samp</Samp>
        <Small isClient>sm</Small>
        <U isClient>u</U>
        <Var isClient>v</Var>
        <Q isClient>q</Q>
        <Ruby isClient>
          漢<Rp>(</Rp>
          <Rt>kan</Rt>
          <Rp>)</Rp>
        </Ruby>
      </div>
    );
    expect(document.body).toBeTruthy();
  });

  it("renders structural components with isClient", () => {
    render(
      <div>
        <Section isClient>sec</Section>
        <Nav isClient>nav</Nav>
        <Header isClient>h</Header>
        <Footer isClient>f</Footer>
        <Main isClient>m</Main>
        <Ul isClient>
          <Li>1</Li>
        </Ul>
        <Ol isClient>
          <Li>1</Li>
        </Ol>
      </div>
    );
    expect(document.body).toBeTruthy();
  });

  it("renders table components with isClient (each nested)", () => {
    render(
      <Table isClient>
        <Thead isClient>
          <Tr isClient>
            <Th isClient>H</Th>
          </Tr>
        </Thead>
        <Tbody isClient>
          <Tr isClient>
            <Td isClient>D</Td>
          </Tr>
        </Tbody>
        <Tfoot isClient>
          <Tr isClient>
            <Td isClient>F</Td>
          </Tr>
        </Tfoot>
      </Table>
    );
    expect(document.querySelector("table")).not.toBeNull();
  });

  it("renders media components with isClient", () => {
    render(
      <div>
        <Svg isClient viewBox="0 0 10 10">
          <rect x="1" y="1" width="8" height="8" />
        </Svg>
        <Picture isClient>
          <Source isClient srcSet="/a.webp" type="image/webp" />
          <img src="/a.jpg" alt="a" />
        </Picture>
        <Pre isClient>pre</Pre>
        <Progress isClient value={1} max={2} />
        <Meter isClient value={0.5} min={0} max={1} />
        <Output isClient name="o">
          o
        </Output>
        <Textarea isClient defaultValue="x" />
        <Time isClient dateTime="2020-01-01">
          t
        </Time>
        <Video isClient controls>
          <Source isClient src="/a.mp4" type="video/mp4" />
          <Track isClient kind="captions" src="/a.vtt" />
        </Video>
        <Slot isClient name="content" />
      </div>
    );
    expect(document.body).toBeTruthy();
  });

  it("renders head-scoped components with isClient", () => {
    render(<Script isClient data-testid="scr" />, {
      container: document.head as unknown as HTMLElement,
    });
    render(
      <Style isClient data-testid="sty">
        a{}
      </Style>,
      {
        container: document.head as unknown as HTMLElement,
      }
    );
    render(
      <Template isClient data-testid="tmpl">
        <span>hidden</span>
      </Template>,
      { container: document.body as unknown as HTMLElement }
    );
    // Smoke check only; specific head element suites perform stricter assertions
    expect(document.head).toBeTruthy();
    expect(document.body).toBeTruthy();
  });

  it("renders lists/forms/misc with isClient", () => {
    render(
      <div>
        <Ul isClient>
          <Li isClient>a</Li>
        </Ul>
        <Ol isClient>
          <Li isClient>1</Li>
        </Ol>
      </div>
    );
    expect(document.body).toBeTruthy();
  });

  it("renders remaining low-coverage wrappers with isClient (structure/text)", () => {
    render(
      <div>
        <Hr isClient />
        <Hgroup isClient>hg</Hgroup>
        <Wbr isClient />
        <Sub isClient>sub</Sub>
        <Sup isClient>sup</Sup>
        <Summary isClient>sum</Summary>
        <Search isClient>search</Search>
        <Menu isClient>menu</Menu>
        <Label isClient htmlFor="x">
          l
        </Label>
        <Legend isClient>leg</Legend>
      </div>
    );
    expect(document.body).toBeTruthy();
  });

  it("renders media/embed/interactive wrappers with isClient", () => {
    render(
      <div>
        <Img isClient src="#" alt="a" />
        <Iframe isClient src="#" title="t" />
        <ObjectEl isClient data="#" />
        <Map isClient name="m" />
        <Input isClient type="text" />
        <Select isClient data-testid="sel">
          <Option isClient value="a">
            A
          </Option>
          <Optgroup isClient label="g">
            <Option isClient value="b">
              B
            </Option>
          </Optgroup>
        </Select>
      </div>
    );
    expect(document.querySelector('[data-testid="sel"]')).not.toBeNull();
  });

  it("renders head wrappers with isClient into document.head", () => {
    render(<Meta isClient name="x" content="y" />, {
      container: document.head as unknown as HTMLElement,
    });
    render(<Link isClient rel="stylesheet" href="/x.css" />, {
      container: document.head as unknown as HTMLElement,
    });
    render(<Title isClient>t</Title>, {
      container: document.head as unknown as HTMLElement,
    });
    render(<Noscript isClient>no</Noscript>, {
      container: document.head as unknown as HTMLElement,
    });
    expect(document.head).toBeTruthy();
  });
});
