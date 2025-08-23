import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { A, Button, Form, Input } from "..";

describe("analytics instrumentation", () => {
  it("emits click for Button with analytics", () => {
    const onAnalytics = vi.fn();
    render(
      <Button data-testid="btn" onAnalytics={onAnalytics} analyticsId="b1">
        Go
      </Button>
    );
    fireEvent.click(screen.getByTestId("btn"));
    expect(onAnalytics).toHaveBeenCalledTimes(1);
    const evt = onAnalytics.mock.calls[0][0];
    expect(evt.type).toBe("click");
    expect(evt.component).toBe("Button");
    expect(evt.as).toBe("button");
    expect(evt.id).toBe("b1");
    expect(typeof evt.timestamp).toBe("number");
  });

  it("emits focus/blur/change for Input with analytics and does not override handlers", () => {
    const onAnalytics = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onChange = vi.fn();
    render(
      <Input
        data-testid="inp"
        defaultValue="a"
        onAnalytics={onAnalytics}
        analyticsId="i1"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
    );
    const el = screen.getByTestId("inp") as HTMLInputElement;
    el.focus();
    fireEvent.change(el, { target: { value: "b" } });
    el.blur();
    expect(onFocus).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
    const types = onAnalytics.mock.calls.map((c) => c[0].type).sort();
    expect(types).toEqual(["blur", "change", "focus"].sort());
  });

  it("emits submit for Form and includes analyticsMeta", () => {
    const onAnalytics = vi.fn();
    render(
      <Form
        data-testid="frm"
        onAnalytics={onAnalytics}
        analyticsId="f1"
        analyticsMeta={{ area: "demo" }}
      >
        <button type="submit">Submit</button>
      </Form>
    );
    fireEvent.submit(screen.getByTestId("frm"));
    expect(onAnalytics).toHaveBeenCalled();
    const evt = onAnalytics.mock.calls[0][0];
    expect(evt.type).toBe("submit");
    expect(evt.component).toBe("Form");
    expect(evt.as).toBe("form");
    expect(evt.id).toBe("f1");
    expect(evt.meta).toEqual({ area: "demo" });
  });

  it("emits click for anchor and sets dev data-analytics-id", () => {
    const original = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
    const onAnalytics = vi.fn();
    render(
      <A data-testid="lnk" href="#" onAnalytics={onAnalytics} analyticsId="a1">
        Link
      </A>
    );
    fireEvent.click(screen.getByTestId("lnk"));
    expect(onAnalytics).toHaveBeenCalled();
    const el = screen.getByTestId("lnk");
    expect(el).toHaveAttribute("data-analytics-id", "a1");
    process.env.NODE_ENV = original;
  });
});
