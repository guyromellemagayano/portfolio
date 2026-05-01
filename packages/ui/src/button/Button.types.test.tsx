import React from "react";

import { expectTypeOf, it } from "vitest";

import { Button } from ".";

it("requires accessible labels for icon buttons", () => {
  const labelledIcon = <Button aria-label="Open menu" size="icon" />;
  const labelledByIcon = <Button aria-labelledby="menu-label" size="icon" />;
  const loadingButton = <Button loading>Save</Button>;
  const pressedButton = <Button pressed>Pin</Button>;

  expectTypeOf(labelledIcon).toEqualTypeOf<React.JSX.Element>();
  expectTypeOf(labelledByIcon).toEqualTypeOf<React.JSX.Element>();
  expectTypeOf(loadingButton).toEqualTypeOf<React.JSX.Element>();
  expectTypeOf(pressedButton).toEqualTypeOf<React.JSX.Element>();

  // @ts-expect-error icon buttons need an accessible name.
  <Button size="icon" />;
});
