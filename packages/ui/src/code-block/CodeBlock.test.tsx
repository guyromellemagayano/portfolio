import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CodeBlock, CopyButton } from ".";

describe("CodeBlock", () => {
  it("renders without a header when copy, language, and actions are omitted", () => {
    render(<CodeBlock code="pnpm test" showCopy={false} />);

    expect(screen.queryByRole("button", { name: "Copy code" })).toBeNull();
    expect(
      document.querySelector('[data-slot="code-block-header"]')
    ).toBeNull();
    expect(
      document.querySelector('[data-slot="code-block-code"]')
    ).toHaveTextContent("pnpm test");
  });

  it("renders a header with custom actions and no language", () => {
    render(
      <CodeBlock
        actions={<button type="button">Open file</button>}
        code="pnpm lint"
        showCopy={false}
      />
    );

    expect(
      screen.getByRole("button", { name: "Open file" })
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="code-block-language"]')
    ).toBeNull();
  });

  it("calls copy callbacks with the copied text", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    const onCopied = vi.fn();

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<CopyButton onCopied={onCopied} text="copied text" />);

    const copy = screen.getByRole("button", { name: "Copy" });

    await user.click(copy);
    expect(writeText).toHaveBeenCalledWith("copied text");
    expect(onCopied).toHaveBeenCalledWith("copied text");
  });
});
