import React from "react";

import { expectTypeOf, it } from "vitest";

import { Br, Button, Div, Img, Input } from "../index";

it("accepts valid native props, polymorphic as props, and refs", () => {
  const buttonRef = React.createRef<HTMLButtonElement>();
  const anchorRef = React.createRef<HTMLAnchorElement>();

  const button = <Button ref={buttonRef} form="settings-form" />;
  const trackedButton = (
    <Button
      analytics={{
        event: "save_click",
        index: 1,
        placement: "toolbar",
        stateful: true,
      }}
    >
      Save
    </Button>
  );
  const anchorButton = (
    <Button as="a" href="/work" ref={anchorRef}>
      Work
    </Button>
  );
  const input = <Input aria-describedby="field-help" id="field" />;
  const polymorphicImage = <Img as="figure">Preview</Img>;

  expectTypeOf(button).toEqualTypeOf<React.JSX.Element>();
  expectTypeOf(trackedButton).toEqualTypeOf<React.JSX.Element>();
  expectTypeOf(anchorButton).toEqualTypeOf<React.JSX.Element>();
  expectTypeOf(input).toEqualTypeOf<React.JSX.Element>();
  expectTypeOf(polymorphicImage).toEqualTypeOf<React.JSX.Element>();
  expectTypeOf(buttonRef.current).toEqualTypeOf<HTMLButtonElement | null>();
  expectTypeOf(anchorRef.current).toEqualTypeOf<HTMLAnchorElement | null>();
});

it("rejects props that are outside the selected native element contract", () => {
  const layout = <Div id="layout">Content</Div>;
  <Img alt="Preview" src="/preview.png" />;
  <Img decorative src="/preview.png" />;
  <Input aria-label="Name" />;
  <Br />;

  expectTypeOf(layout).toEqualTypeOf<React.JSX.Element>();

  // @ts-expect-error native img usage requires alt text or decorative intent.
  <Img src="/preview.png" />;

  // @ts-expect-error analytics metadata must be primitive scalar values.
  <Button analytics={{ event: ["save"] }}>Save</Button>;

  // @ts-expect-error decorative images cannot also provide meaningful alt text.
  <Img alt="Preview" decorative src="/preview.png" />;

  // @ts-expect-error href is not valid on the native button element.
  <Button href="/work">Work</Button>;

  // @ts-expect-error children are not valid on native void elements.
  <Img alt="Preview" src="/preview.png">
    Preview
  </Img>;

  // @ts-expect-error children are not valid when rendering as a void element.
  <Button as="img" alt="" src="/button.png">
    Button image
  </Button>;

  // @ts-expect-error children are not valid on br.
  <Br>Break</Br>;
});
